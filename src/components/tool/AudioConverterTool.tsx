'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Music,
  Download,
  X,
  ShieldCheck,
  Loader2,
  FileAudio,
  Info,
} from 'lucide-react';

type FileItem = {
  file: File;
  status: 'waiting' | 'converting' | 'done' | 'error';
  errorMsg?: string;
  url: string | null;
};

const ACCEPTED_EXTS = ['.mp3', '.aac', '.wav', '.flac', '.m4a'];
const ACCEPTED_ATTR = ACCEPTED_EXTS.join(',');
const FORMATS_LABEL = 'MP3 · AAC · WAV · FLAC · M4A';

function getExt(file: File): string {
  return file.name.split('.').pop()?.toUpperCase() ?? '???';
}

function toInt16(
  floatArr: Float32Array,
  start: number,
  end: number,
): Int16Array {
  const int16 = new Int16Array(end - start);
  for (let i = start; i < end; i++) {
    const s = Math.max(-1, Math.min(1, floatArr[i]));
    int16[i - start] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16;
}

async function convertToMp3(file: File): Promise<Blob> {
  // Web Audio API でデコード
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  await audioCtx.close();

  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const leftChannel = audioBuffer.getChannelData(0);
  const rightChannel =
    numChannels > 1 ? audioBuffer.getChannelData(1) : leftChannel;

  // lamejs を lame.min.js から直接ロード（グローバル関数形式）
  if (
    typeof window !== 'undefined' &&
    !(window as unknown as Record<string, unknown>)['lamejs']
  ) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/lamejs/lame.min.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  const lamejs = (window as unknown as Record<string, { Mp3Encoder: unknown }>).lamejs;
  const Mp3Encoder = lamejs.Mp3Encoder as new (channels: number, sampleRate: number, kbps: number) => { encodeBuffer: (l: Int16Array, r?: Int16Array) => Int16Array; flush: () => Int16Array };

  const encoder = new Mp3Encoder(numChannels === 1 ? 1 : 2, sampleRate, 128);
  const mp3Chunks: Uint8Array[] = [];
  const blockSize = 1152;

  for (let i = 0; i < leftChannel.length; i += blockSize) {
    const end = Math.min(i + blockSize, leftChannel.length);
    const left = toInt16(leftChannel, i, end);
    const right = toInt16(rightChannel, i, end);
    const chunk =
      numChannels === 1
        ? encoder.encodeBuffer(left)
        : encoder.encodeBuffer(left, right);
    if (chunk.length > 0) mp3Chunks.push(new Uint8Array(chunk.buffer));
  }

  const final = encoder.flush();
  if (final.length > 0) mp3Chunks.push(new Uint8Array(final.buffer));

  return new Blob(mp3Chunks as BlobPart[], { type: 'audio/mpeg' });
}

export function AudioConverterTool() {
  const t = useTranslations('audioConverter')
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    const accepted = newFiles.filter((f) =>
      ACCEPTED_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext)),
    );
    setFiles((prev) => {
      const existing = new Set(
        prev.map((x) => `${x.file.name}-${x.file.size}`),
      );
      const toAdd = accepted
        .filter((f) => !existing.has(`${f.name}-${f.size}`))
        .map((f) => ({ file: f, status: 'waiting' as const, url: null }));
      return [...prev, ...toAdd];
    });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const startConvert = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== 'waiting') continue;

      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'converting' } : f)),
      );

      try {
        const blob = await convertToMp3(files[i].file);
        const url = URL.createObjectURL(blob);
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done', url } : f)),
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : '変換に失敗しました';
        const isDecodeError =
          msg.includes('decode') || msg.includes('Unable to decode');
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  status: 'error',
                  errorMsg: isDecodeError ? t('decodeError') : msg,
                }
              : f,
          ),
        );
      }
    }
  };

  const hasWaiting = files.some((f) => f.status === 'waiting');
  const isConverting = files.some((f) => f.status === 'converting');
  const allDone =
    files.length > 0 &&
    files.every((f) => f.status === 'done' || f.status === 'error');
  const doneCount = files.filter((f) => f.status === 'done').length;
  const totalSize = files.reduce((s, f) => s + f.file.size, 0);

  return (
    <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-12'>
      {/* 出力フォーマット */}
      <div className='mb-5'>
        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5'>
          {t('formatLabel')}
        </p>
        <div className='flex items-center gap-3 px-4 py-3 bg-brand-50 border-2 border-brand-400 rounded-xl'>
          <Music className='w-4 h-4 text-brand-600 flex-shrink-0' />
          <span className='text-sm font-bold text-brand-700'>MP3</span>
          <span className='text-xs text-brand-500 ml-auto'>
            {t('formatInputs')}{FORMATS_LABEL}
          </span>
        </div>
      </div>

      {/* ブラウザ互換性の注意 */}
      <div className='mb-5 flex items-start gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700'>
        <Info className='w-3.5 h-3.5 flex-shrink-0 mt-0.5' />
        <span>
          {t('browserNote')}<strong>{t('browserRecommend')}</strong>{t('browserSafari')}
        </span>
      </div>

      {/* ドロップゾーン */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl py-10 text-center mb-4 transition-all cursor-pointer ${
          isDragging
            ? 'border-brand-400 bg-brand-50'
            : 'border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-blue-50/30'
        }`}
      >
        <input
          type='file'
          accept={ACCEPTED_ATTR}
          multiple
          onChange={handleFileSelect}
          className='absolute inset-0 opacity-0 cursor-pointer'
        />
        <FileAudio className='w-10 h-10 mx-auto mb-3 text-gray-300' />
        <p className='text-sm font-semibold text-gray-600 mb-1'>
          {t('dropTitle')}
        </p>
        <p className='text-xs text-gray-400'>
          {t('dropOr')}{' '}
          <span className='text-brand-600 font-medium'>{t('dropClick')}</span>
          <span className='ml-2 text-gray-300'>{FORMATS_LABEL}</span>
        </p>
      </div>

      {/* ファイルリスト */}
      {files.length > 0 && (
        <div className='flex flex-col gap-2 mb-4'>
          {files.map((item, i) => (
            <div
              key={`${item.file.name}-${i}`}
              className='flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100'
            >
              <div className='w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0'>
                <span className='text-xs font-bold text-brand-600 font-mono'>
                  {getExt(item.file)}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-xs font-medium text-gray-700 truncate'>
                  {item.file.name}
                </p>
                <p className='text-xs text-gray-400'>
                  {(item.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
                {item.status === 'error' && item.errorMsg && (
                  <p className='text-xs text-red-500 mt-0.5'>{item.errorMsg}</p>
                )}
              </div>
              {item.status === 'converting' && (
                <Loader2 className='w-4 h-4 text-brand-500 animate-spin flex-shrink-0' />
              )}
              {item.status === 'done' && item.url && (
                <a
                  href={item.url}
                  download={`${item.file.name.replace(/\.[^.]+$/, '')}.mp3`}
                  className='flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors'
                >
                  <Download className='w-3 h-3' />
                  {t('save')}
                </a>
              )}
              {item.status === 'error' && (
                <span className='text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full flex-shrink-0'>
                  {t('error')}
                </span>
              )}
              {item.status === 'waiting' && (
                <button
                  onClick={() => removeFile(i)}
                  className='p-1 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors'
                >
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 完了バナー */}
      {allDone && (
        <div className='flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-teal-700'>
          <ShieldCheck className='w-4 h-4 flex-shrink-0' />
          {t('doneMessage')}
        </div>
      )}

      {/* 変換ボタン */}
      <button
        onClick={startConvert}
        disabled={!hasWaiting || isConverting}
        className='w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.99] text-sm'
      >
        {isConverting ? t('converting') : t('convertBtn')}
      </button>

      {/* プライバシー */}
      <div className='flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400'>
        <ShieldCheck className='w-3.5 h-3.5 text-teal-500' />
        {t('privacy')}
      </div>

      {/* 統計 */}
      {files.length > 0 && (
        <div className='grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100'>
          {[
            { label: t('statFiles'), value: files.length },
            { label: t('statDone'), value: doneCount },
            {
              label: t('statSize'),
              value: `${(totalSize / 1024 / 1024).toFixed(1)}MB`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className='text-center bg-gray-50 rounded-lg py-2'
            >
              <div className='text-lg font-bold font-mono text-gray-800'>
                {s.value}
              </div>
              <div className='text-xs text-gray-400'>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Download,
  X,
  FileImage,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

type FileItem = {
  file: File;
  status: 'waiting' | 'compressing' | 'done' | 'error';
  url: string | null;
  compressedSize: number | null;
};

type Format = 'jpg' | 'webp';

async function compressImage(
  file: File,
  format: Format,
  quality: number,
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d')!;
  if (format === 'jpg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/webp';
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
      mimeType,
      quality / 100,
    );
  });
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ImageCompressorTool() {
  const t = useTranslations('compressor');

  const [files, setFiles] = useState<FileItem[]>([]);
  const [format, setFormat] = useState<Format>('jpg');
  const [quality, setQuality] = useState(80);
  const [isDragging, setIsDragging] = useState(false);

  const ACCEPTED_EXTS = ['jpg', 'jpeg', 'png', 'webp'];

  const addFiles = useCallback((newFiles: File[]) => {
    const accepted = newFiles.filter((f) => {
      const name = f.name.toLowerCase();
      return ACCEPTED_EXTS.some((ext) => name.endsWith(`.${ext}`));
    });
    setFiles((prev) => {
      const existing = new Set(
        prev.map((x) => `${x.file.name}-${x.file.size}`),
      );
      const toAdd = accepted
        .filter((f) => !existing.has(`${f.name}-${f.size}`))
        .map((f) => ({
          file: f,
          status: 'waiting' as const,
          url: null,
          compressedSize: null,
        }));
      return [...prev, ...toAdd];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

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

  const startCompress = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== 'waiting') continue;
      setFiles((prev) =>
        prev.map((f, idx) =>
          idx === i ? { ...f, status: 'compressing' } : f,
        ),
      );
      try {
        const blob = await compressImage(files[i].file, format, quality);
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  status: 'done',
                  url: URL.createObjectURL(blob),
                  compressedSize: blob.size,
                }
              : f,
          ),
        );
      } catch {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'error' } : f,
          ),
        );
      }
    }
  };

  const hasWaiting = files.some((f) => f.status === 'waiting');
  const isCompressing = files.some((f) => f.status === 'compressing');
  const doneCount = files.filter((f) => f.status === 'done').length;
  const allDone =
    files.length > 0 &&
    files.every((f) => f.status === 'done' || f.status === 'error');

  const totalSaved = files
    .filter((f) => f.status === 'done' && f.compressedSize !== null)
    .reduce((sum, f) => sum + f.file.size - (f.compressedSize ?? 0), 0);

  const saveAll = async () => {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const item of files) {
      if (item.status !== 'done' || !item.url) continue;
      const blob = await fetch(item.url).then((r) => r.blob());
      zip.file(
        `${item.file.name.replace(/\.[^.]+$/, '')}_compressed.${format}`,
        blob,
      );
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = 'compressed.zip';
    a.click();
  };

  return (
    <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-12'>
      {/* format selection */}
      <div className='mb-5'>
        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5'>
          {t('formatLabel')}
        </p>
        <div className='flex gap-2'>
          {(['jpg', 'webp'] as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                format === f
                  ? 'border-brand-500 bg-brand-50 text-brand-700 border-2'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* quality slider */}
      <div className='mb-5'>
        <div className='flex items-center justify-between mb-2.5'>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
            {t('qualityLabel')}
          </p>
          <span className='text-sm font-bold text-brand-600 tabular-nums'>
            {quality}
          </span>
        </div>
        <input
          type='range'
          min={10}
          max={95}
          step={5}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className='w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand-500'
        />
        <div className='flex justify-between text-xs text-gray-300 mt-1'>
          <span>{t('qualitySmall')}</span>
          <span>{t('qualityHigh')}</span>
        </div>
      </div>

      {/* drop zone */}
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
          accept='.jpg,.jpeg,.png,.webp'
          multiple
          onChange={handleFileSelect}
          className='absolute inset-0 opacity-0 cursor-pointer'
        />
        <FileImage className='w-10 h-10 mx-auto mb-3 text-gray-300' />
        <p className='text-sm font-semibold text-gray-600 mb-1'>
          {t('dropTitle')}
        </p>
        <p className='text-xs text-gray-400'>
          {t('dropOr')}{' '}
          <span className='text-brand-600 font-medium'>{t('dropClick')}</span>
          <span className='ml-1 text-gray-300'>{t('dropFormats')}</span>
        </p>
      </div>

      {/* file list */}
      {files.length > 0 && (
        <div className='flex flex-col gap-2 mb-4'>
          {files.map((item, i) => (
            <CompressFileRow
              key={`${item.file.name}-${i}`}
              item={item}
              format={format}
              onRemove={() => removeFile(i)}
              t={t}
            />
          ))}
        </div>
      )}

      {/* complete banner */}
      {allDone && (
        <div className='flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-teal-700'>
          <ShieldCheck className='w-4 h-4 flex-shrink-0' />
          <span className='flex-1'>{t('doneMessage')}</span>
          {doneCount > 1 && (
            <button
              onClick={saveAll}
              className='flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0'
            >
              <Download className='w-3.5 h-3.5' />
              {t('saveAll')}
            </button>
          )}
        </div>
      )}

      {/* compress button */}
      <button
        onClick={startCompress}
        disabled={!hasWaiting || isCompressing}
        className='w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.99] text-sm'
      >
        {isCompressing ? t('compressing') : t('startCompress')}
      </button>

      {/* privacy notice */}
      <div className='flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400'>
        <ShieldCheck className='w-3.5 h-3.5 text-teal-500' />
        {t('privacy')}
      </div>

      {/* statistics */}
      {files.length > 0 && (
        <div className='grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100'>
          {[
            { label: t('statFiles'), value: files.length },
            { label: t('statDone'), value: doneCount },
            {
              label: t('statSaved'),
              value: totalSaved > 0 ? formatSize(totalSaved) : '-',
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

type CompressFileRowProps = {
  item: FileItem;
  format: Format;
  onRemove: () => void;
  t: ReturnType<typeof useTranslations<'compressor'>>;
};

function CompressFileRow({ item, format, onRemove, t }: CompressFileRowProps) {
  const name = item.file.name.toLowerCase();
  const ext = name.endsWith('.png')
    ? 'PNG'
    : name.endsWith('.webp')
      ? 'WEBP'
      : 'JPG';

  const reductionText = (() => {
    if (item.status !== 'done' || item.compressedSize === null) return null;
    const orig = item.file.size;
    const comp = item.compressedSize;
    const pct = Math.round((1 - comp / orig) * 100);
    return `${formatSize(orig)} → ${formatSize(comp)} (${pct > 0 ? `-${pct}%` : `+${Math.abs(pct)}%`})`;
  })();

  return (
    <div className='flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100'>
      <div className='w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0'>
        <span className='text-xs font-bold text-brand-600 font-mono'>{ext}</span>
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-xs font-medium text-gray-700 truncate'>
          {item.file.name}
        </p>
        {reductionText ? (
          <p className='text-xs text-teal-600 font-medium'>{reductionText}</p>
        ) : (
          <p className='text-xs text-gray-400'>{formatSize(item.file.size)}</p>
        )}
        {item.status === 'compressing' && (
          <div className='h-1 bg-gray-200 rounded-full mt-1 overflow-hidden'>
            <div className='h-full bg-brand-500 rounded-full animate-pulse w-2/3' />
          </div>
        )}
      </div>
      {item.status === 'compressing' && (
        <Loader2 className='w-4 h-4 text-brand-500 animate-spin flex-shrink-0' />
      )}
      {item.status === 'done' && item.url && (
        <a
          href={item.url}
          download={`${item.file.name.replace(/\.[^.]+$/, '')}_compressed.${format}`}
          className='flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors'
        >
          <Download className='w-3 h-3' />
          {t('save')}
        </a>
      )}
      {item.status === 'error' && (
        <span className='text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full'>
          {t('error')}
        </span>
      )}
      {item.status === 'waiting' && (
        <button
          onClick={onRemove}
          className='p-1 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      )}
    </div>
  );
}

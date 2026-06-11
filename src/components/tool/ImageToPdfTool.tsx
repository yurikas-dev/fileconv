'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Download, X, FileImage, ShieldCheck, Loader2 } from 'lucide-react';

type FileItem = {
  id: string;
  file: File;
  status: 'waiting' | 'done' | 'error';
};

type PageSize = 'a4' | 'letter' | 'original';

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

async function toEmbeddableBlob(file: File): Promise<{ bytes: ArrayBuffer; isJpg: boolean }> {
  const name = file.name.toLowerCase();
  const isJpg = name.endsWith('.jpg') || name.endsWith('.jpeg');
  if (isJpg || name.endsWith('.png')) {
    return { bytes: await file.arrayBuffer(), isJpg };
  }
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  );
  return { bytes: await blob.arrayBuffer(), isJpg: false };
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ImageToPdfTool() {
  const t = useTranslations('imageToPdf');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>('a4');
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const ACCEPTED = ['jpg', 'jpeg', 'png', 'webp'];

  const addFiles = useCallback((newFiles: File[]) => {
    const accepted = newFiles.filter((f) =>
      ACCEPTED.some((ext) => f.name.toLowerCase().endsWith(`.${ext}`)),
    );
    setFiles((prev) => {
      const existing = new Set(prev.map((x) => `${x.file.name}-${x.file.size}`));
      const toAdd = accepted
        .filter((f) => !existing.has(`${f.name}-${f.size}`))
        .map((f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, file: f, status: 'waiting' as const }));
      return [...prev, ...toAdd];
    });
    setResultUrl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setResultUrl(null);
  };

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

  const convert = async () => {
    if (files.length === 0) return;
    setIsConverting(true);
    setResultUrl(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      for (const item of files) {
        const { bytes, isJpg } = await toEmbeddableBlob(item.file);
        const pdfImage = isJpg ? await pdfDoc.embedJpg(bytes) : await pdfDoc.embedPng(bytes);

        if (pageSize === 'original') {
          const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
          page.drawImage(pdfImage, { x: 0, y: 0, width: pdfImage.width, height: pdfImage.height });
        } else {
          const ps = PAGE_SIZES[pageSize];
          const margin = 20;
          const scale = Math.min(
            (ps.width - margin * 2) / pdfImage.width,
            (ps.height - margin * 2) / pdfImage.height,
            1,
          );
          const imgW = pdfImage.width * scale;
          const imgH = pdfImage.height * scale;
          const page = pdfDoc.addPage([ps.width, ps.height]);
          page.drawImage(pdfImage, {
            x: (ps.width - imgW) / 2,
            y: (ps.height - imgH) / 2,
            width: imgW,
            height: imgH,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-12">
      {/* page size selection */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          {t('pageSizeLabel')}
        </p>
        <div className="flex gap-2">
          {(['a4', 'letter', 'original'] as PageSize[]).map((s) => (
            <button
              key={s}
              onClick={() => setPageSize(s)}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                pageSize === s
                  ? 'border-brand-500 bg-brand-50 text-brand-700 border-2'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {s === 'a4' ? 'A4' : s === 'letter' ? 'Letter' : t('pageSizeOriginal')}
            </button>
          ))}
        </div>
      </div>

      {/* drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl py-10 text-center mb-4 transition-all cursor-pointer ${
          isDragging
            ? 'border-brand-400 bg-brand-50'
            : 'border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-blue-50/30'
        }`}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <FileImage className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p className="text-sm font-semibold text-gray-600 mb-1">{t('dropTitle')}</p>
        <p className="text-xs text-gray-400">
          {t('dropOr')}{' '}
          <span className="text-brand-600 font-medium">{t('dropClick')}</span>
          <span className="ml-1 text-gray-300">{t('dropFormats')}</span>
        </p>
      </div>

      {/* file list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {files.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-brand-600 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{item.file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(item.file.size)}</p>
              </div>
              <button
                onClick={() => removeFile(item.id)}
                className="p-1 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* result */}
      {resultUrl && (
        <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-teal-700">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">{t('doneMessage')}</span>
          <a
            href={resultUrl}
            download="converted.pdf"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {t('download')}
          </a>
        </div>
      )}

      {/* convert button */}
      <button
        onClick={convert}
        disabled={files.length === 0 || isConverting}
        className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.99] text-sm"
      >
        {isConverting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('converting')}
          </span>
        ) : (
          t('convert')
        )}
      </button>

      {/* privacy notice */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
        {t('privacy')}
      </div>

      {/* stats */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
          {[
            { label: t('statFiles'), value: files.length },
            { label: t('statPages'), value: files.length },
          ].map((s) => (
            <div key={s.label} className="text-center bg-gray-50 rounded-lg py-2">
              <div className="text-lg font-bold font-mono text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

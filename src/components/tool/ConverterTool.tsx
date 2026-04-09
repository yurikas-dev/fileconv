'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Download, X, FileImage, ShieldCheck, Loader2, MapPin } from 'lucide-react'

type FileItem = {
  file: File
  status: 'waiting' | 'converting' | 'done' | 'error'
  progress: number
  url: string | null
}

type Format = 'jpg' | 'png'
type Quality = { label: string; value: number }

async function stripExif(dataUrl: string): Promise<Blob> {
  const piexif = (await import('piexifjs')).default
  const stripped = piexif.remove(dataUrl)
  const binary = atob(stripped.split(',')[1])
  const array = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i)
  return new Blob([array], { type: 'image/jpeg' })
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function ConverterTool() {
  const t = useTranslations('converter')

  const QUALITIES: Quality[] = [
    { label: t('qualityHigh'), value: 0.95 },
    { label: t('qualityMid'),  value: 0.80 },
    { label: t('qualityLow'),  value: 0.60 },
  ]

  const [files,       setFiles]      = useState<FileItem[]>([])
  const [format,      setFormat]     = useState<Format>('jpg')
  const [quality,     setQuality]    = useState<Quality>(QUALITIES[0])
  const [stripExifOn, setStripExif]  = useState(true)
  const [isDragging,  setIsDragging] = useState(false)

  const addFiles = useCallback((newFiles: File[]) => {
    const heicFiles = newFiles.filter(f => f.name.toLowerCase().endsWith('.heic'))
    setFiles(prev => {
      const existing = new Set(prev.map(x => `${x.file.name}-${x.file.size}`))
      const toAdd = heicFiles
        .filter(f => !existing.has(`${f.name}-${f.size}`))
        .map(f => ({ file: f, status: 'waiting' as const, progress: 0, url: null }))
      return [...prev, ...toAdd]
    })
  }, [])

  const removeFile = (index: number) =>
    setFiles(prev => prev.filter((_, i) => i !== index))

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  const startConvert = async () => {
    const heic2any = (await import('heic2any')).default
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== 'waiting') continue
      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: 'converting', progress: 20 } : f
      ))
      try {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'
        const result = await heic2any({
          blob: files[i].file,
          toType: mimeType,
          quality: format === 'jpg' ? quality.value : 1,
        })
        let blob = Array.isArray(result) ? result[0] : result
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, progress: 70 } : f
        ))
        if (format === 'jpg' && stripExifOn) {
          const dataUrl = await blobToDataUrl(blob)
          blob = await stripExif(dataUrl)
        }
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: 'done', progress: 100, url: URL.createObjectURL(blob) } : f
        ))
      } catch {
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: 'error', progress: 0 } : f
        ))
      }
    }
  }

  const totalSize  = files.reduce((s, f) => s + f.file.size, 0)
  const doneCount  = files.filter(f => f.status === 'done').length
  const hasWaiting = files.some(f => f.status === 'waiting')
  const allDone    = files.length > 0 && !hasWaiting &&
                     files.every(f => f.status === 'done' || f.status === 'error')

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-12">
      {/* 形式選択 */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">{t('formatLabel')}</p>
        <div className="flex gap-2">
          {(['jpg', 'png'] as Format[]).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                format === f
                  ? 'border-brand-500 bg-brand-50 text-brand-700 border-2'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >{f.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* 画質選択 */}
      <div className={`mb-5 transition-opacity ${format === 'png' ? 'opacity-40 pointer-events-none' : ''}`}>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          {t('qualityLabel')}
          {format === 'png' && <span className="normal-case font-normal ml-1">{t('qualityPngNote')}</span>}
        </p>
        <div className="flex gap-2">
          {QUALITIES.map(q => (
            <button key={q.value} onClick={() => setQuality(q)}
              className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                quality.value === q.value
                  ? 'border-teal-500 bg-teal-50 text-teal-700 border-2 font-semibold'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >{q.label}</button>
          ))}
        </div>
      </div>

      {/* EXIF削除 */}
      <div className={`mb-5 transition-opacity ${format === 'png' ? 'opacity-40 pointer-events-none' : ''}`}>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">{t('privacyLabel')}</p>
        <button
          onClick={() => format === 'jpg' && setStripExif(v => !v)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
            stripExifOn && format === 'jpg'
              ? 'border-2 border-teal-400 bg-teal-50'
              : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
            stripExifOn && format === 'jpg' ? 'bg-teal-500' : 'bg-gray-300'
          }`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              stripExifOn && format === 'jpg' ? 'translate-x-4' : 'translate-x-0.5'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">{t('exifTitle')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{t('exifDesc')}</p>
          </div>
          {stripExifOn && format === 'jpg' && (
            <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full flex-shrink-0">ON</span>
          )}
        </button>
        {format === 'png' && (
          <p className="text-xs text-gray-400 mt-1.5 pl-1">{t('exifPngNote')}</p>
        )}
      </div>

      {/* ドロップゾーン */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl py-10 text-center mb-4 transition-all cursor-pointer ${
          isDragging ? 'border-brand-400 bg-brand-50' : 'border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-blue-50/30'
        }`}
      >
        <input type="file" accept=".heic,.HEIC" multiple onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer" />
        <FileImage className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p className="text-sm font-semibold text-gray-600 mb-1">{t('dropTitle')}</p>
        <p className="text-xs text-gray-400">
          {t('dropOr')} <span className="text-brand-600 font-medium">{t('dropClick')}</span>{t('dropMultiple')}
        </p>
      </div>

      {/* ファイルリスト */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {files.map((item, i) => (
            <FileRow key={`${item.file.name}-${i}`} item={item} format={format} onRemove={() => removeFile(i)} t={t} />
          ))}
        </div>
      )}

      {/* 完了バナー */}
      {allDone && (
        <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-teal-700">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          {t('doneMessage')}
        </div>
      )}

      {/* 変換ボタン */}
      <button onClick={startConvert} disabled={!hasWaiting}
        className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.99] text-sm"
      >
        {files.some(f => f.status === 'converting') ? t('converting') : t('startConvert')}
      </button>

      {/* プライバシー注記 */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
        {t('privacy')}
      </div>

      {/* 統計 */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
          {[
            { label: t('statFiles'), value: files.length },
            { label: t('statDone'),  value: doneCount },
            { label: t('statSize'),  value: `${(totalSize / 1024 / 1024).toFixed(1)}MB` },
          ].map(s => (
            <div key={s.label} className="text-center bg-gray-50 rounded-lg py-2">
              <div className="text-lg font-bold font-mono text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type FileRowProps = {
  item: FileItem
  format: Format
  onRemove: () => void
  t: ReturnType<typeof useTranslations<'converter'>>
}

function FileRow({ item, format, onRemove, t }: FileRowProps) {
  const sizeMB = (item.file.size / 1024 / 1024).toFixed(1)
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
      <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-brand-600 font-mono">HEIC</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate">{item.file.name}</p>
        <p className="text-xs text-gray-400">{sizeMB} MB</p>
        {item.status === 'converting' && (
          <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
          </div>
        )}
      </div>
      {item.status === 'waiting'    && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{t('waiting')}</span>}
      {item.status === 'converting' && <Loader2 className="w-4 h-4 text-brand-500 animate-spin flex-shrink-0" />}
      {item.status === 'done' && item.url && (
        <a href={item.url} download={`${item.file.name.replace(/\.heic$/i, '')}.${format}`}
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors"
        >
          <Download className="w-3 h-3" />{t('save')}
        </a>
      )}
      {item.status === 'error' && <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">{t('error')}</span>}
      {item.status === 'waiting' && (
        <button onClick={onRemove} className="p-1 rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

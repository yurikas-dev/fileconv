import { getTranslations } from 'next-intl/server'
import { Monitor, Server, ShieldCheck, Zap } from 'lucide-react'

export async function HowItWorks() {
  const t = await getTranslations('howItWorks')

  const features = [
    { icon: ShieldCheck, title: t('feature1Title'), desc: t('feature1Desc'), color: 'text-teal-600',   bg: 'bg-teal-50' },
    { icon: Zap,         title: t('feature2Title'), desc: t('feature2Desc'), color: 'text-brand-600',  bg: 'bg-brand-50' },
    { icon: Monitor,     title: t('feature3Title'), desc: t('feature3Desc'), color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('subtitle')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="border border-red-100 bg-red-50/50 rounded-xl p-4">
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">{t('otherTitle')}</p>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
              <Monitor className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-red-300" />
              <div className="text-xs text-red-500 font-medium">{t('otherFlow')}</div>
              <div className="w-px h-4 bg-red-300" />
            </div>
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('otherDesc')}<br />
              <span className="text-red-500">{t('otherRisk')}</span>
            </p>
          </div>
        </div>
        <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-4">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">{t('thisTitle')}</p>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-white border border-teal-200 rounded-xl flex items-center justify-center">
              <Monitor className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-teal-300" />
              <div className="text-xs text-teal-600 font-medium">{t('thisFlow')}</div>
              <div className="w-px h-4 bg-teal-300" />
            </div>
            <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center opacity-30">
              <Server className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('thisDesc')}<br />
              <span className="text-teal-600">{t('thisBenefit')}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

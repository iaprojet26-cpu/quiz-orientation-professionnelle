import { Link } from 'react-router-dom'

function RelatedHubLinks({ language = 'fr', langPrefix = '', current = '' }) {
  const copy = {
    fr: {
      title: 'Explorer aussi',
      links: [
        { key: 'career-paths', label: 'Career Paths', to: '/career-paths' },
        { key: 'opportunities', label: 'Opportunites', to: '/opportunities' },
        { key: 'study-in-morocco', label: 'Etudier au Maroc', to: '/study-in-morocco' },
        { key: 'career-guides', label: 'Guides de carriere', to: '/career-guides' },
        { key: 'career-matching', label: 'Career Matching', to: '/career-matching' },
        { key: 'free-tools', label: 'Outils gratuits', to: '/free-tools' }
      ]
    },
    en: {
      title: 'Also explore',
      links: [
        { key: 'career-paths', label: 'Career Paths', to: '/career-paths' },
        { key: 'opportunities', label: 'Opportunities', to: '/opportunities' },
        { key: 'study-in-morocco', label: 'Study in Morocco', to: '/study-in-morocco' },
        { key: 'career-guides', label: 'Career Guides', to: '/career-guides' },
        { key: 'career-matching', label: 'Career Matching', to: '/career-matching' },
        { key: 'free-tools', label: 'Free Tools', to: '/free-tools' }
      ]
    },
    ar: {
      title: 'استكشف ايضا',
      links: [
        { key: 'career-paths', label: 'المسارات المهنية', to: '/career-paths' },
        { key: 'opportunities', label: 'الفرص', to: '/opportunities' },
        { key: 'study-in-morocco', label: 'الدراسة في المغرب', to: '/study-in-morocco' },
        { key: 'career-guides', label: 'ادلة المسار المهني', to: '/career-guides' },
        { key: 'career-matching', label: 'مطابقة المسار المهني', to: '/career-matching' },
        { key: 'free-tools', label: 'ادوات مجانية', to: '/free-tools' }
      ]
    }
  }[language] || {
    title: 'Also explore',
    links: []
  }

  const filtered = copy.links.filter((item) => item.key !== current)

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">{copy.title}</h2>
      <div className="flex flex-wrap gap-3">
        {filtered.map((item) => (
          <Link
            key={item.key}
            to={`${langPrefix}${item.to}`}
            className="bg-white border border-primary-200 hover:bg-primary-50 text-primary-800 px-4 py-2 rounded-lg font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedHubLinks

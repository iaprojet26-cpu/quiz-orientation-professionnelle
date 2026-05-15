import { Link } from 'react-router-dom'

/**
 * Bloc éditorial statique pour pages hub (valeur informative AdSense / E-E-A-T).
 */
function HubEditorialSection({ content, langPrefix = '' }) {
  if (!content) return null

  return (
    <section className="space-y-8 mb-10" aria-label={content.missionTitle}>
      <article className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary-100">
        <h2 className="text-2xl font-bold text-primary-900 mb-3">{content.missionTitle}</h2>
        <p className="text-gray-700 leading-relaxed">{content.mission}</p>
      </article>

      {content.marketTitle && content.marketPoints ? (
        <article className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">{content.marketTitle}</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {content.marketPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ) : null}

      {content.chooseTitle && content.choosePoints ? (
        <article className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">{content.chooseTitle}</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            {content.choosePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {content.sectors ? (
            <p className="text-gray-700 leading-relaxed border-t border-primary-100 pt-4">{content.sectors}</p>
          ) : null}
        </article>
      ) : null}

      {content.sectorsTitle && content.sectors && !content.choosePoints ? (
        <article className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-3">{content.sectorsTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{content.sectors}</p>
        </article>
      ) : null}

      {content.applyTitle && content.applySteps ? (
        <article className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-primary-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">{content.applyTitle}</h2>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            {content.applySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      ) : null}

      {content.resourcesTitle && content.links?.length > 0 ? (
        <article className="bg-primary-50 rounded-xl p-6 md:p-8 border border-primary-200">
          <h2 className="text-xl font-bold text-primary-900 mb-4">{content.resourcesTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {content.links.map((link) => (
              <Link
                key={link.path}
                to={`${langPrefix}${link.path}`}
                className="bg-white text-primary-800 px-4 py-2 rounded-lg text-sm font-semibold border border-primary-200 hover:bg-primary-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  )
}

export default HubEditorialSection

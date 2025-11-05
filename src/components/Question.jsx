function Question({ question, selectedAnswer, onAnswer }) {
  // Fonction pour comparer les IDs de manière flexible (UUID ou numérique)
  const isSelected = (optionId) => {
    if (selectedAnswer === undefined || selectedAnswer === null) return false
    return selectedAnswer === optionId || 
           String(selectedAnswer) === String(optionId) ||
           selectedAnswer === parseInt(optionId)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {question.texte}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = isSelected(option.id)
          return (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selected
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selected
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}>
                  {selected && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-lg">{option.texte}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Question


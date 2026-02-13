import React from 'react'

export const Introduction = ({ TasksData, theme }) => {
    const isDark = theme === 'dark'

    const difficultyBadgeClass = (type) => {
        if (type === 'easy') return 'bg-green-100 text-green-800'
        if (type === 'medium') return 'bg-yellow-100 text-yellow-800'
        return 'bg-red-100 text-red-800'
    }

    const difficultyLabel = (type) => {
        if (type === 'easy') return 'Easy'
        if (type === 'medium') return 'Medium'
        return 'Advanced'
    }

    const readTimeText = (item) => {
        if (item?.readTime) return item.readTime
        if (Number.isFinite(item?.readTimeMinutes)) return `${item.readTimeMinutes} min read`
        return '15 min read'
    }

    const categoryText = (item) => {
        return item?.category || 'Fundamentals'
    }

    return (
        <div>
            {
                TasksData.map((item) => (
                    <div key={item.id ?? item.title}>
                        <div className="mb-8">
                            <h1 className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>{categoryText(item)}</span>
                                <span className={`hidden sm:inline ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                <span className={difficultyBadgeClass(item.type) + " px-2 py-0.5 rounded whitespace-nowrap"}>{difficultyLabel(item.type)}</span>
                                <span className={`hidden sm:inline ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>{readTimeText(item)}</span>
                            </div>
                        </div>
                        <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                            <h3 className="text-base sm:text-lg font-medium mb-4">Requirement:</h3>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{item.description}</p>
                            <ul className="list-disc px-6 mb-6">
                                {item.points.map((point, index) => (
                                    <li className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`} key={index}>{point}</li>
                                ))}

                            </ul>
                            <h4 className="text-base sm:text-lg font-medium mb-4">👉 Concepts:</h4>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{item.concepts}</p>
                            <h3 className="text-base sm:text-lg font-medium mb-4">Preivew</h3>

                        </div>
                    </div>
                ))
            }


        </div>
    )
}

import React from 'react'

export default function LoadingSkeleton(){
  return (
    <div className="space-y-4">
      {Array.from({length:3}).map((_,i)=> (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="h-48 bg-gray-200 rounded mb-3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  )
}
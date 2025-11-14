
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ArtistFiltersProps {
  categories: string[]
  onFilterChange: (category: string | null) => void
}

export default function ArtistFilters({ categories, onFilterChange }: ArtistFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category)
    onFilterChange(category)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={activeCategory === null ? 'outline' : 'ghost'}
        size="sm"
        onClick={() => handleCategoryClick(null)}
        className={activeCategory === null ? 'border-primary' : ''}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => handleCategoryClick(category)}
          className={activeCategory === category ? 'border-primary' : ''}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

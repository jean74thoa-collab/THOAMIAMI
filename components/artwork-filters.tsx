
'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ArtworkFiltersProps {
  onFilterChange: (filters: {
    availability?: string
    featured?: boolean
    sortBy?: string
  }) => void
}

export default function ArtworkFilters({ onFilterChange }: ArtworkFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    
    switch (filter) {
      case 'all':
        onFilterChange({})
        break
      case 'available':
        onFilterChange({ availability: 'available' })
        break
      case 'featured':
        onFilterChange({ featured: true })
        break
      case 'recent':
        onFilterChange({ sortBy: 'recent' })
        break
      default:
        onFilterChange({})
    }
  }

  const filters = [
    { key: 'all', label: 'All Works', icon: Filter },
    { key: 'available', label: 'Available' },
    { key: 'featured', label: 'Featured' },
    { key: 'recent', label: 'Recent' },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => handleFilterClick(filter.key)}
          className={activeFilter === filter.key ? 'border-primary' : ''}
        >
          {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

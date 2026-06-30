'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface FilterSectionProps {
  onFilterChange: (filter: string, value: string) => void
}

const GROUPS = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G', 'Group H']
const CONTINENTS = ['Europe', 'South America', 'Asia', 'Africa', 'North America', 'Oceania']
const SORT_OPTIONS = ['Newest', 'Popularity', 'Price: Low to High', 'Price: High to Low']

export function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [activeContinent, setActiveContinent] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Newest')

  const handleGroupClick = (group: string) => {
    const newGroup = activeGroup === group ? null : group
    setActiveGroup(newGroup)
    onFilterChange('group', newGroup || '')
  }

  const handleContinentClick = (continent: string) => {
    const newContinent = activeContinent === continent ? null : continent
    setActiveContinent(newContinent)
    onFilterChange('continent', newContinent || '')
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    onFilterChange('sort', sort)
  }

  return (
    <section className="border-b border-border bg-surface/30 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Group Tabs */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Filter by Group</p>
          <div className="flex flex-wrap gap-2">
            {GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => handleGroupClick(group)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  activeGroup === group
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface border border-border text-foreground hover:border-primary'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Continent Tabs */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Filter by Continent</p>
          <div className="flex flex-wrap gap-2">
            {CONTINENTS.map((continent) => (
              <button
                key={continent}
                onClick={() => handleContinentClick(continent)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  activeContinent === continent
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-surface border border-border text-foreground hover:border-accent'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-muted-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-surface border border-border text-foreground px-3 py-2 rounded text-sm font-medium cursor-pointer hover:border-primary transition-colors"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

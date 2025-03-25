import React from 'react';
import { DeckFilters as DeckFiltersType, DeckLevel, DeckCategory, DeckSortOption } from '@/types/flashcard.types';
import { useFlashcardStore } from '@/store/flashcardStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const defaultFilters: DeckFiltersType = {
  levels: [],
  categories: [],
  searchTerm: '',
  sortBy: 'name',
  showCompleted: true
};

const levels: DeckLevel[] = ['beginner', 'intermediate', 'advanced'];
const categories: DeckCategory[] = ['vocabulary', 'grammar', 'phrases', 'idioms'];

export const DeckFilters: React.FC = () => {
  const { filters, setFilters } = useFlashcardStore();

  const toggleFilter = (
    type: 'levels' | 'categories',
    value: DeckLevel | DeckCategory
  ) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilters({ [type]: newValues });
  };
  
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button 
          variant="ghost" 
          onClick={() => setFilters(defaultFilters)}
        >
          Limpar Filtros
        </Button>
      </div>
      
      {/* Níveis */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Nível</label>
        <div className="flex gap-2">
          {levels.map(level => (
            <Badge
              key={level}
              variant={filters.levels.includes(level) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter('levels', level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Categorias */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Categoria</label>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Badge
              key={category}
              variant={filters.categories.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter('categories', category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Ordenação */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ordenar por</label>
        <Select
          value={filters.sortBy}
          onValueChange={(value: DeckSortOption) => setFilters({ sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="date">Data</SelectItem>
            <SelectItem value="progress">Progresso</SelectItem>
            <SelectItem value="level">Nível</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}; 
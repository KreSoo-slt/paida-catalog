import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/supabase';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface CategorySidebarProps {
  products: Product[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  onPriceChange: (range: [number, number]) => void;
}

interface CategoryNode {
  name: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

export function CategorySidebar({
  products,
  selectedCategory,
  selectedSubcategory,
  priceRange,
  maxPrice,
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(selectedCategory ? [selectedCategory] : [])
  );

  const categories = useMemo(() => {
    const catMap = new Map<string, CategoryNode>();
    products.forEach((product) => {
      const cat = product.category || 'Без категории';
      const sub = product.subcategory;
      if (!catMap.has(cat)) {
        catMap.set(cat, { name: cat, count: 0, subcategories: [] });
      }
      const node = catMap.get(cat)!;
      node.count++;
      if (sub) {
        const existingSub = node.subcategories.find((s) => s.name === sub);
        if (existingSub) {
          existingSub.count++;
        } else {
          node.subcategories.push({ name: sub, count: 1 });
        }
      }
    });
    return Array.from(catMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const handleCategoryClick = (cat: string) => {
    if (selectedCategory === cat) {
      onCategoryChange(null);
      onSubcategoryChange(null);
    } else {
      onCategoryChange(cat);
      onSubcategoryChange(null);
      setExpandedCategories((prev) => new Set(prev).add(cat));
    }
  };

  const handleSubcategoryClick = (cat: string, sub: string) => {
    onCategoryChange(cat);
    if (selectedSubcategory === sub) onSubcategoryChange(null);
    else onSubcategoryChange(sub);
  };

  const clearFilters = () => {
    onCategoryChange(null);
    onSubcategoryChange(null);
    onPriceChange([0, maxPrice]);
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-card rounded-lg border border-border p-4 sticky top-32">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Фильтры
          </h3>
          {(selectedCategory || selectedSubcategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Сбросить
            </Button>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Категории</h4>
          <button
            onClick={() => handleCategoryClick('')}
            className={cn(
              "w-full text-left py-2 px-3 rounded-md text-sm transition-colors mb-1",
              !selectedCategory ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-foreground"
            )}
          >
            Все товары ({products.length})
          </button>
          <div className="space-y-1">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center">
                  {cat.subcategories.length > 0 && (
                    <button onClick={() => toggleCategory(cat.name)} className="p-1 hover:bg-muted rounded">
                      {expandedCategories.has(cat.name) ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  )}
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className={cn(
                      "flex-1 text-left py-2 px-2 rounded-md text-sm transition-colors",
                      selectedCategory === cat.name && !selectedSubcategory ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {cat.name} <span className="text-muted-foreground ml-1">({cat.count})</span>
                  </button>
                </div>
                {expandedCategories.has(cat.name) && cat.subcategories.length > 0 && (
                  <div className="ml-6 space-y-1 mt-1">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => handleSubcategoryClick(cat.name, sub.name)}
                        className={cn(
                          "w-full text-left py-1.5 px-2 rounded-md text-sm transition-colors",
                          selectedSubcategory === sub.name ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        {sub.name} <span className="ml-1">({sub.count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Цена</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              max={maxPrice}
              step={100}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString('ru-RU')} ₸</span>
              <span>{priceRange[1].toLocaleString('ru-RU')} ₸</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

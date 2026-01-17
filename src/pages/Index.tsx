import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products = [], isLoading, error } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = searchParams.get('search') || '';

  // Calculate max price
  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price || 0);
    return Math.max(...prices, 100000);
  }, [products]);

  // Initialize price range when products load
  useEffect(() => {
    if (products.length > 0 && priceRange[1] === 1000000) {
      setPriceRange([0, maxPrice]);
    }
  }, [products, maxPrice]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, priceRange, searchQuery]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) return false;
      
      // Subcategory filter
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
      
      // Price filter
      const price = product.price || 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = (product.name || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        if (!name.includes(query) && !description.includes(query) && !category.includes(query)) {
          return false;
        }
      }
      
      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, priceRange, searchQuery]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [];
    if (searchQuery) {
      items.push({ label: `Поиск: "${searchQuery}"` });
    } else if (selectedCategory) {
      items.push({ label: selectedCategory, href: `/?category=${selectedCategory}` });
      if (selectedSubcategory) {
        items.push({ label: selectedSubcategory });
      }
    } else {
      items.push({ label: 'Каталог' });
    }
    return items;
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="flex gap-6">
            {/* Sidebar */}
            <CategorySidebar
              products={products}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onCategoryChange={setSelectedCategory}
              onSubcategoryChange={setSelectedSubcategory}
              onPriceChange={setPriceRange}
            />

            {/* Products */}
            <div className="flex-1">
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">
                  {searchQuery ? (
                    <>Результаты поиска: "{searchQuery}"</>
                  ) : selectedSubcategory ? (
                    selectedSubcategory
                  ) : selectedCategory ? (
                    selectedCategory
                  ) : (
                    'Все товары'
                  )}
                </h1>
                <span className="text-muted-foreground text-sm">
                  {filteredProducts.length} товаров
                </span>
              </div>

              {/* Loading */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="text-center py-20 text-destructive">
                  <p>Ошибка загрузки товаров</p>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !error && filteredProducts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Товары не найдены</p>
                  <p className="text-sm">Попробуйте изменить параметры фильтрации</p>
                </div>
              )}

              {/* Product grid */}
              {!isLoading && !error && paginatedProducts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default Index;

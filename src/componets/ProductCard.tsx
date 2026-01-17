import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name || 'Без названия',
      price: product.price || 0,
      img: product.img,
    });
    setCartOpen(true);
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Цена не указана';
    return `${price.toLocaleString('ru-RU')} ₸`;
  };

  return (
    <article className="group bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <Link to={`/product/${product.slug || product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.img || 'https://via.placeholder.com/300x300?text=Нет+фото'}
            alt={product.name || 'Товар'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
              {product.category}
            </span>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Подробнее
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name */}
          <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-primary transition-colors">
            {product.name || 'Без названия'}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
          )}

          {/* Price and action */}
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold text-lg text-success">
              {formatPrice(product.price)}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="shrink-0"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              В корзину
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}

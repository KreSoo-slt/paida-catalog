import { useParams, Link } from 'react-router-dom';
import { Loader2, ShoppingCart, MessageCircle, ArrowLeft } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug);
  const { addItem, setCartOpen } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name || 'Без названия',
      price: product.price || 0,
      img: product.img,
    });
    setCartOpen(true);
  };

  const handleOrderWhatsApp = () => {
    if (!product) return;
    const message = `Здравствуйте! Хочу заказать: ${product.name} (${window.location.href})`;
    window.open(`https://wa.me/77780855478?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Цена не указана';
    return `${price.toLocaleString('ru-RU')} ₸`;
  };

  // Build breadcrumbs
  const breadcrumbItems = product ? [
    ...(product.category ? [{ label: product.category, href: `/?category=${product.category}` }] : []),
    ...(product.subcategory ? [{ label: product.subcategory, href: `/?category=${product.category}&subcategory=${product.subcategory}` }] : []),
    { label: product.name || 'Товар' },
  ] : [{ label: 'Товар' }];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center py-20">
            <p className="text-xl font-medium mb-4">Товар не найден</p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться в каталог
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад в каталог
          </Link>

          {/* Product content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-card rounded-lg border border-border p-4">
              <img
                src={product.img || 'https://via.placeholder.com/600x600?text=Нет+фото'}
                alt={product.name || 'Товар'}
                className="w-full aspect-square object-contain rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <div className="text-sm text-muted-foreground">
                  {product.category}
                  {product.subcategory && ` / ${product.subcategory}`}
                </div>
              )}

              {/* Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {product.name || 'Без названия'}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-success">
                {formatPrice(product.price)}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAddToCart} size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  В корзину
                </Button>
                <Button onClick={handleOrderWhatsApp} variant="outline" size="lg" className="flex-1">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Заказать в WhatsApp
                </Button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-6 border-t border-border">
                  <h2 className="font-semibold text-lg mb-3">Описание</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Info blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-1">Доставка</h3>
                  <p className="text-sm text-muted-foreground">
                    Бесплатно от 50 000 ₸
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-1">Оплата</h3>
                  <p className="text-sm text-muted-foreground">
                    Наличные, перевод, безнал
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default ProductPage;

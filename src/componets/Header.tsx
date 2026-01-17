import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { name: 'Оплата', href: '/payment' },
  { name: 'Доставка', href: '/delivery' },
  { name: 'Контакты', href: '/contacts' },
  { name: 'О компании', href: '/about' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { items, toggleCart } = useCart();
  
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="border-b border-border bg-muted/50">
        <div className="container flex items-center justify-between h-10 text-sm">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="hidden sm:inline">Караганда</span>
            <span className="hidden sm:inline">•</span>
            <span>Без выходных 9:00-21:00</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="https://pic.maxiol.com/thumbs2/1753306101.86132844.paidaj.jpg"
              alt="Paida All"
              className="h-12 w-12 rounded-lg object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-foreground">Paida All</div>
              <div className="text-xs text-muted-foreground">Оптовые поставки</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 bg-muted border-0 focus-visible:ring-primary"
              />
            </div>
          </form>

          {/* Phone */}
          <a
            href="tel:+77780855478"
            className="hidden lg:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5 text-primary" />
            <div className="text-right">
              <div className="font-semibold">8 (778) 085-54-78</div>
              <div className="text-xs text-muted-foreground">Звоните!</div>
            </div>
          </a>

          {/* Cart */}
          <Button
            variant="outline"
            size="icon"
            className="relative h-11 w-11"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+77780855478"
              className="py-2 flex items-center gap-2 text-primary font-semibold"
            >
              <Phone className="h-4 w-4" />
              8 (778) 085-54-78
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

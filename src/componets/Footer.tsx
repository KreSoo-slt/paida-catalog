import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://pic.maxiol.com/thumbs2/1753306101.86132844.paidaj.jpg"
                alt="Paida All"
                className="h-10 w-10 rounded-lg"
              />
              <div className="font-bold text-lg">Paida All</div>
            </div>
            <p className="text-muted-foreground text-sm">
              Оптовые поставки товаров в Караганде. Работаем с физическими и юридическими лицами.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                О компании
              </Link>
              <Link to="/delivery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Доставка
              </Link>
              <Link to="/payment" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Оплата
              </Link>
              <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Контакты
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="tel:+77780855478"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                8 (778) 085-54-78
              </a>
              <a
                href="https://wa.me/77780855478"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>г. Караганда</span>
              </div>
            </div>
          </div>

          {/* Working hours */}
          <div>
            <h4 className="font-semibold mb-4">Режим работы</h4>
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p>Ежедневно</p>
                <p className="font-medium text-foreground">9:00 — 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Paida All. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

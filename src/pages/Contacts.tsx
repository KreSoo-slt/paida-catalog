import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumbs items={[{ label: 'Контакты' }]} className="mb-6" />

          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Контакты</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Phone */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Телефон</h3>
                <a 
                  href="tel:+77780855478" 
                  className="text-xl font-bold text-primary hover:underline"
                >
                  8 (778) 085-54-78
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                <a 
                  href="https://wa.me/77780855478" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Написать в WhatsApp
                </a>
              </div>

              {/* Address */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Адрес</h3>
                <p className="text-muted-foreground">
                  г. Караганда, Казахстан
                </p>
              </div>

              {/* Working hours */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Режим работы</h3>
                <p className="text-muted-foreground">
                  Ежедневно с 9:00 до 21:00
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Есть вопросы?</h2>
              <p className="mb-6 opacity-90">
                Свяжитесь с нами любым удобным способом — мы всегда рады помочь!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open('tel:+77780855478')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Позвонить
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => window.open('https://wa.me/77780855478', '_blank')}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Написать в WhatsApp
                </Button>
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

export default Contacts;

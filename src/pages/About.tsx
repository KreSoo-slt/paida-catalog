import { Building2, Users, Truck, Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const features = [
  {
    icon: Building2,
    title: 'Надёжный поставщик',
    description: 'Работаем на рынке Караганды, обеспечивая стабильные поставки качественных товаров.',
  },
  {
    icon: Users,
    title: 'Для всех клиентов',
    description: 'Работаем как с физическими лицами, так и с юридическими. Оформляем все необходимые документы.',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставляем товары по городу в кратчайшие сроки. Бесплатная доставка от 50 000 ₸.',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Все товары проходят проверку качества. Работаем только с проверенными производителями.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumbs items={[{ label: 'О компании' }]} className="mb-6" />

          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">О компании Paida All</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <p>
                <strong className="text-foreground">Paida All</strong> — это надёжный оптовый поставщик 
                товаров в городе Караганда. Мы предлагаем широкий ассортимент продукции по выгодным ценам.
              </p>
              <p>
                Наша компания специализируется на оптовых поставках для бизнеса и розничных покупателей. 
                Мы ценим каждого клиента и стремимся обеспечить лучший сервис.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default About;

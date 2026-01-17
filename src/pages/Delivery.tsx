import { Truck, Clock, MapPin, Package } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const deliveryInfo = [
  {
    icon: Truck,
    title: 'Бесплатная доставка',
    description: 'При заказе от 50 000 ₸ доставка по Караганде бесплатно.',
  },
  {
    icon: Clock,
    title: 'Сроки доставки',
    description: 'Доставка в течение 1-2 рабочих дней после подтверждения заказа.',
  },
  {
    icon: MapPin,
    title: 'Зона доставки',
    description: 'Доставляем по всей Караганде и пригородам.',
  },
  {
    icon: Package,
    title: 'Самовывоз',
    description: 'Вы можете забрать заказ самостоятельно после согласования.',
  },
];

const Delivery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumbs items={[{ label: 'Доставка' }]} className="mb-6" />

          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Доставка</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Мы осуществляем доставку товаров по городу Караганда и пригородам. 
                Стоимость и сроки доставки зависят от объёма заказа и адреса доставки.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {deliveryInfo.map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-accent rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Как заказать доставку?</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Добавьте товары в корзину</li>
                <li>Нажмите "Оформить в WhatsApp"</li>
                <li>Укажите адрес доставки в сообщении</li>
                <li>Мы свяжемся с вами для подтверждения</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default Delivery;

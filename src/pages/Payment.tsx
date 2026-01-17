import { CreditCard, Banknote, Building, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const paymentMethods = [
  {
    icon: Banknote,
    title: 'Наличные',
    description: 'Оплата наличными при получении товара курьеру или при самовывозе.',
  },
  {
    icon: CreditCard,
    title: 'Перевод на карту',
    description: 'Оплата переводом на карту Kaspi или Halyk Bank перед доставкой.',
  },
  {
    icon: Building,
    title: 'Безналичный расчёт',
    description: 'Для юридических лиц — оплата по счёту с предоставлением всех документов.',
  },
  {
    icon: FileText,
    title: 'Документы',
    description: 'Выдаём чеки, накладные и счета-фактуры для юридических лиц.',
  },
];

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumbs items={[{ label: 'Оплата' }]} className="mb-6" />

          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Оплата</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Мы предлагаем удобные способы оплаты как для физических, так и для юридических лиц.
                Выберите наиболее удобный для вас вариант.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground">{method.description}</p>
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

export default Payment;

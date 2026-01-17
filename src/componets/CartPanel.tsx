import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export function CartPanel() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity } = useCart();
  
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = `Здравствуйте! Хочу сделать заказ:\n\n`;
    message += items
      .map(
        (item) =>
          `• ${item.name} - ${item.quantity} шт. × ${item.price.toLocaleString('ru-RU')} ₸ = ${(item.price * item.quantity).toLocaleString('ru-RU')} ₸`
      )
      .join('\n');
    message += `\n\nИтого: ${totalPrice.toLocaleString('ru-RU')} ₸`;

    window.open(
      `https://wa.me/77780855478?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      removeItem(id);
    } else {
      // Fix: create a proper update
      const item = items.find(i => i.id === id);
      if (item) {
        const newItems = items.map(i => 
          i.id === id ? { ...i, quantity: newQty } : i
        );
        // We need to update the store directly
        useCart.setState({ items: newItems });
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-0 right-0 w-full max-w-md h-[80vh] bg-card rounded-t-2xl shadow-2xl z-50 flex flex-col transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Корзина
            {items.length > 0 && (
              <span className="text-muted-foreground font-normal">
                ({items.length})
              </span>
            )}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(false)}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
              <p className="font-medium">Корзина пуста</p>
              <p className="text-sm">Добавьте товары из каталога</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-muted rounded-lg"
                >
                  <img
                    src={item.img || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md bg-background"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-success font-semibold">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Итого:</span>
              <span className="text-2xl font-bold text-success">
                {totalPrice.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <Button onClick={handleCheckout} className="w-full h-12" size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Оформить в WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

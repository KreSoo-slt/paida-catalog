import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link to="/">
          <Button>
            <Home className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

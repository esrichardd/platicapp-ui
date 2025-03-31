import {
  Car,
  Circle,
  Film,
  HeartPulse,
  Home,
  ShoppingCart,
  Utensils,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Hogar: <Home className='h-4 w-4' />,
  Transporte: <Car className='h-4 w-4' />,
  Comida: <Utensils className='h-4 w-4' />,
  Entretenimiento: <Film className='h-4 w-4' />,
  Salud: <HeartPulse className='h-4 w-4' />,
  Supermercado: <ShoppingCart className='h-4 w-4' />,
  Otro: <Circle className='h-4 w-4' />,
}

export function getIconByName(name: string): React.ReactNode {
  return iconMap[name] || <Circle className='h-4 w-4' />
}

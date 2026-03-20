export type Product = {
  id: string
  name: string
  price: number
  league: string
  size: string
  image: string
}

export type PaymentBadge = {
  name: string
  icon?: 'paypal' | 'binance' | 'mastercard' | 'venezuela'
}

export const PRODUCTS: Product[] = [
  {
    id: 'arg-2026',
    name: 'Argentina Local Mundial 2026',
    price: 30,
    league: 'Seleccion',
    size: 'M',
    image:
      '/shirts/shirt-local-argentina-worldcup-2026-front-withoutbackground.webp'
  },
  {
    id: 'por-2026',
    name: 'Portugal Local Mundial 2026',
    price: 30,
    league: 'Seleccion',
    size: 'M',
    image:
      '/shirts/shirt-local-portugal-worldcup-2026-front-withoubackground.webp'
  }
]

export const PAYMENT_BADGES: PaymentBadge[] = [
  {
    name: 'Transferencias',
    icon: 'venezuela'
  },
  {
    name: 'Pago Movil',
    icon: 'venezuela'
  },
  {
    name: 'PayPal',
    icon: 'paypal'
  },
  {
    name: 'Binance',
    icon: 'binance'
  },

  {
    name: 'Mastercard',
    icon: 'mastercard'
  }
]

export const CONTACTS = {
  whatsapp: '584143323040',
  instagramUrl: 'https://instagram.com/skyblueshopve'
}

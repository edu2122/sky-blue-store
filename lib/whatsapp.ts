export type CartMessageItem = {
  name: string
  quantity: number
  price: number
  size: string
}

export const buildWhatsAppUrl = (phone: string, message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const buildItemMessage = (
  name: string,
  quantity: number,
  total: number,
  size: string
) => `Hola\nQuiero comprar:\n- ${quantity} x ${name} (Talla ${size}).\nTotal: $${total}.`

export const buildCartMessage = (items: CartMessageItem[], total: number) => {
  const lines = items
    .map(
      (item) =>
        `- ${item.quantity} x ${item.name} (Talla ${item.size}) · $${item.price}`
    )
    .join('\n')
  return `Hola\nPedido Mundial 2026\n${lines}\n----------------\nTotal: $${total}.`
}

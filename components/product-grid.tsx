import Image from 'next/image'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/site-data'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

type ProductGridProps = {
  products: Product[]
  instagramUrl: string
  buildWhatsAppUrl: (message: string) => string
  buildItemMessage: (
    name: string,
    quantity: number,
    total: number,
    size: string
  ) => string
  sizesById: Record<string, string>
  onSizeChange: (id: string, size: string) => void
  onAddItem: (payload: {
    id: string
    name: string
    price: number
    image: string
    size: string
  }) => void
}

export function ProductGrid({
  products,
  instagramUrl,
  buildWhatsAppUrl,
  buildItemMessage,
  sizesById,
  onSizeChange,
  onAddItem
}: ProductGridProps) {
  return (
    <section className="flex flex-col gap-6" id="catalogo">
      <div className="flex items-center justify-between">
        <h2 className="font-[var(--font-playfair)] text-2xl text-balance">
          Camisetas del mundial
        </h2>
        <span className="text-sm font-semibold text-muted-foreground">
          {products.length} productos
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 ">
        {products.map((item, index) => {
          const selectedSize = sizesById[item.id] ?? item.size
          const cartId = `${item.id}-${selectedSize}`

          return (
            <Card key={item.name} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <Badge variant="secondary" className="uppercase">
                  {item.league}
                </Badge>
                <Button
                  aria-label={`Guardar ${item.name}`}
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                >
                  ♡
                </Button>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative flex h-64 w-full items-center justify-center rounded-xl bg-muted/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={280}
                    height={280}
                    className="h-56 w-56 object-contain transition-transform duration-300 hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none"
                    sizes="(max-width: 768px) 80vw, 280px"
                    priority={index === 0}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>Edicion 2026 · Envio 24/48h</CardDescription>
                </div>
                <div className="flex w-full items-center justify-between text-sm font-semibold">
                  <span>${item.price}</span>
                  <Button
                    variant="outline"
                    className="rounded-full px-4"
                    onClick={() => {
                      onAddItem({
                        id: cartId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        size: selectedSize
                      })
                      toast.success('Agregado al carrito', {
                        description: `${item.name} · Talla ${selectedSize}`
                      })
                    }}
                  >
                    Agregar al carrito
                  </Button>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Talla</span>
                    <select
                      aria-label="Selecciona tu talla"
                      className="rounded-full border border-border bg-background px-2 py-1 text-xs"
                      value={selectedSize}
                      onChange={(event) =>
                        onSizeChange(item.id, event.target.value)
                      }
                    >
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild className="rounded-full px-4">
                      <a
                        href={buildWhatsAppUrl(
                          buildItemMessage(
                            item.name,
                            1,
                            item.price,
                            selectedSize
                          )
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Comprar por WhatsApp
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full px-4"
                    >
                      <a href={instagramUrl} target="_blank" rel="noreferrer">
                        Comprar por Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

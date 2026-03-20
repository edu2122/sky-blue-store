'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ModeToggle } from '@/components/mode-toggle'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

type SiteHeaderProps = {
  cartCount: number
  items: CartItem[]
  total: number
  cartWhatsAppUrl: string
  instagramUrl: string
  onClear: () => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export function SiteHeader({
  cartCount,
  items,
  total,
  cartWhatsAppUrl,
  instagramUrl,
  onClear,
  onUpdateQuantity
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Image
              src="/sky-blue-shop.svg"
              alt="Sky Blue Shop VE"
              width={24}
              height={24}
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Sky Blue Shop VE</p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Mundial 2026
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" className="rounded-full px-4">
            Iniciar sesion
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full px-4">Carrito ({cartCount})</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Tu carrito</SheetTitle>
              </SheetHeader>
              <div className="flex items-center justify-between px-4">
                <p className="text-xs text-muted-foreground">
                  Productos seleccionados
                </p>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={onClear}
                  disabled={!items.length}
                >
                  Vaciar
                </Button>
              </div>
              <div className="mt-2 flex flex-1 flex-col gap-3 overflow-auto px-4">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Tu carrito esta vacio.
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted/60">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Talla {item.size} · ${item.price} · x{item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon-xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 flex items-center justify-between px-4 text-sm font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="px-4 pb-4">
                <Button asChild className="mt-3 w-full" disabled={!items.length}>
                  <a href={cartWhatsAppUrl} target="_blank" rel="noreferrer">
                    Comprar por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 w-full"
                  disabled={!items.length}
                >
                  <a href={instagramUrl} target="_blank" rel="noreferrer">
                    Comprar por Instagram
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

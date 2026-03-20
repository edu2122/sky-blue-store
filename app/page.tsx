'use client'

import { useMemo, useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { ProductGrid } from '@/components/product-grid'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useCartStore } from '@/lib/cart-store'
import { CONTACTS, PAYMENT_BADGES, PRODUCTS } from '@/lib/site-data'
import {
  buildCartMessage,
  buildItemMessage,
  buildWhatsAppUrl
} from '@/lib/whatsapp'

const WHATSAPP_PHONE = CONTACTS.whatsapp
const INSTAGRAM_URL = CONTACTS.instagramUrl

export default function Home() {
  const cartCount = useCartStore((state) => state.count())
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clear = useCartStore((state) => state.clear)
  const [sizesById, setSizesById] = useState<Record<string, string>>(() =>
    Object.fromEntries(PRODUCTS.map((product) => [product.id, product.size]))
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )
  const cartWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(WHATSAPP_PHONE, buildCartMessage(items, total)),
    [items, total]
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <SiteHeader
        cartCount={cartCount}
        items={items}
        total={total}
        cartWhatsAppUrl={cartWhatsAppUrl}
        instagramUrl={INSTAGRAM_URL}
        onClear={clear}
        onUpdateQuantity={updateQuantity}
      />

      <main
        id="main"
        className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-16 pt-12"
      >
        <HeroSection />

        <ProductGrid
          products={PRODUCTS}
          instagramUrl={INSTAGRAM_URL}
          buildWhatsAppUrl={(message) => buildWhatsAppUrl(WHATSAPP_PHONE, message)}
          buildItemMessage={buildItemMessage}
          sizesById={sizesById}
          onSizeChange={(id, size) =>
            setSizesById((prev) => ({
              ...prev,
              [id]: size
            }))
          }
          onAddItem={addItem}
        />
      </main>
      <SiteFooter paymentBadges={PAYMENT_BADGES} />
    </div>
  )
}

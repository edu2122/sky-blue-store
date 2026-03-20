import Image from 'next/image'

// import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Image
              src="/sky-blue-shop.svg"
              alt="Sky Blue Shop VE"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Sky Blue Shop VE
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Camisetas oficiales Mundial 2026
        </p>
        <h1 className="font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-balance md:text-4xl">
          Compra camisetas seleccionadas del mundial en una sola tienda.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Stock limitado, envios rapidos y solo selecciones clasificadas. Lanza
          tu pedido hoy y recibe antes del proximo partido.
        </p>
      </div>
      {/* <div className="flex flex-wrap gap-3">
        <Button className="rounded-full px-6">Comprar ahora</Button>
        <Button variant="outline" className="rounded-full px-6">
          Ver tallas
        </Button>
      </div> */}
    </section>
  )
}

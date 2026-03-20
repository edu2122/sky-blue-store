import { Badge } from '@/components/ui/badge'
import { BinanceIcon } from '@/components/icons/binance'
import { MastercardIcon } from '@/components/icons/mastercard'
import { PayPalIcon } from '@/components/icons/paypal'
import { VenezuelaFlagIcon } from '@/components/icons/venezuela-flag'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { InstagramIcon } from '@/components/icons/instagram'
import type { PaymentBadge } from '@/lib/site-data'

type SiteFooterProps = {
  paymentBadges: PaymentBadge[]
}

export function SiteFooter({ paymentBadges }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-2">
          <p className="text-sm font-semibold">Metodos de pago</p>
          <p className="text-xs text-muted-foreground">
            Pagos en USD y bolivares. Confirmamos disponibilidad por WhatsApp o
            Instagram.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {paymentBadges.map((payment) => (
            <Badge
              key={payment.name}
              variant="secondary"
              className="flex items-center gap-2 px-3 py-2"
            >
              {payment.icon === 'paypal' ? (
                <PayPalIcon className="h-4 w-auto" />
              ) : payment.icon === 'binance' ? (
                <BinanceIcon className="h-4 w-auto" />
              ) : payment.icon === 'mastercard' ? (
                <MastercardIcon className="h-4 w-auto" />
              ) : payment.icon === 'venezuela' ? (
                <VenezuelaFlagIcon className="h-4 w-auto" />
              ) : null}
              <span className="text-xs">{payment.name}</span>
            </Badge>
          ))}
        </div>
        <div className="grid max-w-3xl gap-3 text-xs text-muted-foreground sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-foreground">Envios</p>
            <p>Envio express 24/48h en Caracas y envio nacional 2-5 dias.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Atencion</p>
            <p>Horario: Lunes a Sabado, 9:00am - 6:00pm.</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <span>© 2026 Sky Blue Shop VE. Todos los derechos reservados.</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>
              <WhatsAppIcon className="inline h-4 w-auto" /> +58 414-3323040
            </span>
            <span>
              <InstagramIcon className="inline h-4 w-auto" /> @skyblueshopve
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

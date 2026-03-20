'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full px-3"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? 'Claro' : 'Oscuro'}
    </Button>
  )
}

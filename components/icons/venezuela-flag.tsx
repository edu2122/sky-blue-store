import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function VenezuelaFlagIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <g id="ve-d" transform="translate(0 -36)">
          <g id="ve-c">
            <g id="ve-b">
              <path id="ve-a" fill="#fff" d="M0-5-1.5-.2l2.8.9z" />
              <use xlinkHref="#ve-a" transform="scale(-1 1)" />
            </g>
            <use xlinkHref="#ve-b" transform="rotate(72)" />
          </g>
          <use xlinkHref="#ve-b" transform="rotate(-72)" />
          <use xlinkHref="#ve-c" transform="rotate(144)" />
        </g>
      </defs>
      <path fill="#cf142b" d="M0 0h640v480H0z" />
      <path fill="#00247d" d="M0 0h640v320H0z" />
      <path fill="#fc0" d="M0 0h640v160H0z" />
      <g id="ve-f" transform="matrix(4 0 0 4 320 336)">
        <g id="ve-e">
          <use xlinkHref="#ve-d" transform="rotate(10)" />
          <use xlinkHref="#ve-d" transform="rotate(30)" />
        </g>
        <use xlinkHref="#ve-e" transform="rotate(40)" />
      </g>
      <use xlinkHref="#ve-f" transform="rotate(-80 320 336)" />
    </svg>
  )
}

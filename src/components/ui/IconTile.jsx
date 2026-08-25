import { cn } from '../../lib/cn'

const SIZES = {
  sm: 'h-[42px] w-[42px] rounded-[10px]',
  md: 'h-11 w-11 rounded-[11px]',
  lg: 'h-12 w-12 rounded-xl',
  xl: 'h-16 w-16 rounded-2xl',
}

const ICON_SIZE = { sm: 20, md: 22, lg: 22, xl: 28 }

/** Rounded pastel tile holding a line icon. Colour comes from `className`. */
export function IconTile({ icon: Icon, size = 'sm', className }) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center',
        SIZES[size],
        className,
      )}
    >
      <Icon size={ICON_SIZE[size]} />
    </div>
  )
}

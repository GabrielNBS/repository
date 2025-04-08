// types/ButtonProps.ts
export type ButtonProps =
  | {
      children: React.ReactNode
      as?: 'a'
      href: string
      target?: string
      rel?: string
      onClick?: never
      type?: never
    }
  | {
      children: React.ReactNode
      as?: 'button'
      onClick?: () => void
      type?: 'button' | 'submit'
      href?: never
      target?: never
      rel?: never
    }

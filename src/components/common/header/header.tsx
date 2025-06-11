import { ReactNode } from "react"

interface IHeaderProps {
  children: ReactNode
}

export default function Header({ children }: Readonly<IHeaderProps>) {
  return (
    <div style={{ fontSize: '20px' }}>
      {children}
    </div>
  )
}
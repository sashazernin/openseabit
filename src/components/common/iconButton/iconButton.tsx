import { CSSProperties, ReactNode } from "react"
import styles from './iconButton.module.css'

interface IIconButtonProps {
  onClick?: (e: React.MouseEvent) => void,
  children?: ReactNode,
  style?: CSSProperties,
  className?: string
}

export default function IconButton(props: Readonly<IIconButtonProps>) {
  const {
    children,
    onClick,
    style,
    className
  } = props
  return (
    <div onClick={onClick} style={style} className={`${styles.iconButton} ${className ?? ''}`}>
      {children ?? null}
    </div>
  )
}
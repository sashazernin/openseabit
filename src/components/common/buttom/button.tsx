import { CSSProperties, ReactNode } from 'react'
import styles from './button.module.css'

interface IButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (e: React.MouseEvent) => void,
  children?: ReactNode,
  style?: CSSProperties,
  className?: string
}

export default function Button({ className, ...rest }: Readonly<IButtonProps>) {
  return (
    <div {...rest} className={`${styles.customButton} ${className ?? ''}`}></div>
  )

}
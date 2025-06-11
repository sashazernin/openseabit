import { ChangeEvent, ClipboardEvent, ReactNode, useState } from 'react'
import styles from './input.module.css'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { IInputBase } from '../../../utils/types'

interface IInputProps extends IInputBase {
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent) => void,
  active?: boolean,
  startField?: ReactNode,
  endField?: ReactNode,
  type?: 'string' | 'number'
}

export default function Input(props: Readonly<IInputProps>) {
  const {
    onChange,
    onClick,
    onPaste,
    value: propValue,
    style: propStyle,
    className,
    label,
    placeholder,
    active: activeProp,
    startField,
    endField,
    type = 'string'
  } = props

  const [focus, setFocus] = useState(false)
  const [ref] = useOutsideClick(focus, () => setFocus(false))
  const [value, setValue] = useState<string>('')

  const [withPoint, setWithPoint] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const validate = (value: string) =>
        /^-?(?:\d+(\.\d*)?|\.\d+)?$/.test(value) || value === '';
      const value = (() => {
        const value = e.target.value.replace(',', '.')
        const lastChar = value?.[value.length - 1]
        if ((lastChar === '.' || isNaN(Number(lastChar))) && withPoint) return value
        if (lastChar === '.' && value.split('.').length < 3) {
          setWithPoint(true)
          return value.replace('.', '')
        }
        if (withPoint && !value.includes('.')) {
          setWithPoint(false)
          return value.replace('.', '')
        }
        if (withPoint && value.includes('.')) {
          setWithPoint(false)
          return value
        }
        return value
      })();

      if (!validate(value)) return;
      setValue(e.target.value)
      onChange && onChange({ ...e, target: { ...e.target, value: value } })
      return
    }
    setValue(e.target.value)
    onChange && onChange(e)
  }

  const handleClick = (e: React.MouseEvent) => {
    setFocus(true)
    onClick && onClick(e)
  }

  const focusStyle = {
    border: '1px solid #591893',
    outline: '1px solid #591893'
  }

  const active = (propValue ?? value) || focus || activeProp

  const style = {
    ...propStyle,
    ...(active ? focusStyle : {})
  }

  return (
    <div ref={ref} onClick={handleClick} style={style} className={`${styles.inpotContainer} ${className ?? ''}`}>
      {startField && startField}
      <input onPaste={onPaste} value={(propValue ?? value) + `${withPoint ? '.' : ''}`} onChange={handleChange} placeholder={placeholder} />
      {endField && endField}
      {label && <div style={active ? { top: '-10px', left: '6px', fontSize: '14px', lineHeight: '14px' } : {}} className={styles.label}>{label}</div>}
    </div>
  )
}
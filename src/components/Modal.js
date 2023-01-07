import { useState, useRef } from 'react'
import { cn, useWindowListener, useCustomListener } from '../lib/util'

export default function Modal({ id, className, children, transition = 'modal', alert = false }) {
  const [active, setActive] = useState(null)
  const ref = useRef()

  const setModalActive = value => {
    setActive(value)
    document.body.style.overflow = !alert && value ? 'hidden' : 'auto'
  }

  useWindowListener('keydown', e => {
    if (active && !e.repeat && e?.key?.toLowerCase() === 'escape') {
      setModalActive(false)
    }
  })

  useCustomListener(ref, 'ModalAction', e => {
    const action = e.detail.action
    setModalActive(action < 2 ? action : !active)
    
    if (action && alert) {
      setTimeout(() => setModalActive(false), 2000)
    }
  })

  return (
    <span
      ref={ref}
      id={id}
      className={cn('modal-wrapper', active ? 'modal-active' : 'modal-inactive')}
    >
      {!alert &&
        <div
          className='modal-bg'
          onClick={() => setModalActive(false)}
          style={{ display: active ? 'initial' : 'none' }}
        />
      }

      <menu
        className={cn('modal', transition + '-' + (active ? 'open' : 'close'), className)}
        aria-hidden={!active}
        style={{ visibility: active === null && 'hidden !important' }}
      >
        {children}
      </menu>
    </span>
  )
}
import { Modal } from '.'
import { closeModal } from '../lib/util'

export default function DialogModal({ id, title, children }) {
  return (
    <Modal id={id} className='dialog'>
      <button className='dialog-close-btn' aria-label='Close dialog' onClick={closeModal}>
        <i className='fa fa-close fa-lg' />
      </button>
      <p className='h3 dialog-title'>
        {title}
      </p>
      {children}
    </Modal>
  )
}
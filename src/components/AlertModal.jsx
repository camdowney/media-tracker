import { Modal } from '.'

export default function AlertModal({ id, type = 'success', children }) {
  return (
    <Modal id={id} className='alert' transition='alert' alert={true}>
      <i className={`fa fa-${type === 'success' ? 'check' : 'warning'} fa-lg alert-icon`} /> {children}  
    </Modal>
  )
}
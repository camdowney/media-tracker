import { Card } from '.'

export default function List({ title, items, hideToolbar, openEditModal, openDeleteModal }) {
  return (
    <section>
      <div className='container'>
        <div className='list-header'>
          <h2>{title}</h2>
          {!hideToolbar && (
            <div className='btn-group'>
              <button className='btn btn-dark' onClick={openEditModal}>
                <i className='fa fa-edit' /> Edit list
              </button>
              <button className='btn btn-dark' onClick={openDeleteModal}>
                <i className='fa fa-trash' /> Delete list
              </button>
            </div>
          )}
        </div>
        <div className='media-grid'>
          {items?.map((item, i) =>
            <Card key={i} {...item} />
          )}
        </div>
      </div>
    </section>
  )
}
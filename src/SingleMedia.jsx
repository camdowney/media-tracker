import { useState, useEffect } from 'react'
import { DialogModal, Checklist, AlertModal } from './components'
import { useSubscribeLists, useListManager, slugify, capitalize, openModal, closeModal } from './lib/util'
import mediaData from './lib/mediaData'

export default function SingleMedia() {
  const urlParams = new URLSearchParams(window.location.search)
  const mediaItem = mediaData.find(item => item.id == urlParams.get('id'))
  const { id, title, format, year, genres, description, pos } = mediaItem

  const listManager = useListManager()
  const lists = useSubscribeLists()
  const [checklistLists, setChecklistLists] = useState(lists)

  useEffect(() => {
    setChecklistLists(lists.map(list => ({
      ...list,
      active: list.items?.includes(id) ? true : false,
    })))
  }, [lists])
  
  const [alertData, setAlertData] = useState({ type: '', text: '' })

  function openAlert(type, text) {
    setAlertData({ type, text })
    openModal('#alert')
  }

  function handleUpdateLists(e) {
    e.preventDefault()

    const checks = [...e.target.elements].slice(0, -1).map(input => input.value)

    const newLists = lists.map((list, index) => ({
      ...list,
      items: checks[index] === 'true'
        ? (list.items ? [...new Set([...list.items, id])] : [id]) // add item to list
        : (list.items?.filter(item => item !== id) ?? null) // remove item from list
      })
    )

    try {
      listManager.updateAll(newLists)
      openAlert('success', 'Your changes have been saved!')
    }
    catch (err) {
      console.error(err)
      openAlert('error', 'There was an error saving your changes.')
    }
    finally {
      closeModal('#add-to-lists')
    }
  }

  return (
    <main>
      <section>
        <div className='container single-media'>
          <div className='single-media-poster'>
            <img src={`/${format}/${slugify(title)}.webp`} className={`cover image-${pos}`} alt={title} />
          </div>
          <div className='single-media-content'>
            <h1>{title} - {capitalize(format)}</h1>
            <p>{year}</p>
            <p>{genres.join(' - ')}</p>
            <p className='single-media-description'>{description}</p>
            <div className='btn-group single-media-cta'>
              <button onClick={() => openModal('#add-to-lists')} className='btn btn-alt'>
                <i className='fa fa-bookmark' /> Add to list
              </button>
            </div>
          </div>
        </div>
      </section>

      <DialogModal id='add-to-lists' title='Add Media to List(s)'>
        <form method='post' className='create-form' onSubmit={handleUpdateLists}>
          <Checklist label='My Lists:' items={checklistLists} />
          <div>
            <button className='btn btn-alt' type='submit'>Save changes</button>
          </div>
        </form>
      </DialogModal>

      <AlertModal id='alert' type={alertData.type}>
        {alertData.text}
      </AlertModal>
    </main>
  )
}
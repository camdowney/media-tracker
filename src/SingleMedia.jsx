import { useState, useEffect } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { DialogModal, Checklist, AlertModal } from './components'
import { useAuthUser, slugify, capitalize, openModal, closeModal } from './lib/util'
import mediaData from './lib/mediaData'
import db from './lib/db'

export default function SingleMedia() {
  const user = useAuthUser()
  
  const [myLists, setMyLists] = useState([])
  const [alertData, setAlertData] = useState({ type: '', text: '' })

  const urlParams = new URLSearchParams(window.location.search)
  const mediaItem = mediaData.find(item => item.id == urlParams.get('id'))
  const { id, title, format, year, genres, description, pos } = mediaItem

  function openAlert(type, text) {
    setAlertData({ type, text })
    openModal('#alert')
  }

  function handleAddToList(e) {
    e.preventDefault()

    const checks = [...e.target.elements].slice(0, -1).map(input => input.value)

    try {
      checks.forEach((value, index) => {
        const list = myLists[index]
        const listRef = ref(db, `lists/${user?.uid}/${list.id}`)

        if (value === 'true') {
          update(listRef, {
            items: !list.items ? [id] : list.items.includes(id) ? list.items : [...list.items, id]
          })
        }
        else {
          update(listRef, {
            items: list.items?.filter(item => item !== id) || []
          })
        }
      })

      openAlert('success', 'Your changes have been saved!')
    }
    catch {
      openAlert('error', 'There was an issue saving your changes, please try again.')
    }
    finally {
      closeModal('#add-to-lists')
    }
  }

  useEffect(() => {
    return onValue(ref(db, `lists/${user?.uid}`), snapshot => {
      if (!snapshot.exists()) {
        return
      }

      const data = Object.entries(snapshot.val())
      const lists = data.map(([id, listData]) => ({
        ...listData,
        id,
      }))

      setMyLists(lists)
    })
  }, [user])

  const lists = myLists.map(list => ({
    ...list,
    active: list.items?.includes(id) ? true : false,
  }))

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
        <form method='post' className='create-form' onSubmit={handleAddToList}>
          <Checklist label='My Lists:' items={lists} />
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
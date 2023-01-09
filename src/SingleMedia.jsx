import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onValue, ref, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DialogModal, Checklist, AlertModal } from './components'
import { slugify, capitalize, openModal, closeModal } from './lib/util'
import db from './lib/db'

export default function SingleMedia() {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  
  const [myLists, setMyLists] = useState([])

  const { id, title, format, year, genres, description, pos } = useLocation().state

  function addToList() {
    openModal('#add-to-lists')
  }

  function handleAdd(e) {
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

      openModal('#alert-add-success')
    }
    catch {
      openModal('#alert-add-error')
    }
    finally {
      closeModal('#add-to-lists')
    }
  }

  useEffect(() => window.scrollTo(0, 0), [])

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
            <img src={`../../${format}/${slugify(title)}.webp`} className={`cover image-${pos}`} alt={title} />
          </div>
          <div className='single-media-content'>
            <h1>{title} - {capitalize(format)}</h1>
            <p>{year}</p>
            <p>{genres.join(' - ')}</p>
            <p className='single-media-description'>{description}</p>
            <div className='btn-group single-media-cta'>
              <button onClick={addToList} className='btn btn-alt'><i className='fa fa-bookmark' /> Add to list</button>
            </div>
          </div>
        </div>
      </section>

      <DialogModal id='add-to-lists' title='Add Media to List(s)'>
        <form method='post' className='create-form' onSubmit={handleAdd}>
          <Checklist label='My Lists:' items={lists} />
          <div>
            <button className='btn btn-alt' type='submit'>Save changes</button>
          </div>
        </form>
      </DialogModal>

      <AlertModal id='alert-add-success' type='success'>
        Your changes have been saved!
      </AlertModal>
      <AlertModal id='alert-add-error' type='error'>
        There was an issue saving your changes, please try again.
      </AlertModal>
    </main>
  )
}
import { useState, useEffect } from 'react'
import { onValue, ref, push, update, remove } from 'firebase/database'
import { Hero, List, DialogModal, Checklist, AlertModal } from './components'
import { useAuthUser, openModal, closeModal } from './lib/util'
import mediaData from './lib/mediaData'
import db from './lib/db'

export default function MyLists() {
  const user = useAuthUser()

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [myLists, setMyLists] = useState([])
  const [alertData, setAlertData] = useState({ type: '', text: '' })

  function openAlert(type, text) {
    setAlertData({ type, text })
    openModal('#alert')
  }

  function createList() {
    document.querySelector('#new-title').value = ''
    openModal('#create-list')
  }

  function editList(index) {
    setSelectedTitle(myLists[index]?.title ?? '')
    setSelectedIndex(index)

    openModal('#edit-list')
  }

  function deleteList(index) {
    setSelectedTitle(myLists[index]?.title ?? '')
    setSelectedIndex(index)

    openModal('#delete-list')
  }

  function handleCreateList(e) {
    e.preventDefault()

    try {
      const newTitle = document.querySelector('#new-title')?.value

      push(ref(db, `lists/${user?.uid}`), {
        title: newTitle,
      })

      openAlert('success', `List '${newTitle}' has been created!`)
    }
    catch {
      openAlert('error', 'Something went wrong while creating a new list.')
    }
    finally {
      closeModal('#create-list')
    }
  }

  function handleEditList(e) {
    e.preventDefault()

    const inputs = e.target.elements
    const title = inputs[0].value
    const checks = [...inputs].slice(1, -1).map(input => input.value)

    const filtered = myLists[selectedIndex].items?.filter((_, i) => checks[i] === 'true').map(list => list.id)
    const id = myLists[selectedIndex]?.id

    try {
      update(ref(db, `lists/${user?.uid}/${id}`), {
        title,
        items: filtered ?? [],
      })

      openAlert('success', 'Your changes have been saved!')
    }
    catch {
      openAlert('error', 'Something went wrong while editing this list.')
    }
    finally {
      closeModal('#edit-list')
    }
  }

  function handleDeleteList() {
    const id = myLists[selectedIndex]?.id

    try {
      remove(ref(db, `/lists/${user?.uid}/${id}`))

      setSelectedIndex(null)
      setMyLists(myLists.filter(list => list.id !== id))

      openAlert('success', 'List has been deleted.')
    }
    catch {
      openAlert('error', 'Something went wrong while deleting this list.')
    }
    finally {
      closeModal('#delete-list')
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
        items: listData.items?.map(id => mediaData.find(item => item.id === id)),
      }))

      setMyLists(lists)
    })
  }, [user])

  return (
    <main>
      <Hero title='My Lists' />

      <section className='top-section'>
        <div className='container'>
          <button className='btn btn-alt' onClick={createList}>
            <i className='fa fa-plus' /> Create list
          </button>
        </div>
      </section>

      {myLists?.map((list, index) =>
        <List
          key={index}
          title={list.title}
          items={list.items}
          editList={() => editList(index)}
          deleteList={() => deleteList(index)}
        />
      )}

      <DialogModal id='create-list' title='Create List'>
        <form method='post' className='create-form' onSubmit={handleCreateList}>
          <div className='vertical-field'>
            <label htmlFor='new-title'>Title:</label>
            <input id='new-title' className='input' type='text' placeholder='Start typing here...' required />
          </div>
          <div>
            <button className='btn btn-alt' type='submit'>Create list</button>
          </div>
        </form>
      </DialogModal>

      <DialogModal id='edit-list' title='Edit List'>
        <form method='post' className='create-form' onSubmit={handleEditList}>
          <div className='vertical-field'>
            <label htmlFor='edit-title'>Title:</label>
            <input id='edit-title' className='input' type='text' placeholder='Start typing here...' required defaultValue={selectedTitle} />
          </div>
          <Checklist label='Items:' items={myLists[selectedIndex]?.items} />
          <div>
            <button className='btn btn-alt' type='submit'>Save changes</button>
          </div>
        </form>
      </DialogModal>

      <DialogModal id='delete-list' title={`Delete List '${selectedTitle}'?`}>
        <div className='btn-group'>
          <button className='btn btn-alt' onClick={handleDeleteList}>
            Delete list
          </button>
          <button className='btn btn-dark' onClick={closeModal}>Cancel</button>
        </div>
      </DialogModal>

      <AlertModal id='alert' type={alertData.type}>
        {alertData.text}
      </AlertModal>
    </main>
  )
}
import { useState } from 'react'
import { Hero, List, DialogModal, Checklist, AlertModal } from './components'
import { useSubscribeLists, useListManager, openModal, closeModal } from './lib/util'
import mediaData from './lib/mediaData'

export default function MyLists() {
  const listManager = useListManager()
  const lists = useSubscribeLists()

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [alertData, setAlertData] = useState({ type: '', text: '' })

  function openAlert(type, text) {
    setAlertData({ type, text })
    openModal('#alert')
  }

  function openCreateModal() {
    document.querySelector('#new-title').value = ''
    openModal('#create-list')
  }

  function openEditModal(index) {
    setSelectedTitle(lists[index]?.title ?? '')
    setSelectedIndex(index)

    openModal('#edit-list')
  }

  function openDeleteModal(index) {
    setSelectedTitle(lists[index]?.title ?? '')
    setSelectedIndex(index)

    openModal('#delete-list')
  }

  function handleCreateList(e) {
    e.preventDefault()

    const title = document.querySelector('#new-title')?.value

    try {
      listManager.create({ title })
      openAlert('success', `List '${title}' has been created!`)
    }
    catch (err) {
      console.error(err)
      openAlert('error', 'There was an error creating a new list.')
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

    const items = lists[selectedIndex].items?.filter((_, i) => checks[i] === 'true').map(list => list.id) ?? null
    const listID = lists[selectedIndex]?.id

    try {
      listManager.update(listID, { title, items })
      openAlert('success', 'Your changes have been saved!')
    }
    catch (err) {
      console.error(err)
      openAlert('error', 'There was an error editing this list.')
    }
    finally {
      closeModal('#edit-list')
    }
  }

  function handleDeleteList() {
    const listID = lists[selectedIndex]?.id

    try {
      lists.splice(selectedIndex, 1) // a bit hacky; useState array methods don't trigger re-renders
      setSelectedIndex(null)

      listManager.remove(listID)
      openAlert('success', 'List has been deleted.')
    }
    catch (err) {
      console.error(err)
      openAlert('error', 'There was an error deleting this list.')
    }
    finally {
      closeModal('#delete-list')
    }
  }

  return (
    <main>
      <Hero title='My Lists' />

      <section className='top-section'>
        <div className='container'>
          <button className='btn btn-alt' onClick={openCreateModal}>
            <i className='fa fa-plus' /> Create list
          </button>
        </div>
      </section>

      {lists?.map((list, index) =>
        <List
          key={index}
          title={list.title}
          items={list.items?.map(id => mediaData.find(media => media.id === id))}
          openEditModal={() => openEditModal(index)}
          openDeleteModal={() => openDeleteModal(index)}
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
          <Checklist label='Items:' items={lists[selectedIndex]?.items} />
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
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { 
  onValue,
  ref,
  push as firebasePush,
  update as firebaseUpdate,
  remove as firebaseRemove,
} from 'firebase/database'
import db from './db'

export function useSubscribeLists() {
  const user = useAuthUser()
  const [lists, setLists] = useState([])

  useEffect(() => {
    const userRef = ref(db, `lists/${user.uid}`)

    return onValue(userRef, snapshot => {
      if (!snapshot.exists()) {
        return
      }

      setLists(
        Object.entries(snapshot.val())
          .map(([id, data]) => ({ ...data, id }))
      )
    })
  }, [user])

  return lists
}

export function useListManager() {
  const user = useAuthUser()

  function create(data) {
    const userRef = ref(db, `lists/${user.uid}`)
    firebasePush(userRef, data)
  }
  
  function update(listID, data) {
    if (!listID)
      return console.error('Missing list id.')
  
    const listRef = ref(db, `lists/${user.uid}/${listID}`)
    firebaseUpdate(listRef, data)
  }

  function updateAll(lists) {
    lists.forEach(({ id, items }) => {
      const listRef = ref(db, `lists/${user.uid}/${id}`)
      firebaseUpdate(listRef, { items })
    })
  }
  
  function remove(listID) {
    if (!listID)
      return console.error('Missing list id.')
  
    const listRef = ref(db, `/lists/${user.uid}/${listID}`)
    firebaseRemove(listRef)
  }

  return {
    create,
    update,
    updateAll,
    remove,
  }
}

export function useAuthUser() {
  const auth = getAuth()
  const [user, setUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [])

  return user
}

export function useCustomListener(ref, event, callback) {
  useEffect(() => {
    const current = ref.current
    current.addEventListener(event, callback)
    return () => current.removeEventListener(event, callback)
  }, [ref, event, callback])
}

export function useWindowListener(event, callback) {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

function signalModal(selector, action) {
  const target = typeof selector === 'string' 
    ? document.querySelector(selector)
    : selector.currentTarget.closest('.modal-wrapper')
    
  target?.dispatchEvent(new CustomEvent('ModalAction', { detail: { action } }))
}

export const closeModal = selector =>
  signalModal(selector, 0)

export const openModal = selector =>
  signalModal(selector, 1)

export const toggleModal = selector =>
  signalModal(selector, 2)

export const cn = (...classes) =>
  classes.filter(Boolean).join(' ')

export const slugify = str =>
	(str || '').toLowerCase().replace(/[^\w\s\-/]+/g, '').replace(/[\s-]+/g, '-')

export const capitalize = str => 
	str[0].toUpperCase() + str.substring(1)

export const sortByProp = (arr, prop) =>
	(arr || []).sort((left, right) => left[prop] >= right[prop] ? 1 : -1)
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

export const useAuthUser = () => {
  const auth = getAuth()
  const [user, setUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [])

  return user
}

export const useCustomListener = (ref, event, callback) => {
  useEffect(() => {
    const current = ref.current
    current.addEventListener(event, callback)
    return () => current.removeEventListener(event, callback)
  }, [ref, event, callback])
}

export const useWindowListener = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

const signalModal = (selector, action) => {
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
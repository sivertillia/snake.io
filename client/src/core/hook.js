import { useEffect, useRef, useState } from 'react'
import { useColor } from 'react-color-palette'


export const useInterval = (callback, ms) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (ms !== null || ms) {
      console.log('Start game')
      let id = setInterval(tick, ms)
      return () => clearInterval(id)
    }
  }, [ms])
}


export const useStorageState = (key, initialState) => {

  const [state, setState] = useState(() => {
    const itemStorage = localStorage.getItem(key)
    return !itemStorage ? initialState : JSON.parse(itemStorage)
  })
  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [state])

  return [state, setState]
}
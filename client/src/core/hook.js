import { useEffect, useRef } from 'react';


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
import { useCallback } from 'react'
import { useRef } from 'react'

export const useDebaunce = (callback, delay) => {
  const timer = useRef()

  const debauncedCallBack = useCallback((...args) => {
    if(timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debauncedCallBack
}
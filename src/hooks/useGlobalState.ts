import { useContext } from 'react'

import { GlobalContext } from '../lib/context'

export const useGlobalState = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('useMyContext must be used within a ContextProvider')
  }

  return context
}

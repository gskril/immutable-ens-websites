import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type GlobalContextValue = {
  step: number
  possibleSteps: number[]
  nextStep: () => void
}

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined
)

type GlobalContextProviderProps = {
  children: ReactNode // or ReactChild
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const possibleSteps = [0, 1, 2, 3, 4, 5, 6]

  // TODO: would be nice to have this as a global context
  // Step 0: User is not connected
  // Step 1: Check if a parent name is wrapped
  // Step 2: Call `approve` on the NameWrapper
  // Step 3: Burn `CANNOT_UNWRAP` and `CANNOT_APPROVE` on the 2LD
  // Step 4: Create subname using the lockable resolver contract while burning fuses on the subname
  // Step 5: Set contenthash on the subname
  // Step 6: Lock contenthash on the subname
  const [step, setStep] = useState<number>(0)
  const nextStep = () => setStep(step + 1)

  const { isDisconnected } = useAccount()

  useEffect(() => {
    if (isDisconnected) setStep(0)
  }, [isDisconnected])

  const value: GlobalContextValue = {
    step,
    possibleSteps,
    nextStep,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

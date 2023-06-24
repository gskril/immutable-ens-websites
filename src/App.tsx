import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { Nav } from './components/Nav'
import { Steps } from './components/Steps'
import { Layout } from './components/atoms'
import {
  ApproveRenewalController,
  BurnParentFuses,
  Hero,
  WrapParent,
} from './components/screens'
import useDebounce from './hooks/useDebounce'

const possibleSteps = [0, 1, 2, 3, 4, 5, 6, 7]
type PossibleSteps = (typeof possibleSteps)[number]

export default function App() {
  // TODO: would be nice to have this as a global context
  // Step 0: User is not connected
  // Step 1: Check if a parent name is wrapped
  // Step 2: Call `approve` on the NameWrapper
  // Step 3: Burn `CANNOT_UNWRAP` and `CANNOT_APPROVE` on the 2LD
  // Step 4: Create subname using the lockable resolver contract
  // Step 5: Set contenthash on the subname
  // Step 6: Lock contenthash on the subname
  // Step 7: Burn CAN_EXTEND_EXPIRY | PARENT_CANNOT_CONTROL | CANNOT_UNWRAP | CANNOT_SET_RESOLVER on the subname
  const [step, setStep] = useState<PossibleSteps>(0)
  const nextStep = () => setStep(step + 1)
  const { isDisconnected } = useAccount()

  useEffect(() => {
    if (isDisconnected) setStep(0)
  }, [isDisconnected])

  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 500)

  return (
    <>
      <Layout>
        <Nav />

        <main>
          {step === 0 && <Hero nextStep={nextStep} />}

          {step === 1 && (
            <WrapParent
              name={debouncedName}
              setName={setName}
              nextStep={nextStep}
            />
          )}

          {step === 2 && (
            <ApproveRenewalController
              name={debouncedName}
              nextStep={nextStep}
            />
          )}

          {step === 3 && (
            <BurnParentFuses name={debouncedName} nextStep={nextStep} />
          )}

          {step > 0 && (
            <Steps currentStep={step} totalSteps={possibleSteps.length} />
          )}
        </main>

        {/* Footer placeholder */}
        <div style={{ height: '3rem' }} />
      </Layout>
    </>
  )
}

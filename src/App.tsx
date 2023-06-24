import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { Nav } from './components/Nav'
import { Steps } from './components/Steps'
import { Layout } from './components/atoms'
import { Hero, WrapParent } from './components/screens'

const possibleSteps = [0, 1, 2]
type PossibleSteps = (typeof possibleSteps)[number]

export default function App() {
  // TODO: would be nice to have this as a global context
  // Step 0: User is not connected
  // Step 1: User has connected wallet
  const [step, setStep] = useState<PossibleSteps>(0)
  const nextStep = () => setStep(step + 1)
  const { isDisconnected } = useAccount()

  useEffect(() => {
    if (isDisconnected) setStep(0)
  }, [isDisconnected])

  return (
    <>
      <Layout>
        <Nav />

        <main>
          {step === 0 && <Hero nextStep={nextStep} />}

          {step === 1 && <WrapParent nextStep={nextStep} />}

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

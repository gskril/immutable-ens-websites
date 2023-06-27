import { useState } from 'react'

import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Steps } from './components/Steps'
import { Layout } from './components/atoms'
import {
  ApproveRenewalController,
  BurnParentFuses,
  Hero,
  LockContentHash,
  RegisterSubname,
  SetContentHash,
  Success,
  WrapParent,
} from './components/screens'
import useDebounce from './hooks/useDebounce'
import { useGlobalState } from './hooks/useGlobalState'

export default function App() {
  const { step, possibleSteps } = useGlobalState()

  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 500)

  const [subname, setSubname] = useState('')
  const debouncedSubname = useDebounce(subname, 500)

  return (
    <>
      <Layout>
        <Nav />

        <main>
          {step === 0 && <Hero />}

          {step === 1 && <WrapParent name={debouncedName} setName={setName} />}

          {step === 2 && <ApproveRenewalController name={debouncedName} />}

          {step === 3 && <BurnParentFuses name={debouncedName} />}

          {step === 4 && (
            <RegisterSubname
              name={debouncedName}
              subname={debouncedSubname}
              setSubname={setSubname}
            />
          )}

          {step === 5 && (
            <SetContentHash name={debouncedName} subname={debouncedSubname} />
          )}

          {step === 6 && (
            <LockContentHash name={debouncedName} subname={debouncedSubname} />
          )}

          {step === 7 && <Success name={name} subname={subname} />}

          {step > 0 && (
            <Steps currentStep={step} totalSteps={possibleSteps.length} />
          )}
        </main>

        <Footer />
      </Layout>
    </>
  )
}

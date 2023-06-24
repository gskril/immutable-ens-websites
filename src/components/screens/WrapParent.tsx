import { Button, Input } from '@ensdomains/thorin'
import { useState } from 'react'
import { namehash } from 'viem'
import { useContractRead, useNetwork } from 'wagmi'

import { getWrapperContract } from '../../contracts'
import useDebounce from '../../hooks/useDebounce'
import { Card, Container } from '../atoms'

type Props = {
  nextStep: () => void
}

export function WrapParent({ nextStep }: Props) {
  const { chain } = useNetwork()
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 500)

  const nameWrapper = getWrapperContract(chain?.id)

  const { data: isWrapped } = useContractRead({
    ...nameWrapper,
    functionName: 'isWrapped',
    args: [namehash(debouncedName + '.eth')],
    enabled: !!debouncedName,
  })

  return (
    <Container>
      <Card title="Wrap Your ENS Name">
        <Input
          label=".eth name"
          type="text"
          suffix=".eth"
          onChange={(e) => setName(e.target.value)}
        />

        {!isWrapped ? (
          <Button disabled={isWrapped === undefined}>Wrap Name</Button>
        ) : (
          <Button onClick={() => nextStep()}>Continue</Button>
        )}
      </Card>
    </Container>
  )
}

import { Button, Input } from '@ensdomains/thorin'
import { useState } from 'react'
import { namehash } from 'viem'
import { useAccount, useContractReads, useNetwork } from 'wagmi'

import { getWrapperContract } from '../../contracts'
import useDebounce from '../../hooks/useDebounce'
import { Card, Container } from '../atoms'

type Props = {
  nextStep: () => void
}

export function WrapParent({ nextStep }: Props) {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 500)
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: nameWrapperReads } = useContractReads({
    contracts: [
      {
        ...nameWrapper,
        functionName: 'isWrapped',
        args: [namehash(debouncedName + '.eth')],
      },
      {
        ...nameWrapper,
        functionName: 'canModifyName',
        args: [
          namehash(debouncedName + '.eth'),
          address || ('' as `0x${string}`),
        ],
      },
    ],
    enabled: !!debouncedName,
  })

  const isWrapped = nameWrapperReads?.[0].result
  const canModifyName = nameWrapperReads?.[1].result

  // TODO: ideally we can wrap the name without linking externally but this isn't working
  // const prepareTx = usePrepareContractWrite({
  //   ...nameWrapper,
  //   functionName: 'wrapETH2LD',
  //   args: [
  //     debouncedName,
  //     address || ('' as `0x${string}`),
  //     0,
  //     publicResolver.address,
  //   ],
  //   enabled: isWrapped === false && canModifyName === false,
  // })

  // const tx = useContractWrite(prepareTx.config)
  // const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Wrap Your ENS Name">
        <Input
          label=".eth name"
          type="text"
          suffix=".eth"
          onChange={(e) => setName(e.target.value)}
        />

        {(isWrapped && canModifyName) || debouncedName === '' ? (
          <Button disabled={debouncedName === ''} onClick={() => nextStep()}>
            Continue
          </Button>
        ) : isWrapped && !canModifyName ? (
          <Button disabled>No Permission</Button>
        ) : (
          <Button
            as="a"
            target="_blank"
            href={`https://app.ens.domains/${debouncedName}.eth?tab=more`}
          >
            Wrap Name
          </Button>
        )}
      </Card>
    </Container>
  )
}

import { Button, Input, OutlinkSVG } from '@ensdomains/thorin'
import { namehash } from 'viem/ens'
import { useAccount, useContractReads, useNetwork } from 'wagmi'

import { getWrapperContract } from '../../contracts'
import { useGlobalState } from '../../hooks/useGlobalState'
import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  setName: (name: string) => void
}

export function WrapParent({ name, setName }: Props) {
  const { nextStep } = useGlobalState()

  const { chain } = useNetwork()
  const { address } = useAccount()
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: nameWrapperReads } = useContractReads({
    contracts: [
      {
        ...nameWrapper,
        functionName: 'isWrapped',
        args: [namehash(name + '.eth')],
      },
      {
        ...nameWrapper,
        functionName: 'canModifyName',
        args: [namehash(name + '.eth'), address || ('' as `0x${string}`)],
      },
    ],
    enabled: !!name,
  })

  const isWrapped = nameWrapperReads?.[0].result
  const canModifyName = nameWrapperReads?.[1].result

  // TODO: ideally we can wrap the name without linking externally but this isn't working
  // const prepareTx = usePrepareContractWrite({
  //   ...nameWrapper,
  //   functionName: 'wrapETH2LD',
  //   args: [
  //     name,
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
        <CardDescription>
          Upgrade your name to the latest ENS contracts to enable fine-grained
          controls
        </CardDescription>

        <Input
          label=""
          hideLabel
          type="text"
          suffix=".eth"
          onChange={(e) => setName(e.target.value)}
        />

        {(isWrapped && canModifyName) || name === '' ? (
          <Button disabled={name === ''} onClick={() => nextStep()}>
            Continue
          </Button>
        ) : isWrapped && !canModifyName ? (
          <Button disabled>No Permission</Button>
        ) : (
          <Button
            as="a"
            target="_blank"
            href={`https://app.ens.domains/${name}.eth?tab=more`}
            suffix={<OutlinkSVG />}
          >
            Wrap Name
          </Button>
        )}
      </Card>
    </Container>
  )
}

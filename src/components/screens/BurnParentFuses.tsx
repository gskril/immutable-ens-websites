import { Button } from '@ensdomains/thorin'
import { namehash } from 'viem/ens'
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { getWrapperContract } from '../../contracts'
import { getFuseValue } from '../../utilts'
import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  nextStep: () => void
}

export function BurnParentFuses({ name, nextStep }: Props) {
  const { chain } = useNetwork()
  const nameWrapper = getWrapperContract(chain?.id)
  const fusesToBurn = [1, 64]
  const ownerControlledFuses = getFuseValue(fusesToBurn)

  const { data: isFusesBurned } = useContractRead({
    ...nameWrapper,
    functionName: 'allFusesBurned',
    args: [namehash(name + '.eth'), ownerControlledFuses],
  })

  const prepareTx = usePrepareContractWrite({
    ...nameWrapper,
    functionName: 'setFuses',
    args: [namehash(name + '.eth'), ownerControlledFuses],
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Lock Renewal Controller">
        <CardDescription>
          This is burning fuses on your name is not reversible.
        </CardDescription>

        {receipt.isSuccess || isFusesBurned ? (
          <Button onClick={() => nextStep()}>Continue</Button>
        ) : receipt.isError ? (
          <Button disabled>Transaction Failed</Button>
        ) : receipt.isLoading ? (
          <Button disabled loading>
            Transaction Processing
          </Button>
        ) : tx.isLoading ? (
          <Button disabled loading>
            Confirm in Wallet
          </Button>
        ) : prepareTx.isError ? (
          <Button disabled>Error Preparing Tx</Button>
        ) : (
          <Button disabled={!tx.write} onClick={() => tx.write?.()}>
            Lock
          </Button>
        )}
      </Card>
    </Container>
  )
}

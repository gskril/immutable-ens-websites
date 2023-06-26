import { Button } from '@ensdomains/thorin'
import { namehash } from 'viem/ens'
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { getResolverContract } from '../../contracts'
import { useGlobalState } from '../../hooks/useGlobalState'
import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  subname: string
}

export function LockContentHash({ name, subname }: Props) {
  const { nextStep } = useGlobalState()

  const { chain } = useNetwork()
  const resolver = getResolverContract(chain?.id)

  const prepareTx = usePrepareContractWrite({
    ...resolver,
    functionName: 'lockContenthash',
    args: [namehash(`${subname}.${name}.eth`)],
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Lock IPFS Website">
        <CardDescription>
          Permanently revoke the ability to change the IPFS hash associated with{' '}
          <strong>
            {subname}.{name}.eth
          </strong>
        </CardDescription>

        {receipt.isSuccess ? (
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
            Save
          </Button>
        )}
      </Card>
    </Container>
  )
}

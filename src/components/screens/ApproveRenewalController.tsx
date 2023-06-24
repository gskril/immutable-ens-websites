import { Button } from '@ensdomains/thorin'
import { namehash } from 'viem'
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { getManagerContract, getWrapperContract } from '../../contracts'
import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  nextStep: () => void
}

export function ApproveRenewalController({ name, nextStep }: Props) {
  const { chain } = useNetwork()
  const renewalController = getManagerContract(chain?.id)
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: approvedAddress } = useContractRead({
    ...nameWrapper,
    functionName: 'getApproved',
    args: [BigInt(namehash(name + '.eth'))],
  })

  const prepareTx = usePrepareContractWrite({
    ...nameWrapper,
    functionName: 'approve',
    args: [renewalController.address, BigInt(namehash(name + '.eth'))],
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  const isApproved = approvedAddress === renewalController.address

  return (
    <Container>
      <Card title="Approve Renewal Controller">
        <CardDescription>
          Allow anyone to renew subnames of {name}.eth
        </CardDescription>

        {receipt.isSuccess || isApproved ? (
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
          <Button onClick={() => tx.write?.()}>Approve</Button>
        )}
      </Card>
    </Container>
  )
}

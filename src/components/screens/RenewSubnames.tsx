import { Button, Input } from '@ensdomains/thorin'
import { useState } from 'react'
import { keccak256, namehash } from 'viem'
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { getManagerContract, getWrapperContract } from '../../contracts'
import useDebounce from '../../hooks/useDebounce'
import { Card, CardDescription, Container } from '../atoms'

export function RenewSubnames() {
  const { chain } = useNetwork()
  const [_name, setName] = useState('')
  const name = useDebounce(_name, 500)
  const renewalController = getManagerContract(chain?.id)
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: approvedAddress } = useContractRead({
    ...nameWrapper,
    functionName: 'getApproved',
    args: [BigInt(namehash(name.split('.')[1] + '.eth'))],
  })

  const isApproved = approvedAddress === renewalController.address

  const prepareTx = usePrepareContractWrite({
    ...renewalController,
    functionName: 'extendExpiry',
    args: [
      namehash(name.split('.')[1] + '.eth'),
      keccak256(name.split('.')[0] as `0x${string}`),
      BigInt(10000000000),
    ],
    enabled: !!isApproved && name.includes('.'),
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Renew Subnames">
        <CardDescription>
          Anyone can extend the expiration of subnames that were created on this
          site, making them fully trustless.
        </CardDescription>

        <Input
          label=".eth name"
          placeholder="v1.immutablewebsite"
          suffix=".eth"
          disabled={!!tx.data}
          onChange={(e) => setName(e.target.value)}
        />

        {name === '' ? (
          <Button disabled>Enter a name</Button>
        ) : !isApproved ? (
          <Button disabled>Unable to renew</Button>
        ) : receipt.isSuccess ? (
          <Button disabled>Success!</Button>
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
            Renew
          </Button>
        )}
      </Card>
    </Container>
  )
}

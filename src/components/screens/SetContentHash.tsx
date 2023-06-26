import { Button, Input } from '@ensdomains/thorin'
import { useState } from 'react'
import { namehash } from 'viem/ens'
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { getResolverContract } from '../../contracts'
import useDebounce from '../../hooks/useDebounce'
import { Card, CardDescription, Container, Link } from '../atoms'

type Props = {
  name: string
  subname: string
  nextStep: () => void
}

export function SetContentHash({ name, subname, nextStep }: Props) {
  const { chain } = useNetwork()
  const resolver = getResolverContract(chain?.id)
  const [contentHash, setContentHash] = useState('')
  const debouncedcontentHash = useDebounce(contentHash, 500)

  const prepareTx = usePrepareContractWrite({
    ...resolver,
    functionName: 'setContenthash',
    args: [namehash(`${subname}.${name}.eth`), contentHash as `0x${string}`],
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Set IPFS Website">
        <CardDescription>
          Enter an encoded IPFS hash from{' '}
          <Link href="https://content-hash.surge.sh/" target="_blank">
            this tool
          </Link>
        </CardDescription>

        <Input
          label=""
          hideLabel
          disabled={!!tx.data}
          onChange={(e) => setContentHash(e.target.value)}
          placeholder="0xe30101701220a642fe512f2beb64c428fe62fcbb3cf2dd62068e163a99e1ff7874b450fc1bf6"
        />

        {debouncedcontentHash.length === 0 ? (
          <Button disabled>Save</Button>
        ) : receipt.isSuccess ? (
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

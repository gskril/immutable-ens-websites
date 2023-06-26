import { Button, Input } from '@ensdomains/thorin'
import { namehash } from 'viem/ens'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import {
  getRegistryContract,
  getResolverContract,
  getWrapperContract,
} from '../../contracts'
import { getFuseValue } from '../../utilts'
import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  subname: string
  setSubname: (name: string) => void
  nextStep: () => void
}

export function RegisterSubname({
  name,
  subname,
  setSubname,
  nextStep,
}: Props) {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const registry = getRegistryContract()
  const resolver = getResolverContract(chain?.id)
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: recordExists } = useContractRead({
    ...registry,
    functionName: 'recordExists',
    args: [namehash(`${subname}.${name}.eth`)],
  })

  // CANNOT_UNWRAP | CANNOT_SET_RESOLVER | CAN_EXTEND_EXPIRY | PARENT_CANNOT_CONTROL
  const fusesToBurn = [1, 8, 262144, 65536]
  const fuses = getFuseValue(fusesToBurn)

  const prepareTx = usePrepareContractWrite({
    ...nameWrapper,
    functionName: 'setSubnodeRecord',
    args: [
      namehash(`${name}.eth`),
      subname,
      address || ('' as `0x${string}`),
      resolver.address,
      BigInt(0),
      fuses,
      BigInt(10000000000),
    ],
    enabled: subname.length > 0,
  })

  const tx = useContractWrite(prepareTx.config)
  const receipt = useWaitForTransaction({ hash: tx.data?.hash })

  return (
    <Container>
      <Card title="Register Subname">
        <CardDescription>
          Think of this as a versioned website deployment
        </CardDescription>

        <Input
          label=""
          hideLabel
          placeholder="v1"
          disabled={!!tx.data}
          suffix={`.${name}.eth`}
          onChange={(e) => setSubname(e.target.value)}
        />

        {subname === '' ? (
          <Button disabled>Enter a name</Button>
        ) : recordExists ? (
          <Button disabled>Not available</Button>
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
            Register
          </Button>
        )}
      </Card>
    </Container>
  )
}

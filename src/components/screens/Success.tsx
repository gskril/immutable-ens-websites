import { namehash } from 'viem/ens'
import { useContractRead, useNetwork } from 'wagmi'

import { getWrapperContract } from '../../contracts'
import { Card, CardDescription, Container, Link } from '../atoms'

type Props = {
  name: string
  subname: string
}

export function Success({ name, subname }: Props) {
  const { chain } = useNetwork()
  const nameWrapper = getWrapperContract(chain?.id)

  const { data: nameData } = useContractRead({
    ...nameWrapper,
    functionName: 'getData',
    args: [BigInt(namehash(`${subname}.${name}.eth`))],
  })

  const expiration = nameData ? Number(nameData[2]) : undefined
  const expirationStr = expiration
    ? new Date(expiration * 1000).toLocaleDateString()
    : undefined

  return (
    <Container>
      <Card title="Success!">
        <CardDescription>
          Your decentralized website is now live on IPFS and accessible via ENS
          gateways like{' '}
          <Link href={`https://${subname}.${name}.eth.limo`} target="_blank">
            {subname}.{name}.eth.limo
          </Link>
          .
        </CardDescription>

        <CardDescription>
          To prevent the lock on your IPFS website from expiring on{' '}
          <strong>{expirationStr}</strong>, anybody can renew{' '}
          <strong>{name}.eth</strong> and then{' '}
          <strong>
            {subname}.{name}.eth
          </strong>
          .
        </CardDescription>
      </Card>
    </Container>
  )
}

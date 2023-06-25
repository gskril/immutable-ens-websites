import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  subname: string
  nextStep: () => void
}

export function LockContentHash({ name, subname, nextStep }: Props) {
  return (
    <Container>
      <Card title="Lock IPFS Website">
        <CardDescription>
          This will permanently remove the ability for you to change the IPFS
          hash associated with{' '}
          <strong>
            {subname}.{name}.eth
          </strong>
          .
        </CardDescription>
      </Card>
    </Container>
  )
}

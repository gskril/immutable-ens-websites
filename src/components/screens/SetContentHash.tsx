import { Card, CardDescription, Container } from '../atoms'

type Props = {
  name: string
  subname: string
  nextStep: () => void
}

export function SetContentHash({ name, subname, nextStep }: Props) {
  return (
    <Container>
      <Card title="Set IPFS Website">
        <CardDescription>Enter an IPFS hash</CardDescription>
      </Card>
    </Container>
  )
}

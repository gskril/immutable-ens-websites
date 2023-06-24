import { Button, Heading, Typography, mq } from '@ensdomains/thorin'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import styled, { css } from 'styled-components'

import { Container, Link } from '../atoms'

const Wrapper = styled.div(
  ({ theme }) => css`
    gap: ${theme.space['4']};
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  `
)

const Title = styled(Heading)`
  font-size: 2rem;
  font-weight: 850;

  ${mq.sm.min(css`
    font-size: 2.5rem;
  `)}
`

const Description = styled(Typography)(
  ({ theme }) => css`
    line-height: 1.4;
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.large};
  `
)

const StyledButton = styled(Button)`
  ${mq.xs.min(css`
    width: 18rem;
  `)}
`

export function Hero() {
  const { openConnectModal } = useConnectModal()

  return (
    <Container>
      <Wrapper>
        <Title as="h1">Immutable .eth Websites</Title>

        <Description>
          Lock your IPFS website deployments to versioned ENS subdomains to
          prevent against{' '}
          <Link
            href="https://twitter.com/MicahZoltu/status/1660096315416793090"
            target="_blank"
          >
            future governance attacks
          </Link>
          .
        </Description>

        <StyledButton onClick={() => openConnectModal?.()}>
          Get Started
        </StyledButton>
      </Wrapper>
    </Container>
  )
}

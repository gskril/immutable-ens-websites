import { Button, Heading, Typography, mq } from '@ensdomains/thorin'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { useGlobalState } from '../../hooks/useGlobalState'
import { Container, Link } from '../atoms'
import { RenewSubnames } from './RenewSubnames'

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
  const { nextStep } = useGlobalState()

  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isRenewing, setIsRenewing] = useState(false)

  if (isRenewing) {
    return <RenewSubnames />
  }

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

        {isConnected ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <StyledButton onClick={() => nextStep()}>Get Started</StyledButton>
            <Button
              size="small"
              colorStyle="blueSecondary"
              style={{ height: '1.75rem' }}
              onClick={() => setIsRenewing(true)}
            >
              Renew Subnames
            </Button>
          </div>
        ) : (
          <StyledButton onClick={() => openConnectModal?.()}>
            Connect Wallet
          </StyledButton>
        )}
      </Wrapper>
    </Container>
  )
}

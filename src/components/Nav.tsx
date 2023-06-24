import { Button, Profile, mq } from '@ensdomains/thorin'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import styled, { css } from 'styled-components'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'

import { Columns, Link } from './atoms'
import { EnsLogo, EnsLogoShort } from './icons'

const ShortLogoWrapper = styled.div`
  display: flex;

  ${mq.sm.min(css`
    display: none;
  `)}

  ${mq.xs.max(css`
    width: 2.25rem;
  `)}
`

const FullLogoWrapper = styled.div`
  display: flex;

  ${mq.sm.max(css`
    display: none;
  `)}
`

const WiderButton = styled(Button)(
  ({ theme }) => css`
    max-width: ${theme.space['32']};

    ${mq.xs.min(css`
      max-width: ${theme.space['45']};
    `)}
  `
)

const sharedStyles = css`
  width: fit-content;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
      cursor: pointer;
    }
  }
`

const ProfileMedium = styled(Profile)`
  ${sharedStyles}

  ${mq.sm.min(css`
    max-width: 15rem;
  `)}

  ${mq.xs.max(css`
    display: none;
  `)}
`

const ProfileMobile = styled(Profile)`
  ${sharedStyles}

  ${mq.xs.min(css`
    display: none;
  `)}
`

export function Nav() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address: address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  return (
    <Columns>
      <Link href="/">
        <ShortLogoWrapper>
          <EnsLogoShort />
        </ShortLogoWrapper>

        <FullLogoWrapper>
          <EnsLogo />
        </FullLogoWrapper>
      </Link>

      {address ? (
        <>
          <ProfileMedium
            address={address}
            ensName={ensName || undefined}
            avatar={ensAvatar ? ensAvatar : undefined}
            onClick={openAccountModal}
          />

          <ProfileMobile
            size="small"
            address={address}
            ensName={ensName || undefined}
            avatar={ensAvatar ? ensAvatar : undefined}
            onClick={openAccountModal}
          />
        </>
      ) : (
        <WiderButton shape="rounded" onClick={openConnectModal}>
          Connect
        </WiderButton>
      )}
    </Columns>
  )
}

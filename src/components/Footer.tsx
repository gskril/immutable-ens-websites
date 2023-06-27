import { mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

import { GithubIcon, TwitterIcon } from './icons'

export const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column-reverse;
    gap: ${theme.space['3']};
    width: 100%;

    ${mq.md.min(css`
      flex-direction: row;
    `)}
  `
)

export const Group = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space['5']};

    ${mq.xs.min(css`
      gap: ${theme.space['6']};
    `)}
  `
)

const StyledLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.grey};
    font-weight: ${theme.fontWeights.bold};
    transition: color 0.15s ease-in-out;

    @media (hover: hover) {
      &:hover {
        color: ${theme.colors.text};
      }
    }
  `
)

export function Footer() {
  return (
    <Wrapper>
      <Group>
        <StyledLink
          href="https://ens.mirror.xyz/0M0fgqa6zw8M327TJk9VmGY__eorvLAKwUwrHEhc1MI"
          target="_blank"
        >
          Name Wrapper
        </StyledLink>
        <StyledLink
          href="https://docs.ens.domains/ens-improvement-proposals/ensip-7-contenthash-field"
          target="_blank"
        >
          Content Hash
        </StyledLink>
      </Group>

      <Group>
        <StyledLink href="https://twitter.com/gregskril" target="_blank">
          <TwitterIcon />
        </StyledLink>
        <StyledLink
          href="https://github.com/gskril/immutable-ens-websites"
          target="_blank"
        >
          <GithubIcon />
        </StyledLink>
      </Group>
    </Wrapper>
  )
}

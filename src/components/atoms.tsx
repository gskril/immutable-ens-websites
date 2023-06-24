import { mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

export const Layout = styled.div(
  ({ theme }) => css`
    width: 100%;
    min-height: 100svh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.space['4']};
    gap: ${theme.space['12']};

    ${mq.sm.min(css`
      padding: ${theme.space['8']};
    `)}
  `
)

export const Columns = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space['6']};
  `
)

export const Link = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.bluePrimary};
    text-decoration: underline;

    @media (hover: hover) {
      &:hover {
        text-decoration: none;
      }
    }
  `
)

export const Container = styled.div(
  ({ theme }) => css`
    max-width: ${theme.space['128']};
  `
)

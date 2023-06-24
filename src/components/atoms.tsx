import { Card as ThorinCard, Typography, mq } from '@ensdomains/thorin'
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
    margin-left: auto;
    margin-right: auto;
    max-width: ${theme.space['128']};
  `
)

export const Card = styled(ThorinCard)(
  ({ theme }) => css`
    align-items: center;
    max-width: ${theme.space['112']};
    margin: 0 auto;
  `
)

export const CardDescription = styled(Typography).attrs({
  asProp: 'p',
  color: 'grey',
})`
  line-height: 1.4;
  text-align: center;
`

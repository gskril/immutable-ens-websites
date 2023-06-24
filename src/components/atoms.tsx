import { mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

export const Layout = styled.div(
  ({ theme }) => css`
    width: 100%;
    min-height: 100svh;
    display: flex;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${theme.space['6']};
  `
)

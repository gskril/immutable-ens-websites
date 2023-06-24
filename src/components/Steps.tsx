import styled, { css } from 'styled-components'

const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    gap: ${theme.space['1.5']};
    margin-top: ${theme.space['2']};
  `
)

const Step = styled.div<{ complete: boolean }>(
  ({ complete, theme }) => css`
    --size: ${theme.space['3.5']};

    width: var(--size);
    height: var(--size);
    border-radius: ${theme.radii.full};

    ${complete
      ? css`
          background-color: ${theme.colors.bluePrimary};
          border: ${theme.space['0.5']} solid ${theme.colors.bluePrimary};
        `
      : css`
          border: ${theme.space['0.5']} solid ${theme.colors.bluePrimary};
        `}
  `
)

export function Steps({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
  return (
    <Wrapper>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <Step key={i} complete={i < currentStep} />
      ))}
    </Wrapper>
  )
}

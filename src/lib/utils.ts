export function getFuseValue(fuses: number[]) {
  return fuses.reduce((acc, cur) => acc | cur, 0)
}

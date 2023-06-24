export function getManagerContract(chainId: number | undefined) {
  // Goerli
  if (chainId === 5) {
    return {
      abi,
      address: '0x0Dc92703F54F71f2C78D9c91Bc34ED6E6cF2fe32' as `0x${string}`,
    }
  }

  // Mainnet
  return {
    abi,
    address: '0xf301A64C73aAE2247F52b51647EE985398EC20d9' as `0x${string}`,
  }
}

const abi = [
  {
    inputs: [
      { internalType: 'contract ENS', name: '_ens', type: 'address' },
      {
        internalType: 'contract INameWrapper',
        name: 'wrapperAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'parentNode', type: 'bytes32' },
      { internalType: 'bytes32', name: 'labelhash', type: 'bytes32' },
      { internalType: 'uint64', name: 'expiry', type: 'uint64' },
    ],
    name: 'extendExpiry',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

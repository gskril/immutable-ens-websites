# Immutable Websites on ENS

Indefinitely lock your IPFS website deployments to versioned ENS subdomains

## How it works

I'm using the ENS NameWrapper with a special [resolver](https://discuss.ens.domains/t/creating-immutable-locked-ens-records-with-the-name-wrapper/17378) and [subname renewal manager](https://discuss.ens.domains/t/allowing-forever-extendable-subnames-with-the-name-wrapper/17379) from [serenae.eth](https://twitter.com/serenae_fansubs).

- Step 1: Check if a .eth name is wrapped
- Step 2: Call `approve` on the NameWrapper to the subname renewal manager, allowing anyone to renew all subnames
- Step 3: Burn `CANNOT_UNWRAP | CANNOT_APPROVE` on the 2LD, preventing anyone from changing the subname renewal manager
- Step 4: Create subname while burning fuses `CAN_EXTEND_EXPIRY | PARENT_CANNOT_CONTROL | CANNOT_UNWRAP | CANNOT_SET_RESOLVER` on the subname
- Step 5: Set contenthash on the subname
- Step 6: Lock contenthash on the subname using the custom resolver contract

## How it's built

- Code: Vite + React + RainbowKit + viem + wagmi
- Design: [Thorin](https://thorin.ens.domains/)

## How to run locally

Clone this repo

```bash
git clone https://github.com/gskril/immutable-ens-websites.git
```

Install dependencies

```bash
yarn install
```

Run the app

```bash
yarn dev
```

## Notes

I wanted to make this a fully standalone app but ran into some time limitations at the hackathon, so I'm leaning on a few external services for now. I plan to remove these dependencies in the future.

Specifically, I want to allow the user to:

- Input their own RPC endpoint
- Wrap .eth names directly from the app
- Upload their website build directly to IPFS
- Enter an IPFS hash instead of having to encode it first

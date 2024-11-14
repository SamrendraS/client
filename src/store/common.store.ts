import { Provider } from "starknet";
import { atom, Atom } from 'jotai';


export const providerAtom = atom<Provider | null>(null);

export const currentBlockAtom = atom(async (get) => {
    const provider = get(providerAtom);

    // plus 1 to represent pending block
    return provider ? (await provider.getBlockNumber()) + 1 : 0;
})

export const userAddressAtom = atom<string | undefined>();


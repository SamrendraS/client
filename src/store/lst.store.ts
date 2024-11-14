import { atom } from "jotai";
import { currentBlockAtom, providerAtom, userAddressAtom } from "./common.store";
import erc4626Abi from "@/abi/erc4626.abi.json";
import { AtomWithQueryResult, atomWithQuery } from 'jotai-tanstack-query';
import MyNumber from "@/lib/MyNumber";
import { Contract, RpcProvider, uint256 } from "starknet";
import { LST_ADDRRESS, STRK_DECIMALS } from "../../constants";

function getLSTContract(provider: RpcProvider) {
    return new Contract(erc4626Abi, LST_ADDRRESS, provider);
}

const userXSTRKBalanceQueryAtom = atomWithQuery((get) => {
    return {
        // current block atom only to trigger a change when the block changes
        queryKey: ['userXSTRKBalance', get(currentBlockAtom), get(userAddressAtom)],
        queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
            const [, , userAddress] = queryKey;
            const provider = get(providerAtom);
            console.log('userXSTRKBalanceAtom', provider, userAddress);
            if (!provider || !userAddress) {
                return MyNumber.fromZero();
            }
            try {
                const lstContract = getLSTContract(provider);
                const balance = await lstContract.call('balance_of', [userAddress]);
                console.log('userXSTRKBalanceAtom [2]', balance.toString());
                return new MyNumber(balance.toString(), STRK_DECIMALS);
            } catch (error) {
                console.error('userXSTRKBalanceAtom [3]', error);
                return MyNumber.fromZero();
            }
        }
    }
})

export const userXSTRKBalanceAtom = atom((get) => {
    const { data, error } = get(userXSTRKBalanceQueryAtom);
    return {
        balance: (error || !data) ? MyNumber.fromZero() : data,
        error,
        isLoading: !data && !error
    }
})

export const userSTRKBalanceQueryAtom = atomWithQuery((get) => {
    return {
        queryKey: ['userSTRKBalance', get(currentBlockAtom), get(userAddressAtom), get(userXSTRKBalanceAtom)],
        queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
            const { data, error } = get(userXSTRKBalanceQueryAtom);
            const provider = get(providerAtom);
            const userAddress = get(userAddressAtom);
            const xSTRKBalance = get(userXSTRKBalanceAtom);
            if (!provider || !userAddress || xSTRKBalance.balance.isZero()) {
                return MyNumber.fromZero();
            }

            try {
                const lstContract = getLSTContract(provider);
                const balance = await lstContract.call('convert_to_assets', [
                    uint256.bnToUint256(xSTRKBalance.balance.toString())
                ]);
                return new MyNumber(balance.toString(), STRK_DECIMALS);
            } catch (error) {
                console.error('userSTRKBalanceQueryAtom [3]', error);
                return MyNumber.fromZero();
            }
        }
    }
});

export const userSTRKBalanceAtom = atom((get) => {
    const { data, error } = get(userSTRKBalanceQueryAtom);
    return {
        balance: (error || !data) ? MyNumber.fromZero() : data,
        error,
        isLoading: !data && !error
    }
})

export const totalStakedQueryAtom = atomWithQuery((get) => {
    return {
        queryKey: ['totalStaked', get(currentBlockAtom)],
        queryFn: async ({ queryKey }: any): Promise<MyNumber> => {
            const provider = get(providerAtom);
            if (!provider) {
                return MyNumber.fromZero();
            }

            try {
                const lstContract = getLSTContract(provider);
                const balance = await lstContract.call('total_assets');
                return new MyNumber(balance.toString(), STRK_DECIMALS);
            } catch (error) {
                console.error('totalStakedAtom [3]', error);
                return MyNumber.fromZero();
            }
        }
    }
})

export const totalStakedAtom = atom((get) => {
    const { data, error } = get(totalStakedQueryAtom);
    return {
        balance: (error || !data) ? MyNumber.fromZero() : data,
        error,
        isLoading: !data && !error
    }
});
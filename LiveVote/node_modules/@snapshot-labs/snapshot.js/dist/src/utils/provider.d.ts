export type ProviderOptions = {
    broviderUrl?: string;
};
export default function getProvider(network: any, { broviderUrl }?: ProviderOptions): any;
export declare function getBatchedProvider(network: any, { broviderUrl }?: ProviderOptions): any;

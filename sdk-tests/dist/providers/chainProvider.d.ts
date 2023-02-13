import { BaseProvider } from './provider';
import { IdenaProvider, JsonReceipt } from 'idena-sdk-js';
import { IdentityState } from '../types';
export declare class ChainProvider extends BaseProvider {
    static create(url: string, apiKey: string): ChainProvider;
    constructor(idenaProvider: IdenaProvider);
    generateBlocks(count: number): Promise<void>;
    receipt(hash: string): Promise<JsonReceipt>;
    godAddress(): Promise<string>;
    resetTo(block: number): Promise<void>;
    balance(address: string): Promise<void>;
    addBalance(address: string, amount: string): Promise<void>;
    setContractData(address: string, key: string, value: string, format: string): Promise<void>;
    setIdentity(address: string, identityState: IdentityState): Promise<void>;
}

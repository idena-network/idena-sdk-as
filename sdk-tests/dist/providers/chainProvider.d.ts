import { BaseProvider } from './provider';
import { IdenaProvider, JsonReceipt } from 'idena-sdk-js';
export declare class ChainProvider extends BaseProvider {
    static create(url: string, apiKey: string): ChainProvider;
    constructor(idenaProvider: IdenaProvider);
    generateBlocks(count: number): Promise<void>;
    receipt(hash: string): Promise<JsonReceipt>;
    godAddress(hash: string): Promise<string>;
    resetTo(block: number): Promise<void>;
}

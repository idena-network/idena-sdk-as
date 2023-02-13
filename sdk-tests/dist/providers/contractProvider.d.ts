/// <reference types="node" />
import { BaseProvider } from './provider';
import { ContractArgument, IdenaProvider, JsonReceipt } from 'idena-sdk-js';
export declare class ContractProvider extends BaseProvider {
    static create(url: string, apiKey: string): ContractProvider;
    constructor(idenaProvider: IdenaProvider);
    deploy(amount: string, maxFee: string, code: Buffer, nonce: Buffer, args?: ContractArgument[]): Promise<string>;
    estimateDeploy(amount: string, maxFee: string, code: Buffer, nonce: Buffer, args?: ContractArgument[]): Promise<JsonReceipt>;
    call(contract: any, method: any, amount: any, maxFee: string, args?: ContractArgument[]): Promise<string>;
    estimateCall(contract: any, method: any, amount: any, maxFee: string, args?: ContractArgument[]): Promise<JsonReceipt>;
    readData(contract: any, key: any, format: string): Promise<string>;
    readMap(contract: any, map: any, key: any, format: string): Promise<string>;
    events(contract: string): Promise<string>;
}

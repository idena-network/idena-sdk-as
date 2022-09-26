import { BaseProvider } from "./provider";
import { IdenaProvider } from "idena-sdk-js";
import { ChainProvider } from "./chainProvider";
import { ContractProvider } from "./contractProvider";
export declare class ContractRunnerProvider extends BaseProvider {
    private _chainProvider;
    private _contractProvider;
    get Chain(): ChainProvider;
    get Contract(): ContractProvider;
    static create(url: string, apiKey: string): ContractRunnerProvider;
    constructor(idenaProvider: IdenaProvider);
}

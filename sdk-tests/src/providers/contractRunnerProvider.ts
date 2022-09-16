import {BaseProvider} from "./provider";
import {IdenaProvider} from "idena-sdk-js";
import {ChainProvider} from "./chainProvider";
import {ContractProvider} from "./contractProvider";

export class ContractRunnerProvider extends BaseProvider {
  private _chainProvider: ChainProvider;
  private _contractProvider: ContractProvider;

  public get Chain(): ChainProvider {
    return this._chainProvider;
  }

  public get Contract(): ContractProvider {
    return this._contractProvider;
  }

  static create(url: string, apiKey: string) {
    return new ContractRunnerProvider(IdenaProvider.create(url, apiKey));
  }
    
  constructor(idenaProvider: IdenaProvider) {
    super(idenaProvider);
    this._chainProvider = new ChainProvider(idenaProvider);
    this._contractProvider = new ContractProvider(idenaProvider);
  }

}
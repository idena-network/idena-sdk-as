import {BaseProvider} from "./provider";
import {IdenaProvider, JsonReceipt} from "idena-sdk-js";

export class ChainProvider extends BaseProvider {
  static create(url: string, apiKey: string) {
    return new ChainProvider(IdenaProvider.create(url, apiKey));
  }

  constructor(idenaProvider: IdenaProvider) {
    super(idenaProvider);
  }

  public async generateBlocks(count: number): Promise<void> {
    return await this.doRequest({
      method: 'chain_generateBlocks',
      params: [count],
    });
  }

  public async receipt(hash: string): Promise<JsonReceipt> {
    return await this.doRequest({
      method: 'chain_txReceipt',
      params: [hash],
    });
  }
}
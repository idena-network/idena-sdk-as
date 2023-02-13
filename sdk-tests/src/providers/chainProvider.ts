import {BaseProvider} from './provider';
import {IdenaProvider, JsonReceipt} from 'idena-sdk-js';
import { IdentityState } from '../types';

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

  public async godAddress(): Promise<string> {
    return await this.doRequest({
      method: 'chain_god',
      params: null,
    });
  }

  public async resetTo(block: number): Promise<void> {
    return await this.doRequest({
      method: 'chain_resetTo',
      params: [block],
    });
  }

  public async balance(address: string): Promise<void> {
    return await this.doRequest({
      method: 'chain_getBalance',
      params: [address],
    });
  }

  public async addBalance(address: string, amount: string): Promise<void> {
    return await this.doRequest({
      method: 'chain_addBalance',
      params: [address, amount],
    });
  }

  public async setContractData(address: string, key: string, value : string, format : string): Promise<void> {
    return await this.doRequest({
      method: 'chain_setContractData',
      params: [address, key, value, format],
    });
  }

  public async setIdentity(address: string, identityState : IdentityState): Promise<void> {
    return await this.doRequest({
      method: 'chain_setIdentity',
      params: [address, identityState],
    });
  }
}

import {BaseProvider} from './provider';
import {
  ContractArgument,
  IdenaProvider,
  JsonReceipt,
  toHexString,
} from 'idena-sdk-js';

export class ContractProvider extends BaseProvider {
  static create(url: string, apiKey: string) {
    return new ContractProvider(IdenaProvider.create(url, apiKey));
  }

  constructor(idenaProvider: IdenaProvider) {
    super(idenaProvider);
  }

  public async deploy(
    amount: string,
    maxFee: string,
    code: Buffer,
    nonce: Buffer,
    args: ContractArgument[] = null
  ): Promise<string> {
    return await this.doRequest({
      method: 'contract_deploy',
      params: [
        {
          code: toHexString(code),
          nonce: toHexString(nonce),
          amount: amount,
          args: args,
          maxFee: maxFee,
        },
      ],
    });
  }

  public async estimateDeploy(
    amount: string,
    maxFee: string,
    code: Buffer,
    args: ContractArgument[] = null
  ): Promise<JsonReceipt> {
    return await this.doRequest({
      method: 'contract_estimateDeploy',
      params: [
        {
          code: toHexString(code),
          amount: amount,
          args: args,
          maxFee: maxFee,
        },
      ],
    });
  }

  public async call(
    contract,
    method,
    amount,
    maxFee: string,
    args: ContractArgument[] = null
  ): Promise<string> {
    return await this.doRequest({
      method: 'contract_call',
      params: [
        {
          contract: contract,
          method: method,
          amount: amount,
          maxFee: maxFee,
          args: args,
        },
      ],
    });
  }

  public async estimateCall(
    contract,
    method,
    amount,
    maxFee: string,
    args: ContractArgument[] = null
  ): Promise<JsonReceipt> {
    return await this.doRequest({
      method: 'contract_estimateCall',
      params: [
        {
          contract: contract,
          method: method,
          amount: amount,
          maxFee: maxFee,
          args: args,
        },
      ],
    });
  }

  public async readData(contract, key, format: string): Promise<string> {
    return await this.doRequest({
      method: 'contract_readData',
      params: [contract, key, format],
    });
  }

  public async readMap(contract, map, key, format: string): Promise<string> {
    return await this.doRequest({
      method: 'contract_readMap',
      params: [contract, map, key, format],
    });
  }

  public async events(contract: string): Promise<string> {
    return await this.doRequest({
      method: 'contract_events',
      params: [{contract: contract}],
    });
  }
}

import {IdenaProvider} from "idena-sdk-js";

export class BaseProvider {
  protected _idenaProvider: IdenaProvider;

  constructor(idenaProvider: IdenaProvider) {
    this._idenaProvider = idenaProvider;
  }

  public async doRequest(obj: { method: string; params: any; id?: number }) {
    return this._idenaProvider.doRequest(obj);
  }
}

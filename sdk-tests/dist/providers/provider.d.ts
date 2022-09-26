import { IdenaProvider } from "idena-sdk-js";
export declare class BaseProvider {
    protected _idenaProvider: IdenaProvider;
    constructor(idenaProvider: IdenaProvider);
    doRequest(obj: {
        method: string;
        params: any;
        id?: number;
    }): Promise<any>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainProvider = void 0;
const provider_1 = require("./provider");
const idena_sdk_js_1 = require("idena-sdk-js");
class ChainProvider extends provider_1.BaseProvider {
    static create(url, apiKey) {
        return new ChainProvider(idena_sdk_js_1.IdenaProvider.create(url, apiKey));
    }
    constructor(idenaProvider) {
        super(idenaProvider);
    }
    async generateBlocks(count) {
        return await this.doRequest({
            method: 'chain_generateBlocks',
            params: [count],
        });
    }
    async receipt(hash) {
        return await this.doRequest({
            method: 'chain_txReceipt',
            params: [hash],
        });
    }
    async godAddress(hash) {
        return await this.doRequest({
            method: 'chain_god',
            params: null
        });
    }
}
exports.ChainProvider = ChainProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5Qcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvY2hhaW5Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFDeEMsK0NBQXdEO0FBRXhELE1BQWEsYUFBYyxTQUFRLHVCQUFZO0lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDdkMsT0FBTyxJQUFJLGFBQWEsQ0FBQyw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsWUFBWSxhQUE0QjtRQUN0QyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUN2QyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTdCRCxzQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XHJcbmltcG9ydCB7SWRlbmFQcm92aWRlciwgSnNvblJlY2VpcHR9IGZyb20gJ2lkZW5hLXNkay1qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhaW5Qcm92aWRlciBleHRlbmRzIEJhc2VQcm92aWRlciB7XHJcbiAgc3RhdGljIGNyZWF0ZSh1cmw6IHN0cmluZywgYXBpS2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgQ2hhaW5Qcm92aWRlcihJZGVuYVByb3ZpZGVyLmNyZWF0ZSh1cmwsIGFwaUtleSkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaWRlbmFQcm92aWRlcjogSWRlbmFQcm92aWRlcikge1xyXG4gICAgc3VwZXIoaWRlbmFQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZ2VuZXJhdGVCbG9ja3MoY291bnQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fZ2VuZXJhdGVCbG9ja3MnLFxyXG4gICAgICBwYXJhbXM6IFtjb3VudF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWNlaXB0KGhhc2g6IHN0cmluZyk6IFByb21pc2U8SnNvblJlY2VpcHQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NoYWluX3R4UmVjZWlwdCcsXHJcbiAgICAgIHBhcmFtczogW2hhc2hdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZ29kQWRkcmVzcyhoYXNoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fZ29kJyxcclxuICAgICAgcGFyYW1zOiBudWxsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
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
    async godAddress() {
        return await this.doRequest({
            method: 'chain_god',
            params: null,
        });
    }
    async resetTo(block) {
        return await this.doRequest({
            method: 'chain_resetTo',
            params: [block],
        });
    }
    async balance(address) {
        return await this.doRequest({
            method: 'chain_getBalance',
            params: [address],
        });
    }
    async addBalance(address, amount) {
        return await this.doRequest({
            method: 'chain_addBalance',
            params: [address, amount],
        });
    }
    async setContractData(address, key, value, format) {
        return await this.doRequest({
            method: 'chain_setContractData',
            params: [address, key, value, format],
        });
    }
    async setIdentity(address, identityState) {
        return await this.doRequest({
            method: 'chain_setIdentity',
            params: [address, identityState],
        });
    }
}
exports.ChainProvider = ChainProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5Qcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvY2hhaW5Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFDeEMsK0NBQXdEO0FBR3hELE1BQWEsYUFBYyxTQUFRLHVCQUFZO0lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDdkMsT0FBTyxJQUFJLGFBQWEsQ0FBQyw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsWUFBWSxhQUE0QjtRQUN0QyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUN2QyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZO1FBQy9CLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ3JCLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBYTtRQUNoQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsZUFBZTtZQUN2QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZTtRQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlLEVBQUUsTUFBYztRQUNyRCxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBZSxFQUFFLEdBQVcsRUFBRSxLQUFjLEVBQUUsTUFBZTtRQUN4RixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsYUFBNkI7UUFDckUsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWhFRCxzQ0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XHJcbmltcG9ydCB7SWRlbmFQcm92aWRlciwgSnNvblJlY2VpcHR9IGZyb20gJ2lkZW5hLXNkay1qcyc7XHJcbmltcG9ydCB7IElkZW50aXR5U3RhdGUgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhaW5Qcm92aWRlciBleHRlbmRzIEJhc2VQcm92aWRlciB7XHJcbiAgc3RhdGljIGNyZWF0ZSh1cmw6IHN0cmluZywgYXBpS2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgQ2hhaW5Qcm92aWRlcihJZGVuYVByb3ZpZGVyLmNyZWF0ZSh1cmwsIGFwaUtleSkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaWRlbmFQcm92aWRlcjogSWRlbmFQcm92aWRlcikge1xyXG4gICAgc3VwZXIoaWRlbmFQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZ2VuZXJhdGVCbG9ja3MoY291bnQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fZ2VuZXJhdGVCbG9ja3MnLFxyXG4gICAgICBwYXJhbXM6IFtjb3VudF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWNlaXB0KGhhc2g6IHN0cmluZyk6IFByb21pc2U8SnNvblJlY2VpcHQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NoYWluX3R4UmVjZWlwdCcsXHJcbiAgICAgIHBhcmFtczogW2hhc2hdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZ29kQWRkcmVzcygpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fZ29kJyxcclxuICAgICAgcGFyYW1zOiBudWxsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzZXRUbyhibG9jazogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjaGFpbl9yZXNldFRvJyxcclxuICAgICAgcGFyYW1zOiBbYmxvY2tdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYmFsYW5jZShhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NoYWluX2dldEJhbGFuY2UnLFxyXG4gICAgICBwYXJhbXM6IFthZGRyZXNzXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZEJhbGFuY2UoYWRkcmVzczogc3RyaW5nLCBhbW91bnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fYWRkQmFsYW5jZScsXHJcbiAgICAgIHBhcmFtczogW2FkZHJlc3MsIGFtb3VudF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBzZXRDb250cmFjdERhdGEoYWRkcmVzczogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWUgOiBzdHJpbmcsIGZvcm1hdCA6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY2hhaW5fc2V0Q29udHJhY3REYXRhJyxcclxuICAgICAgcGFyYW1zOiBbYWRkcmVzcywga2V5LCB2YWx1ZSwgZm9ybWF0XSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHNldElkZW50aXR5KGFkZHJlc3M6IHN0cmluZywgaWRlbnRpdHlTdGF0ZSA6IElkZW50aXR5U3RhdGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NoYWluX3NldElkZW50aXR5JyxcclxuICAgICAgcGFyYW1zOiBbYWRkcmVzcywgaWRlbnRpdHlTdGF0ZV0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
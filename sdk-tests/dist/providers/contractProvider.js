"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractProvider = void 0;
const provider_1 = require("./provider");
const idena_sdk_js_1 = require("idena-sdk-js");
class ContractProvider extends provider_1.BaseProvider {
    static create(url, apiKey) {
        return new ContractProvider(idena_sdk_js_1.IdenaProvider.create(url, apiKey));
    }
    constructor(idenaProvider) {
        super(idenaProvider);
    }
    async deploy(amount, maxFee, code, nonce, args = null) {
        return await this.doRequest({
            method: 'contract_deploy',
            params: [
                {
                    code: (0, idena_sdk_js_1.toHexString)(code),
                    nonce: (0, idena_sdk_js_1.toHexString)(nonce),
                    amount: amount,
                    args: args,
                    maxFee: maxFee,
                },
            ],
        });
    }
    async estimateDeploy(amount, maxFee, code, nonce, args = null) {
        return await this.doRequest({
            method: 'contract_estimateDeploy',
            params: [
                {
                    code: (0, idena_sdk_js_1.toHexString)(code),
                    nonce: (0, idena_sdk_js_1.toHexString)(nonce),
                    amount: amount,
                    args: args,
                    maxFee: maxFee,
                },
            ],
        });
    }
    async call(contract, method, amount, maxFee, args = null) {
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
    async estimateCall(contract, method, amount, maxFee, args = null) {
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
    async readData(contract, key, format) {
        return await this.doRequest({
            method: 'contract_readData',
            params: [contract, key, format],
        });
    }
    async readMap(contract, map, key, format) {
        return await this.doRequest({
            method: 'contract_readMap',
            params: [contract, map, key, format],
        });
    }
    async events(contract) {
        return await this.doRequest({
            method: 'contract_events',
            params: [{ contract: contract }],
        });
    }
}
exports.ContractProvider = ContractProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvY29udHJhY3RQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFDeEMsK0NBS3NCO0FBRXRCLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQVk7SUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUN2QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsNEJBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFlBQVksYUFBNEI7UUFDdEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUNqQixNQUFjLEVBQ2QsTUFBYyxFQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsT0FBMkIsSUFBSTtRQUUvQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE1BQU0sRUFBRTtnQkFDTjtvQkFDRSxJQUFJLEVBQUUsSUFBQSwwQkFBVyxFQUFDLElBQUksQ0FBQztvQkFDdkIsS0FBSyxFQUFFLElBQUEsMEJBQVcsRUFBQyxLQUFLLENBQUM7b0JBQ3pCLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FDekIsTUFBYyxFQUNkLE1BQWMsRUFDZCxJQUFZLEVBQ1osS0FBYSxFQUNiLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLHlCQUF5QjtZQUNqQyxNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsSUFBSSxFQUFFLElBQUEsMEJBQVcsRUFBQyxJQUFJLENBQUM7b0JBQ3ZCLEtBQUssRUFBRSxJQUFBLDBCQUFXLEVBQUMsS0FBSyxDQUFDO29CQUN6QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsTUFBTTtpQkFDZjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQ2YsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBYyxFQUNkLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsTUFBTSxFQUFFO2dCQUNOO29CQUNFLFFBQVEsRUFBRSxRQUFRO29CQUNsQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtpQkFDWDthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQ3ZCLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxFQUNOLE1BQWMsRUFDZCxPQUEyQixJQUFJO1FBRS9CLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsTUFBTSxFQUFFO2dCQUNOO29CQUNFLFFBQVEsRUFBRSxRQUFRO29CQUNsQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtpQkFDWDthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFjO1FBQ2pELE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBYztRQUNyRCxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQztTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQjtRQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWpIRCw0Q0FpSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJhY3RBcmd1bWVudCxcclxuICBJZGVuYVByb3ZpZGVyLFxyXG4gIEpzb25SZWNlaXB0LFxyXG4gIHRvSGV4U3RyaW5nLFxyXG59IGZyb20gJ2lkZW5hLXNkay1qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJhY3RQcm92aWRlciBleHRlbmRzIEJhc2VQcm92aWRlciB7XHJcbiAgc3RhdGljIGNyZWF0ZSh1cmw6IHN0cmluZywgYXBpS2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgQ29udHJhY3RQcm92aWRlcihJZGVuYVByb3ZpZGVyLmNyZWF0ZSh1cmwsIGFwaUtleSkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaWRlbmFQcm92aWRlcjogSWRlbmFQcm92aWRlcikge1xyXG4gICAgc3VwZXIoaWRlbmFQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZGVwbG95KFxyXG4gICAgYW1vdW50OiBzdHJpbmcsXHJcbiAgICBtYXhGZWU6IHN0cmluZyxcclxuICAgIGNvZGU6IEJ1ZmZlcixcclxuICAgIG5vbmNlOiBCdWZmZXIsXHJcbiAgICBhcmdzOiBDb250cmFjdEFyZ3VtZW50W10gPSBudWxsXHJcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2RlcGxveScsXHJcbiAgICAgIHBhcmFtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNvZGU6IHRvSGV4U3RyaW5nKGNvZGUpLFxyXG4gICAgICAgICAgbm9uY2U6IHRvSGV4U3RyaW5nKG5vbmNlKSxcclxuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgYXJnczogYXJncyxcclxuICAgICAgICAgIG1heEZlZTogbWF4RmVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBlc3RpbWF0ZURlcGxveShcclxuICAgIGFtb3VudDogc3RyaW5nLFxyXG4gICAgbWF4RmVlOiBzdHJpbmcsXHJcbiAgICBjb2RlOiBCdWZmZXIsXHJcbiAgICBub25jZTogQnVmZmVyLFxyXG4gICAgYXJnczogQ29udHJhY3RBcmd1bWVudFtdID0gbnVsbFxyXG4gICk6IFByb21pc2U8SnNvblJlY2VpcHQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2VzdGltYXRlRGVwbG95JyxcclxuICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29kZTogdG9IZXhTdHJpbmcoY29kZSksXHJcbiAgICAgICAgICBub25jZTogdG9IZXhTdHJpbmcobm9uY2UpLFxyXG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXHJcbiAgICAgICAgICBhcmdzOiBhcmdzLFxyXG4gICAgICAgICAgbWF4RmVlOiBtYXhGZWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGNhbGwoXHJcbiAgICBjb250cmFjdCxcclxuICAgIG1ldGhvZCxcclxuICAgIGFtb3VudCxcclxuICAgIG1heEZlZTogc3RyaW5nLFxyXG4gICAgYXJnczogQ29udHJhY3RBcmd1bWVudFtdID0gbnVsbFxyXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjb250cmFjdF9jYWxsJyxcclxuICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29udHJhY3Q6IGNvbnRyYWN0LFxyXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgIG1heEZlZTogbWF4RmVlLFxyXG4gICAgICAgICAgYXJnczogYXJncyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZXN0aW1hdGVDYWxsKFxyXG4gICAgY29udHJhY3QsXHJcbiAgICBtZXRob2QsXHJcbiAgICBhbW91bnQsXHJcbiAgICBtYXhGZWU6IHN0cmluZyxcclxuICAgIGFyZ3M6IENvbnRyYWN0QXJndW1lbnRbXSA9IG51bGxcclxuICApOiBQcm9taXNlPEpzb25SZWNlaXB0PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjb250cmFjdF9lc3RpbWF0ZUNhbGwnLFxyXG4gICAgICBwYXJhbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb250cmFjdDogY29udHJhY3QsXHJcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgbWF4RmVlOiBtYXhGZWUsXHJcbiAgICAgICAgICBhcmdzOiBhcmdzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWFkRGF0YShjb250cmFjdCwga2V5LCBmb3JtYXQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjb250cmFjdF9yZWFkRGF0YScsXHJcbiAgICAgIHBhcmFtczogW2NvbnRyYWN0LCBrZXksIGZvcm1hdF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWFkTWFwKGNvbnRyYWN0LCBtYXAsIGtleSwgZm9ybWF0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfcmVhZE1hcCcsXHJcbiAgICAgIHBhcmFtczogW2NvbnRyYWN0LCBtYXAsIGtleSwgZm9ybWF0XSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGV2ZW50cyhjb250cmFjdDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2V2ZW50cycsXHJcbiAgICAgIHBhcmFtczogW3tjb250cmFjdDogY29udHJhY3R9XSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
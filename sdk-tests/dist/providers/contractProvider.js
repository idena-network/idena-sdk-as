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
    async deploy(amount, maxFee, code, args = null) {
        return await this.doRequest({
            method: 'contract_deploy',
            params: [
                {
                    code: (0, idena_sdk_js_1.toHexString)(code),
                    amount: amount,
                    args: args,
                    maxFee: maxFee,
                },
            ],
        });
    }
    async estimateDeploy(amount, maxFee, code, args = null) {
        return await this.doRequest({
            method: 'contract_estimateDeploy',
            params: [
                {
                    code: (0, idena_sdk_js_1.toHexString)(code),
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
}
exports.ContractProvider = ContractProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvY29udHJhY3RQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFDeEMsK0NBS3NCO0FBRXRCLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQVk7SUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUN2QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsNEJBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFlBQVksYUFBNEI7UUFDdEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUNqQixNQUFjLEVBQ2QsTUFBYyxFQUNkLElBQVksRUFDWixPQUEyQixJQUFJO1FBRS9CLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsTUFBTSxFQUFFO2dCQUNOO29CQUNFLElBQUksRUFBRSxJQUFBLDBCQUFXLEVBQUMsSUFBSSxDQUFDO29CQUN2QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsTUFBTTtpQkFDZjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQ3pCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsSUFBWSxFQUNaLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLHlCQUF5QjtZQUNqQyxNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsSUFBSSxFQUFFLElBQUEsMEJBQVcsRUFBQyxJQUFJLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FDZixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFjLEVBQ2QsT0FBMkIsSUFBSTtRQUUvQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsZUFBZTtZQUN2QixNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO2lCQUNYO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FDdkIsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBYyxFQUNkLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO2lCQUNYO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQWM7UUFDakQsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQztTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFjO1FBQ3JELE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXRHRCw0Q0FzR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJhY3RBcmd1bWVudCxcclxuICBJZGVuYVByb3ZpZGVyLFxyXG4gIEpzb25SZWNlaXB0LFxyXG4gIHRvSGV4U3RyaW5nLFxyXG59IGZyb20gJ2lkZW5hLXNkay1qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJhY3RQcm92aWRlciBleHRlbmRzIEJhc2VQcm92aWRlciB7XHJcbiAgc3RhdGljIGNyZWF0ZSh1cmw6IHN0cmluZywgYXBpS2V5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgQ29udHJhY3RQcm92aWRlcihJZGVuYVByb3ZpZGVyLmNyZWF0ZSh1cmwsIGFwaUtleSkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaWRlbmFQcm92aWRlcjogSWRlbmFQcm92aWRlcikge1xyXG4gICAgc3VwZXIoaWRlbmFQcm92aWRlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZGVwbG95KFxyXG4gICAgYW1vdW50OiBzdHJpbmcsXHJcbiAgICBtYXhGZWU6IHN0cmluZyxcclxuICAgIGNvZGU6IEJ1ZmZlcixcclxuICAgIGFyZ3M6IENvbnRyYWN0QXJndW1lbnRbXSA9IG51bGxcclxuICApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfZGVwbG95JyxcclxuICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29kZTogdG9IZXhTdHJpbmcoY29kZSksXHJcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgIGFyZ3M6IGFyZ3MsXHJcbiAgICAgICAgICBtYXhGZWU6IG1heEZlZSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZXN0aW1hdGVEZXBsb3koXHJcbiAgICBhbW91bnQ6IHN0cmluZyxcclxuICAgIG1heEZlZTogc3RyaW5nLFxyXG4gICAgY29kZTogQnVmZmVyLFxyXG4gICAgYXJnczogQ29udHJhY3RBcmd1bWVudFtdID0gbnVsbFxyXG4gICk6IFByb21pc2U8SnNvblJlY2VpcHQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2VzdGltYXRlRGVwbG95JyxcclxuICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29kZTogdG9IZXhTdHJpbmcoY29kZSksXHJcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgIGFyZ3M6IGFyZ3MsXHJcbiAgICAgICAgICBtYXhGZWU6IG1heEZlZSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgY2FsbChcclxuICAgIGNvbnRyYWN0LFxyXG4gICAgbWV0aG9kLFxyXG4gICAgYW1vdW50LFxyXG4gICAgbWF4RmVlOiBzdHJpbmcsXHJcbiAgICBhcmdzOiBDb250cmFjdEFyZ3VtZW50W10gPSBudWxsXHJcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2NhbGwnLFxyXG4gICAgICBwYXJhbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb250cmFjdDogY29udHJhY3QsXHJcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgbWF4RmVlOiBtYXhGZWUsXHJcbiAgICAgICAgICBhcmdzOiBhcmdzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBlc3RpbWF0ZUNhbGwoXHJcbiAgICBjb250cmFjdCxcclxuICAgIG1ldGhvZCxcclxuICAgIGFtb3VudCxcclxuICAgIG1heEZlZTogc3RyaW5nLFxyXG4gICAgYXJnczogQ29udHJhY3RBcmd1bWVudFtdID0gbnVsbFxyXG4gICk6IFByb21pc2U8SnNvblJlY2VpcHQ+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2VzdGltYXRlQ2FsbCcsXHJcbiAgICAgIHBhcmFtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNvbnRyYWN0OiBjb250cmFjdCxcclxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXHJcbiAgICAgICAgICBtYXhGZWU6IG1heEZlZSxcclxuICAgICAgICAgIGFyZ3M6IGFyZ3MsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlYWREYXRhKGNvbnRyYWN0LCBrZXksIGZvcm1hdDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X3JlYWREYXRhJyxcclxuICAgICAgcGFyYW1zOiBbY29udHJhY3QsIGtleSwgZm9ybWF0XSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlYWRNYXAoY29udHJhY3QsIG1hcCwga2V5LCBmb3JtYXQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjb250cmFjdF9yZWFkTWFwJyxcclxuICAgICAgcGFyYW1zOiBbY29udHJhY3QsIG1hcCwga2V5LCBmb3JtYXRdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
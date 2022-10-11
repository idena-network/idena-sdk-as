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
    async events(contract) {
        return await this.doRequest({
            method: 'contract_events',
            params: [{ contract: contract }],
        });
    }
}
exports.ContractProvider = ContractProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvY29udHJhY3RQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBd0M7QUFDeEMsK0NBS3NCO0FBRXRCLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQVk7SUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUN2QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsNEJBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFlBQVksYUFBNEI7UUFDdEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUNqQixNQUFjLEVBQ2QsTUFBYyxFQUNkLElBQVksRUFDWixPQUEyQixJQUFJO1FBRS9CLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsTUFBTSxFQUFFO2dCQUNOO29CQUNFLElBQUksRUFBRSxJQUFBLDBCQUFXLEVBQUMsSUFBSSxDQUFDO29CQUN2QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsTUFBTTtpQkFDZjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQ3pCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsSUFBWSxFQUNaLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLHlCQUF5QjtZQUNqQyxNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsSUFBSSxFQUFFLElBQUEsMEJBQVcsRUFBQyxJQUFJLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxNQUFNO2lCQUNmO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FDZixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFjLEVBQ2QsT0FBMkIsSUFBSTtRQUUvQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixNQUFNLEVBQUUsZUFBZTtZQUN2QixNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO2lCQUNYO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FDdkIsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBYyxFQUNkLE9BQTJCLElBQUk7UUFFL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixNQUFNLEVBQUU7Z0JBQ047b0JBQ0UsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJO2lCQUNYO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQWM7UUFDakQsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQztTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFjO1FBQ3JELE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQWlCO1FBQ25DLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsTUFBTSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBN0dELDRDQTZHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZVByb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcclxuaW1wb3J0IHtcclxuICBDb250cmFjdEFyZ3VtZW50LFxyXG4gIElkZW5hUHJvdmlkZXIsXHJcbiAgSnNvblJlY2VpcHQsXHJcbiAgdG9IZXhTdHJpbmcsXHJcbn0gZnJvbSAnaWRlbmEtc2RrLWpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cmFjdFByb3ZpZGVyIGV4dGVuZHMgQmFzZVByb3ZpZGVyIHtcclxuICBzdGF0aWMgY3JlYXRlKHVybDogc3RyaW5nLCBhcGlLZXk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBDb250cmFjdFByb3ZpZGVyKElkZW5hUHJvdmlkZXIuY3JlYXRlKHVybCwgYXBpS2V5KSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihpZGVuYVByb3ZpZGVyOiBJZGVuYVByb3ZpZGVyKSB7XHJcbiAgICBzdXBlcihpZGVuYVByb3ZpZGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZXBsb3koXHJcbiAgICBhbW91bnQ6IHN0cmluZyxcclxuICAgIG1heEZlZTogc3RyaW5nLFxyXG4gICAgY29kZTogQnVmZmVyLFxyXG4gICAgYXJnczogQ29udHJhY3RBcmd1bWVudFtdID0gbnVsbFxyXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5kb1JlcXVlc3Qoe1xyXG4gICAgICBtZXRob2Q6ICdjb250cmFjdF9kZXBsb3knLFxyXG4gICAgICBwYXJhbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb2RlOiB0b0hleFN0cmluZyhjb2RlKSxcclxuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgYXJnczogYXJncyxcclxuICAgICAgICAgIG1heEZlZTogbWF4RmVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBlc3RpbWF0ZURlcGxveShcclxuICAgIGFtb3VudDogc3RyaW5nLFxyXG4gICAgbWF4RmVlOiBzdHJpbmcsXHJcbiAgICBjb2RlOiBCdWZmZXIsXHJcbiAgICBhcmdzOiBDb250cmFjdEFyZ3VtZW50W10gPSBudWxsXHJcbiAgKTogUHJvbWlzZTxKc29uUmVjZWlwdD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfZXN0aW1hdGVEZXBsb3knLFxyXG4gICAgICBwYXJhbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb2RlOiB0b0hleFN0cmluZyhjb2RlKSxcclxuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgYXJnczogYXJncyxcclxuICAgICAgICAgIG1heEZlZTogbWF4RmVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjYWxsKFxyXG4gICAgY29udHJhY3QsXHJcbiAgICBtZXRob2QsXHJcbiAgICBhbW91bnQsXHJcbiAgICBtYXhGZWU6IHN0cmluZyxcclxuICAgIGFyZ3M6IENvbnRyYWN0QXJndW1lbnRbXSA9IG51bGxcclxuICApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfY2FsbCcsXHJcbiAgICAgIHBhcmFtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNvbnRyYWN0OiBjb250cmFjdCxcclxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXHJcbiAgICAgICAgICBtYXhGZWU6IG1heEZlZSxcclxuICAgICAgICAgIGFyZ3M6IGFyZ3MsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGVzdGltYXRlQ2FsbChcclxuICAgIGNvbnRyYWN0LFxyXG4gICAgbWV0aG9kLFxyXG4gICAgYW1vdW50LFxyXG4gICAgbWF4RmVlOiBzdHJpbmcsXHJcbiAgICBhcmdzOiBDb250cmFjdEFyZ3VtZW50W10gPSBudWxsXHJcbiAgKTogUHJvbWlzZTxKc29uUmVjZWlwdD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfZXN0aW1hdGVDYWxsJyxcclxuICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY29udHJhY3Q6IGNvbnRyYWN0LFxyXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgIG1heEZlZTogbWF4RmVlLFxyXG4gICAgICAgICAgYXJnczogYXJncyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVhZERhdGEoY29udHJhY3QsIGtleSwgZm9ybWF0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9SZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kOiAnY29udHJhY3RfcmVhZERhdGEnLFxyXG4gICAgICBwYXJhbXM6IFtjb250cmFjdCwga2V5LCBmb3JtYXRdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVhZE1hcChjb250cmFjdCwgbWFwLCBrZXksIGZvcm1hdDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X3JlYWRNYXAnLFxyXG4gICAgICBwYXJhbXM6IFtjb250cmFjdCwgbWFwLCBrZXksIGZvcm1hdF0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBldmVudHMoY29udHJhY3QgOiBzdHJpbmcpIDogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvUmVxdWVzdCh7XHJcbiAgICAgIG1ldGhvZDogJ2NvbnRyYWN0X2V2ZW50cycsXHJcbiAgICAgIHBhcmFtczogW3tjb250cmFjdDogY29udHJhY3R9XSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
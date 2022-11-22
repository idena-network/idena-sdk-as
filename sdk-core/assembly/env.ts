export namespace env {
    // @ts-ignore
    @external("env", "debug")
    // Prints value to console, not available in production
    export declare function print(key: usize): void

    // @ts-ignore
    @external("env", "panic")
    // Interrupts execution with error message
    export declare function panic(msg: usize): void

    // @ts-ignore
    @external("env", "set_storage")
    // Sets key-value pair to contract store
    export declare function setStorage(key: usize, value: usize): void

    // @ts-ignore
    @external("env", "get_storage")
    // Reads value by key from contract store
    export declare function getStorage(key: usize): usize

    // @ts-ignore
    @external("env", "remove_storage")
    // Removes key-value pair from contract store
    export declare function removeStorage(key: usize): void

    // @ts-ignore
    @external("env", "block_timestamp")
    // Reads head block timestamp
    export declare function blockTimestamp(): i64

    // @ts-ignore
    @external("env", "block_seed")
    // Reads head block seed
    export declare function blockSeed(): usize

    // @ts-ignore
    @external("env", "block_number")
    // Reads head block number
    export declare function blockNumber(): u64

    // @ts-ignore
    @external("env", "min_fee_per_gas")
    // Reads minimal fee per gas
    export declare function minFeePerGas(): usize

    // @ts-ignore
    @external("env", "network_size")
    // Reads current network size
    export declare function networkSize(): u64    

    // @ts-ignore
    @external("env", "caller")
    // Reads predecessor of contract
    export declare function caller(): i32

    // @ts-ignore
    @external("env", "original_caller")
    // Reads signer of original transaction
    export declare function originalCaller(): i32

    // @ts-ignore
    @external("env", "create_call_function_promise")
    export declare function createCallFunctionPromise(contract: usize, method: usize, args: usize, deposit: usize, gasLimit: u32): i32

    // @ts-ignore
    @external("env", "create_deploy_contract_promise")
    export declare function createDeployContractPromise(code: usize, args: usize, nonce: usize, deposit: usize, gasLimit: u32): i32

    // @ts-ignore
    @external("env", "create_transfer_promise")
    export declare function createTransferPromise(to: usize, amount: usize) : void

    // @ts-ignore
    @external("env", "create_read_contract_data_promise")
    export declare function createReadContractDataPromise(addr: usize, key: usize, gasLimit : u32) : i32

    // @ts-ignore
    @external("env", "create_get_identity_promise")
    export declare function createGetIdentityPromise(addr: usize, gasLimit : u32) : i32

    // @ts-ignore
    @external("env", "promise_then")
    // Creates callback that will be executed after promise has finished
    export declare function then(promiseIdx : i32, method: usize, args: usize, amount: usize, gasLimit: u32) : void

    // @ts-ignore
    @external("env", "promise_result")
    /**
    Reads value of promise.
    @param result contains binary data of value.
    @returns status of promise result. 0 - failed, 1 - empty value, 2 - some value
    */
    export declare function promiseResult(result : usize): i32

    // @ts-ignore
    @external("env", "own_addr")
    // Reads address of current contract
    export declare function contract(): usize    

    @external("env", "code_hash")
    export declare function codeHash() : usize

    @external("env", "own_code")
    export declare function code() : usize

    @external("env", "contract_addr_by_hash")
    export declare function contractAddressByHash(code_hash : usize, args : usize, nonce : usize ) : usize

    @external("env", "emit_event")
    export declare function emitEvent(eventName : usize, args : usize) : void;

    @external("env", "epoch")
    export declare function epoch() : u16;

    @external("env", "pay_amount")
    export declare function payAmount() : usize;

    @external("env", "bytes_to_hex")
    export declare function bytes_to_hex(data: usize) : usize;
}

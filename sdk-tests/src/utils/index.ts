import {JsonReceipt} from 'idena-sdk-js';

function successOfAction(action): boolean {
  if (!action.success) {
    return false;
  }
  if (action.subActionResults) {
    for (var i = 0; i < action.subActionResults.length; i++) {
      if (!successOfAction(action.subActionResults[i])) {
        return false;
      }
    }
  }
  return true;
}

export function successOfAllActions(receipt: JsonReceipt): boolean {
  if (!receipt.success) {
    return false;
  }
  //@ts-ignore
  return !receipt.actionResult || successOfAction(receipt.actionResult);
}


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successOfAllActions = void 0;
function successOfAction(action) {
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
function successOfAllActions(receipt) {
    if (!receipt.success) {
        return false;
    }
    //@ts-ignore
    return !receipt.actionResult || successOfAction(receipt.actionResult);
}
exports.successOfAllActions = successOfAllActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBUyxlQUFlLENBQUMsTUFBTTtJQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNuQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7UUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDaEQsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxPQUFvQjtJQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNwQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsWUFBWTtJQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQU5ELGtEQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtKc29uUmVjZWlwdH0gZnJvbSAnaWRlbmEtc2RrLWpzJztcclxuXHJcbmZ1bmN0aW9uIHN1Y2Nlc3NPZkFjdGlvbihhY3Rpb24pOiBib29sZWFuIHtcclxuICBpZiAoIWFjdGlvbi5zdWNjZXNzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlmIChhY3Rpb24uc3ViQWN0aW9uUmVzdWx0cykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb24uc3ViQWN0aW9uUmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoIXN1Y2Nlc3NPZkFjdGlvbihhY3Rpb24uc3ViQWN0aW9uUmVzdWx0c1tpXSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWNjZXNzT2ZBbGxBY3Rpb25zKHJlY2VpcHQ6IEpzb25SZWNlaXB0KTogYm9vbGVhbiB7XHJcbiAgaWYgKCFyZWNlaXB0LnN1Y2Nlc3MpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgLy9AdHMtaWdub3JlXHJcbiAgcmV0dXJuICFyZWNlaXB0LmFjdGlvblJlc3VsdCB8fCBzdWNjZXNzT2ZBY3Rpb24ocmVjZWlwdC5hY3Rpb25SZXN1bHQpO1xyXG59XHJcblxyXG4iXX0=
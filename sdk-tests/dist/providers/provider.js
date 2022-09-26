"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProvider = void 0;
class BaseProvider {
    _idenaProvider;
    constructor(idenaProvider) {
        this._idenaProvider = idenaProvider;
    }
    async doRequest(obj) {
        return this._idenaProvider.doRequest(obj);
    }
}
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXJzL3Byb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsWUFBWTtJQUNiLGNBQWMsQ0FBZ0I7SUFFeEMsWUFBWSxhQUE0QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUN0QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFpRDtRQUN0RSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQVZELG9DQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJZGVuYVByb3ZpZGVyfSBmcm9tIFwiaWRlbmEtc2RrLWpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVByb3ZpZGVyIHtcclxuICBwcm90ZWN0ZWQgX2lkZW5hUHJvdmlkZXI6IElkZW5hUHJvdmlkZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkZW5hUHJvdmlkZXI6IElkZW5hUHJvdmlkZXIpIHtcclxuICAgIHRoaXMuX2lkZW5hUHJvdmlkZXIgPSBpZGVuYVByb3ZpZGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRvUmVxdWVzdChvYmo6IHsgbWV0aG9kOiBzdHJpbmc7IHBhcmFtczogYW55OyBpZD86IG51bWJlciB9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5faWRlbmFQcm92aWRlci5kb1JlcXVlc3Qob2JqKTtcclxuICB9XHJcbn1cclxuIl19
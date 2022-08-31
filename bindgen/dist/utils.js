"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSnakeCase = exports.toString = exports.posixRelativePath = exports.SimpleParser = void 0;
//@ts-ignore
let path = require("path");
const as_1 = require("visitor-as/as");
class SimpleParser {
    static getTokenizer(s) {
        return new as_1.Tokenizer(new as_1.Source(as_1.SourceKind.USER, "index.ts", s));
    }
    static parseExpression(s) {
        let res = this.parser.parseExpression(this.getTokenizer(s));
        if (res == null) {
            throw new Error("Failed to parse the expression: '" + s + "'");
        }
        return res;
    }
    static parseStatement(s, topLevel = false) {
        let res = this.parser.parseStatement(this.getTokenizer(s), topLevel);
        if (res == null) {
            throw new Error("Failed to parse the expression: '" + s + "'");
        }
        return res;
    }
    static parseTopLevel(s) {
        let tn = this.getTokenizer(s);
        let statements = [];
        while (!tn.skip(as_1.Token.ENDOFFILE)) {
            let statement = this.parser.parseTopLevelStatement(tn);
            if (statement) {
                statements.push(statement);
            }
            else {
                this.parser.skipStatement(tn);
            }
        }
        return statements;
    }
    static parseMethodDeclaration(s, parent) {
        let tn = this.getTokenizer(s);
        let res = this.parser.parseClassMember(tn, parent);
        if (res == null) {
            throw new Error("Failed to parse class member: '" + s + "'");
        }
        if (!(res instanceof as_1.MethodDeclaration)) {
            throw new Error("'" + s + "' is not a method declaration");
        }
        return res;
    }
}
exports.SimpleParser = SimpleParser;
SimpleParser.parser = new as_1.Parser();
function posixRelativePath(from, to) {
    const relativePath = path.relative(from, to);
    return relativePath.split(path.sep).join(path.posix.sep);
}
exports.posixRelativePath = posixRelativePath;
function toString(node) {
    return as_1.ASTBuilder.build(node);
}
exports.toString = toString;
const capitalPattern = /([a-z])([A-Z])/g;
const doubleCapital = /([A-Z])([A-Z][a-z])/g;
function makeSnakeCase(s) {
    return s
        .replace(capitalPattern, "$1_$2")
        .replace(doubleCapital, "$1_$2")
        .toLowerCase();
}
exports.makeSnakeCase = makeSnakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsWUFBWTtBQUNaLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQixzQ0FZdUI7QUFFdkIsTUFBYSxZQUFZO0lBR2YsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFTO1FBQ25DLE9BQU8sSUFBSSxjQUFTLENBQUMsSUFBSSxXQUFNLENBQUMsZUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFTO1FBQzlCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNoRTtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBUyxFQUFFLFdBQW9CLEtBQUs7UUFDeEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNoRTtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBUztRQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksVUFBVSxHQUFnQixFQUFFLENBQUM7UUFDakMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQjtTQUNGO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxzQkFBc0IsQ0FDM0IsQ0FBUyxFQUNULE1BQXdCO1FBRXhCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksc0JBQWlCLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7QUFsREgsb0NBbURDO0FBbERnQixtQkFBTSxHQUFHLElBQUksV0FBTSxFQUFFLENBQUM7QUFvRHZDLFNBQWdCLGlCQUFpQixDQUFDLElBQVksRUFBRSxFQUFVO0lBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUhELDhDQUdDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLElBQVU7SUFDakMsT0FBTyxlQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDO0FBQ3pDLE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDO0FBRTdDLFNBQWdCLGFBQWEsQ0FBQyxDQUFTO0lBQ3JDLE9BQU8sQ0FBQztTQUNMLE9BQU8sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO1NBQ2hDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO1NBQy9CLFdBQVcsRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFMRCxzQ0FLQyIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLWlnbm9yZVxubGV0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcblxuaW1wb3J0IHtcbiAgVG9rZW4sXG4gIEV4cHJlc3Npb24sXG4gIFRva2VuaXplcixcbiAgUGFyc2VyLFxuICBTb3VyY2UsXG4gIFNvdXJjZUtpbmQsXG4gIFN0YXRlbWVudCxcbiAgQVNUQnVpbGRlcixcbiAgTm9kZSxcbiAgTWV0aG9kRGVjbGFyYXRpb24sXG4gIENsYXNzRGVjbGFyYXRpb24sXG59IGZyb20gXCJ2aXNpdG9yLWFzL2FzXCI7XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVQYXJzZXIge1xuICBwcml2YXRlIHN0YXRpYyBwYXJzZXIgPSBuZXcgUGFyc2VyKCk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VG9rZW5pemVyKHM6IHN0cmluZyk6IFRva2VuaXplciB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIobmV3IFNvdXJjZShTb3VyY2VLaW5kLlVTRVIsIFwiaW5kZXgudHNcIiwgcykpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRXhwcmVzc2lvbihzOiBzdHJpbmcpOiBFeHByZXNzaW9uIHtcbiAgICBsZXQgcmVzID0gdGhpcy5wYXJzZXIucGFyc2VFeHByZXNzaW9uKHRoaXMuZ2V0VG9rZW5pemVyKHMpKTtcbiAgICBpZiAocmVzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBwYXJzZSB0aGUgZXhwcmVzc2lvbjogJ1wiICsgcyArIFwiJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVN0YXRlbWVudChzOiBzdHJpbmcsIHRvcExldmVsOiBib29sZWFuID0gZmFsc2UpOiBTdGF0ZW1lbnQge1xuICAgIGxldCByZXMgPSB0aGlzLnBhcnNlci5wYXJzZVN0YXRlbWVudCh0aGlzLmdldFRva2VuaXplcihzKSwgdG9wTGV2ZWwpO1xuICAgIGlmIChyZXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIHRoZSBleHByZXNzaW9uOiAnXCIgKyBzICsgXCInXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlVG9wTGV2ZWwoczogc3RyaW5nKTogU3RhdGVtZW50W10ge1xuICAgIGxldCB0biA9IHRoaXMuZ2V0VG9rZW5pemVyKHMpO1xuICAgIGxldCBzdGF0ZW1lbnRzOiBTdGF0ZW1lbnRbXSA9IFtdO1xuICAgIHdoaWxlICghdG4uc2tpcChUb2tlbi5FTkRPRkZJTEUpKSB7XG4gICAgICBsZXQgc3RhdGVtZW50ID0gdGhpcy5wYXJzZXIucGFyc2VUb3BMZXZlbFN0YXRlbWVudCh0bik7XG4gICAgICBpZiAoc3RhdGVtZW50KSB7XG4gICAgICAgIHN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJzZXIuc2tpcFN0YXRlbWVudCh0bik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZW1lbnRzO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlTWV0aG9kRGVjbGFyYXRpb24oXG4gICAgczogc3RyaW5nLFxuICAgIHBhcmVudDogQ2xhc3NEZWNsYXJhdGlvblxuICApOiBNZXRob2REZWNsYXJhdGlvbiB7XG4gICAgbGV0IHRuID0gdGhpcy5nZXRUb2tlbml6ZXIocyk7XG4gICAgbGV0IHJlcyA9IHRoaXMucGFyc2VyLnBhcnNlQ2xhc3NNZW1iZXIodG4sIHBhcmVudCk7XG4gICAgaWYgKHJlcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgY2xhc3MgbWVtYmVyOiAnXCIgKyBzICsgXCInXCIpO1xuICAgIH1cbiAgICBpZiAoIShyZXMgaW5zdGFuY2VvZiBNZXRob2REZWNsYXJhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIidcIiArIHMgKyBcIicgaXMgbm90IGEgbWV0aG9kIGRlY2xhcmF0aW9uXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3NpeFJlbGF0aXZlUGF0aChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKTtcbiAgcmV0dXJuIHJlbGF0aXZlUGF0aC5zcGxpdChwYXRoLnNlcCkuam9pbihwYXRoLnBvc2l4LnNlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyhub2RlOiBOb2RlKTogc3RyaW5nIHtcbiAgcmV0dXJuIEFTVEJ1aWxkZXIuYnVpbGQobm9kZSk7XG59XG5cbmNvbnN0IGNhcGl0YWxQYXR0ZXJuID0gLyhbYS16XSkoW0EtWl0pL2c7XG5jb25zdCBkb3VibGVDYXBpdGFsID0gLyhbQS1aXSkoW0EtWl1bYS16XSkvZztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTbmFrZUNhc2Uoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHNcbiAgICAucmVwbGFjZShjYXBpdGFsUGF0dGVybiwgXCIkMV8kMlwiKVxuICAgIC5yZXBsYWNlKGRvdWJsZUNhcGl0YWwsIFwiJDFfJDJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn1cbiJdfQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONTransformer = void 0;
const as_1 = require("visitor-as/as");
const JSONBuilder_1 = require("./JSONBuilder");
const classExporter_1 = require("./classExporter");
const utils_1 = require("./utils");
class JSONTransformer extends as_1.Transform {
    afterParse(parser) {
        this.parser = parser;
        const writeFile = this.writeFile;
        const baseDir = this.baseDir;
        let newParser = new as_1.Parser(parser.diagnostics);
        // Filter for near files
        let files = JSONBuilder_1.JSONBindingsBuilder.idenaFiles(this.parser.sources);
        JSONBuilder_1.JSONBindingsBuilder.checkTestBuild(parser.sources);
        // Visit each file
        files.forEach((source) => {
            if (source.internalPath.includes("index-stub"))
                return;
            let writeOut = /\/\/.*@idenafile .*out/.test(source.text);
            // Remove from logs in parser
            parser.donelog.delete(source.internalPath);
            parser.seenlog.delete(source.internalPath);
            // Remove from programs sources
            this.parser.sources = this.parser.sources.filter((_source) => _source !== source);
            this.program.sources = this.program.sources.filter((_source) => _source !== source);
            // Export main singleton class if one is present
            classExporter_1.ClassExporter.visit(source);
            // Build new Source
            let sourceText = JSONBuilder_1.JSONBindingsBuilder.build(source);
            if (writeOut) {
                writeFile(utils_1.posixRelativePath("out", source.normalizedPath), sourceText, baseDir);
            }
            // Parses file and any new imports added to the source
            newParser.parseFile(sourceText, utils_1.posixRelativePath(JSONBuilder_1.isEntry(source) ? "" : "./", source.normalizedPath), JSONBuilder_1.isEntry(source));
            let newSource = newParser.sources.pop();
            this.program.sources.push(newSource);
            parser.donelog.add(source.internalPath);
            parser.seenlog.add(source.internalPath);
            parser.sources.push(newSource);
        });
        classExporter_1.ClassExporter.classSeen = null;
    }
}
exports.JSONTransformer = JSONTransformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHJhbnNmb3JtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQThFO0FBQzlFLCtDQUE2RDtBQUU3RCxtREFBZ0Q7QUFFaEQsbUNBQTRDO0FBRTVDLE1BQU0sZUFBZ0IsU0FBUSxjQUFTO0lBR3JDLFVBQVUsQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBRyxJQUFJLFdBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFL0Msd0JBQXdCO1FBQ3hCLElBQUksS0FBSyxHQUFHLGlDQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLGlDQUFtQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsa0JBQWtCO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFBRSxPQUFPO1lBQ3ZELElBQUksUUFBUSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsNkJBQTZCO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDOUMsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQ3hDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ2hELENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUN4QyxDQUFDO1lBQ0YsZ0RBQWdEO1lBQ2hELDZCQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLG1CQUFtQjtZQUNuQixJQUFJLFVBQVUsR0FBRyxpQ0FBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osU0FBUyxDQUNQLHlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQy9DLFVBQVUsRUFDVixPQUFPLENBQ1IsQ0FBQzthQUNIO1lBQ0Qsc0RBQXNEO1lBQ3RELFNBQVMsQ0FBQyxTQUFTLENBQ2pCLFVBQVUsRUFDVix5QkFBaUIsQ0FBQyxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQ3JFLHFCQUFPLENBQUMsTUFBTSxDQUFDLENBQ2hCLENBQUM7WUFDRixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsNkJBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQUVRLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNmb3JtLCBQYXJzZXIsIFNvdXJjZSwgTW9kdWxlLCBTb3VyY2VLaW5kIH0gZnJvbSBcInZpc2l0b3ItYXMvYXNcIjtcbmltcG9ydCB7IEpTT05CaW5kaW5nc0J1aWxkZXIsIGlzRW50cnkgfSBmcm9tIFwiLi9KU09OQnVpbGRlclwiO1xuaW1wb3J0IHsgVHlwZUNoZWNrZXIgfSBmcm9tIFwiLi90eXBlQ2hlY2tlclwiO1xuaW1wb3J0IHsgQ2xhc3NFeHBvcnRlciB9IGZyb20gXCIuL2NsYXNzRXhwb3J0ZXJcIjtcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSBcInZpc2l0b3ItYXNcIjtcbmltcG9ydCB7IHBvc2l4UmVsYXRpdmVQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgSlNPTlRyYW5zZm9ybWVyIGV4dGVuZHMgVHJhbnNmb3JtIHtcbiAgcGFyc2VyOiBQYXJzZXI7XG5cbiAgYWZ0ZXJQYXJzZShwYXJzZXI6IFBhcnNlcik6IHZvaWQge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICAgIGNvbnN0IHdyaXRlRmlsZSA9IHRoaXMud3JpdGVGaWxlO1xuICAgIGNvbnN0IGJhc2VEaXIgPSB0aGlzLmJhc2VEaXI7XG4gICAgbGV0IG5ld1BhcnNlciA9IG5ldyBQYXJzZXIocGFyc2VyLmRpYWdub3N0aWNzKTtcblxuICAgIC8vIEZpbHRlciBmb3IgbmVhciBmaWxlc1xuICAgIGxldCBmaWxlcyA9IEpTT05CaW5kaW5nc0J1aWxkZXIuaWRlbmFGaWxlcyh0aGlzLnBhcnNlci5zb3VyY2VzKTtcbiAgICBKU09OQmluZGluZ3NCdWlsZGVyLmNoZWNrVGVzdEJ1aWxkKHBhcnNlci5zb3VyY2VzKTtcbiAgICAvLyBWaXNpdCBlYWNoIGZpbGVcbiAgICBmaWxlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgIGlmIChzb3VyY2UuaW50ZXJuYWxQYXRoLmluY2x1ZGVzKFwiaW5kZXgtc3R1YlwiKSkgcmV0dXJuO1xuICAgICAgbGV0IHdyaXRlT3V0ID0gL1xcL1xcLy4qQGlkZW5hZmlsZSAuKm91dC8udGVzdChzb3VyY2UudGV4dCk7XG4gICAgICAvLyBSZW1vdmUgZnJvbSBsb2dzIGluIHBhcnNlclxuICAgICAgcGFyc2VyLmRvbmVsb2cuZGVsZXRlKHNvdXJjZS5pbnRlcm5hbFBhdGgpO1xuICAgICAgcGFyc2VyLnNlZW5sb2cuZGVsZXRlKHNvdXJjZS5pbnRlcm5hbFBhdGgpO1xuICAgICAgLy8gUmVtb3ZlIGZyb20gcHJvZ3JhbXMgc291cmNlc1xuICAgICAgdGhpcy5wYXJzZXIuc291cmNlcyA9IHRoaXMucGFyc2VyLnNvdXJjZXMuZmlsdGVyKFxuICAgICAgICAoX3NvdXJjZTogU291cmNlKSA9PiBfc291cmNlICE9PSBzb3VyY2VcbiAgICAgICk7XG4gICAgICB0aGlzLnByb2dyYW0uc291cmNlcyA9IHRoaXMucHJvZ3JhbS5zb3VyY2VzLmZpbHRlcihcbiAgICAgICAgKF9zb3VyY2U6IFNvdXJjZSkgPT4gX3NvdXJjZSAhPT0gc291cmNlXG4gICAgICApO1xuICAgICAgLy8gRXhwb3J0IG1haW4gc2luZ2xldG9uIGNsYXNzIGlmIG9uZSBpcyBwcmVzZW50XG4gICAgICBDbGFzc0V4cG9ydGVyLnZpc2l0KHNvdXJjZSk7XG4gICAgICAvLyBCdWlsZCBuZXcgU291cmNlXG4gICAgICBsZXQgc291cmNlVGV4dCA9IEpTT05CaW5kaW5nc0J1aWxkZXIuYnVpbGQoc291cmNlKTtcbiAgICAgIGlmICh3cml0ZU91dCkge1xuICAgICAgICB3cml0ZUZpbGUoXG4gICAgICAgICAgcG9zaXhSZWxhdGl2ZVBhdGgoXCJvdXRcIiwgc291cmNlLm5vcm1hbGl6ZWRQYXRoKSxcbiAgICAgICAgICBzb3VyY2VUZXh0LFxuICAgICAgICAgIGJhc2VEaXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIFBhcnNlcyBmaWxlIGFuZCBhbnkgbmV3IGltcG9ydHMgYWRkZWQgdG8gdGhlIHNvdXJjZVxuICAgICAgbmV3UGFyc2VyLnBhcnNlRmlsZShcbiAgICAgICAgc291cmNlVGV4dCxcbiAgICAgICAgcG9zaXhSZWxhdGl2ZVBhdGgoaXNFbnRyeShzb3VyY2UpID8gXCJcIiA6IFwiLi9cIiwgc291cmNlLm5vcm1hbGl6ZWRQYXRoKSxcbiAgICAgICAgaXNFbnRyeShzb3VyY2UpXG4gICAgICApO1xuICAgICAgbGV0IG5ld1NvdXJjZSA9IG5ld1BhcnNlci5zb3VyY2VzLnBvcCgpITtcbiAgICAgIHRoaXMucHJvZ3JhbS5zb3VyY2VzLnB1c2gobmV3U291cmNlKTtcbiAgICAgIHBhcnNlci5kb25lbG9nLmFkZChzb3VyY2UuaW50ZXJuYWxQYXRoKTtcbiAgICAgIHBhcnNlci5zZWVubG9nLmFkZChzb3VyY2UuaW50ZXJuYWxQYXRoKTtcbiAgICAgIHBhcnNlci5zb3VyY2VzLnB1c2gobmV3U291cmNlKTtcbiAgICB9KTtcblxuICAgIENsYXNzRXhwb3J0ZXIuY2xhc3NTZWVuID0gbnVsbCE7XG4gIH1cbn1cblxuZXhwb3J0IHsgSlNPTlRyYW5zZm9ybWVyIH07XG4iXX0=
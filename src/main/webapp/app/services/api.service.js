"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/observable/throw");
var index_1 = require("../models/index");
var sessionTimeout;
exports.sessionTimeoutStream = new Subject_1.Subject();
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.headersForm = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        this.headersJson = new http_1.Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }
    ApiService.prototype.get = function (path) {
        return this.http.get(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.post = function (path) {
        return this.http.post(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.put = function (path, body) {
        return this.http.put(path, body, { headers: this.headersJson })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.apiDelete = function (path) {
        return this.http.delete(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .do(this.updateSession);
    };
    ApiService.prototype.getJson = function (resp) {
        try {
            return resp.json();
        }
        catch (err) {
            return;
        }
    };
    ApiService.prototype.checkForError = function (resp) {
        if (resp.url.indexOf('login') !== -1) {
            return window.location.pathname = '/login';
        }
        if (resp.status >= 200 && resp.status < 400) {
            return resp;
        }
        else {
            var error = new Error(resp.statusText);
            error['response'] = resp;
            console.error(error);
            throw error;
        }
    };
    ApiService.prototype.updateSession = function () {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(function () {
            exports.sessionTimeoutStream.next();
        }, index_1.STATIC_DATA.sessionTime);
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELHNDQUF5RDtBQUN6RCw4Q0FBMkQ7QUFDM0Qsd0NBQXdEO0FBQ3hELGlDQUErQjtBQUMvQixtQ0FBaUM7QUFDakMsZ0NBQThCO0FBQzlCLHFDQUFtQztBQUVuQyx5Q0FBMkQ7QUFFM0QsSUFBSSxjQUFjLENBQUM7QUFDTixRQUFBLG9CQUFvQixHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBR2xEO0lBY0Usb0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBWnRCLGdCQUFXLEdBQVksSUFBSSxjQUFPLENBQUM7WUFDekMsY0FBYyxFQUFFLG1DQUFtQztZQUNuRCxRQUFRLEVBQUUsa0JBQWtCO1NBQzdCLENBQUMsQ0FBQztRQUVLLGdCQUFXLEdBQVksSUFBSSxjQUFPLENBQUM7WUFDekMsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxRQUFRLEVBQUUsa0JBQWtCO1NBQzdCLENBQUMsQ0FBQztJQUk4QixDQUFDO0lBRWxDLHdCQUFHLEdBQUgsVUFBSSxJQUFZO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUM7YUFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDdkIsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUM7YUFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDakIsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQseUJBQUksR0FBSixVQUFLLElBQVk7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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QixVQUFVLENBNkV0QjtJQUFELGlCQUFDO0NBN0VELEFBNkVDLElBQUE7QUE3RVksZ0NBQVUiLCJmaWxlIjoic2VydmljZXMvYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gICAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UgfSAgZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSAgICAgICAgICAgICAgIGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSAgICAgICAgICAgICAgICAgIGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGhyb3cnO1xyXG5cclxuaW1wb3J0IHsgU1RBVElDX0RBVEEgfSAgICAgICAgICAgICAgZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmxldCBzZXNzaW9uVGltZW91dDtcclxuZXhwb3J0IGNvbnN0IHNlc3Npb25UaW1lb3V0U3RyZWFtID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGhlYWRlcnNGb3JtOiBIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH0pO1xyXG5cclxuICBwcml2YXRlIGhlYWRlcnNKc29uOiBIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9KTtcclxuXHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XHJcblxyXG4gIGdldChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocGF0aCwge2hlYWRlcnM6IHRoaXMuaGVhZGVyc0Zvcm19KVxyXG4gICAgICAubWFwKHRoaXMuY2hlY2tGb3JFcnJvcilcclxuICAgICAgLmNhdGNoKGVyciA9PiBPYnNlcnZhYmxlLnRocm93KGVycikpXHJcbiAgICAgIC5tYXAodGhpcy5nZXRKc29uKVxyXG4gICAgICAuZG8odGhpcy51cGRhdGVTZXNzaW9uKTtcclxuICB9XHJcblxyXG4gIHBvc3QocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChwYXRoLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzRm9ybX0pXHJcbiAgICAgIC5tYXAodGhpcy5jaGVja0ZvckVycm9yKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IE9ic2VydmFibGUudGhyb3coZXJyKSlcclxuICAgICAgLm1hcCh0aGlzLmdldEpzb24pXHJcbiAgICAgIC5kbyh0aGlzLnVwZGF0ZVNlc3Npb24pO1xyXG4gIH1cclxuXHJcbiAgcHV0KHBhdGg6IHN0cmluZywgYm9keTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHBhdGgsIGJvZHksIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnNKc29ufSlcclxuICAgICAgLm1hcCh0aGlzLmNoZWNrRm9yRXJyb3IpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnIpKVxyXG4gICAgICAubWFwKHRoaXMuZ2V0SnNvbilcclxuICAgICAgLmRvKHRoaXMudXBkYXRlU2Vzc2lvbik7XHJcbiAgfVxyXG5cclxuICBhcGlEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHBhdGgsIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnNGb3JtfSlcclxuICAgICAgLm1hcCh0aGlzLmNoZWNrRm9yRXJyb3IpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnIpKVxyXG4gICAgICAuZG8odGhpcy51cGRhdGVTZXNzaW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SnNvbihyZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tGb3JFcnJvcihyZXNwOiBSZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3AudXJsLmluZGV4T2YoJ2xvZ2luJykgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPSAnL2xvZ2luJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcC5zdGF0dXMgPj0gMjAwICYmIHJlc3Auc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgIHJldHVybiByZXNwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IocmVzcC5zdGF0dXNUZXh0KTtcclxuICAgICAgZXJyb3JbJ3Jlc3BvbnNlJ10gPSByZXNwO1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVNlc3Npb24oKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoc2Vzc2lvblRpbWVvdXQpO1xyXG4gICAgc2Vzc2lvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2Vzc2lvblRpbWVvdXRTdHJlYW0ubmV4dCgpO1xyXG4gICAgfSwgU1RBVElDX0RBVEEuc2Vzc2lvblRpbWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19

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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var RegService = (function () {
    function RegService(_http) {
        this._http = _http;
    }
    RegService.prototype.ngOnInit = function () {
    };
    RegService.prototype.getUsers = function () {
        return this._http.get('http://ankitesh.pythonanywhere.com/api/v1.0/get_books_data')
            .map(function (response) { return response.json(); });
    };
    RegService.prototype.regUser = function (User) {
        var payload = JSON.stringify({ payload: { "Username": User.Username, "Email_id": User.Email_id, "Password": User.Password } });
        return this._http.post('http://ankitesh.pythonanywhere.com/api/v1.0/get_book_summary', payload)
            .map(function (response) { return response.json(); });
    };
    return RegService;
}());
RegService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RegService);
exports.RegService = RegService;
//# sourceMappingURL=register.service.js.map
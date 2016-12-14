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
var core_2 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var http_3 = require("@angular/http");
var core_3 = require("@angular/core");
//================================= TASK SERVICE===============================================
var TaskService = (function () {
    function TaskService(_http) {
        this._http = _http;
    }
    TaskService.prototype.ngOnInit = function () {
    };
    TaskService.prototype.getTasks = function () {
        return this._http.get('/api/tasks')
            .map(function (response) { return response.json(); });
    };
    TaskService.prototype.addTask = function (task) {
        return this._http.post('/api/task/', task).map(function (response) {
            response.json();
        });
    };
    TaskService.prototype.updateTask = function (task) {
        console.log(task);
        var headers = new http_3.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.put('/api/tasks/' + task._id, JSON.stringify(task), options).map(function (response) {
            response.json(),
                function () { return console.log(response); };
        });
    };
    TaskService.prototype.deleteTask = function (task) {
        console.log(task.title);
        return this._http.delete('/api/task/' + task._id).map(function (response) {
            response.json();
        });
    };
    return TaskService;
}());
TaskService = __decorate([
    core_2.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
/* getMashape(){

 let headers = new Headers({ 'Content-Type': 'application/json' });
 headers.append('X-Mashape-Key',`j6hkn5tpRcmshrp51a7Bx227HiI6p1LYIcajsn9ArkOuuEyNd2`);
 headers.append("Accept", "application/json");
 let body=JSON.stringify({"search":"Axis"});
 let options = new RequestOptions({ headers: headers });
 return this._http.post('https://mutualfundsnav.p.mashape.com/',body,options)
 .map(response => response.json());
 }*/
//===================================NEW TASK COMPONENT=============================================
var NewTaskComponent = (function () {
    function NewTaskComponent(taskService) {
        this.taskService = taskService;
        this.notify = new core_1.EventEmitter();
        this.task = { title: "", id: "" };
    }
    NewTaskComponent.prototype.ngOnInit = function () {
    };
    NewTaskComponent.prototype.onSubmit = function () {
        var _this = this;
        this.taskService.addTask(this.task).subscribe(function (task) {
            console.log(task);
            _this.task = { title: "", id: "" };
        });
        this.notify.emit("Newtask");
    };
    return NewTaskComponent;
}());
__decorate([
    core_3.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NewTaskComponent.prototype, "notify", void 0);
NewTaskComponent = __decorate([
    core_1.Component({
        selector: 'new-task',
        inputs: [],
        template: "\n    <h4>Create Task</h4>\n    <form class=\"form-inline\" style=\"padding:5px;width: 100%;\" (submit)=\"onSubmit()\">\n    <div class=\"form-group\">\n      \n    <input class=\"form-control\" [(ngModel)]=\"task.id\" placeholder=\"ID\" name=\"task.id\">\n    </div>\n    <div class=\"form-group\">\n      \n    <input class=\"form-control\" [(ngModel)]=\"task.title\" placeholder=\"Task Title\" name=\"task.title\">\n    </div>\n    \n    <input type=\"submit\" class=\"btn btn-default\">\n    </form>\n    "
    }),
    __metadata("design:paramtypes", [TaskService])
], NewTaskComponent);
exports.NewTaskComponent = NewTaskComponent;
//==================================TASK LIST COMPONENT==============================================
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.toggle = true;
        this.taskService.getTasks().subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    TasksComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    TasksComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService.getTasks().subscribe(
        // the first argument is a function which runs on success
        function (data) { _this.tasks = data; }, 
        // the second argument is a function which runs on error
        function (err) { return console.error(err); }, 
        // the third argument is a function which runs on completion
        function () { return console.log('done loading tasks'); });
    };
    TasksComponent.prototype.removeTask = function (task) {
        var _this = this;
        // console.log(task);
        this.taskService.deleteTask(task).subscribe(function (response) {
            _this.getTasks();
            return true;
        });
    };
    TasksComponent.prototype.onNotify = function (message) {
        this.getTasks();
    };
    TasksComponent.prototype.completedTask = function (task) {
        var _this = this;
        this.task = task;
        this.task.complete = task.complete ? false : true;
        this.taskService.updateTask(this.task).subscribe(function (response) {
            _this.getTasks();
            return true;
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        selector: 'tasks',
        template: "<h2>Task List Application</h2>\n            <new-task (notify)=\"onNotify($event)\"></new-task>\n            \n            <ul class=\"list-group\">\n              \n                <li class =\"list-group-item\"*ngFor=\"let task of tasks\">\n                <span *ngIf=\"task.complete\" style=\"text-decoration:line-through;\">{{task.title}}</span>\n                <span *ngIf=\"!\n                task.complete\" >{{task.title}}</span>\n\n                <input class=\"btn btn-info pull-right inpbtn\" style=\"padding:5px\" type=\"button\" value=\"Completed!\" (click)=\"completedTask(task)\">\n\n                <input class=\"btn btn-danger pull-right inpbtn\" style=\"padding:5px\"type=\"button\" value =\"Delete\" (click)=\"removeTask(task)\">\n                \n                </li>\n               \n            </ul>\n            \n    ",
        styles: [".completed{\n        text-decoration:line-through;\n        color:red;\n           }\n           .inpbtn{\n           padding: 3px 3px 3px 3px;\n           }\n"]
    }),
    __metadata("design:paramtypes", [TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
/* getMashape(){
 this.taskService.getMashape().subscribe(
 // the first argument is a function which runs on success
 data => { this.mashape = data},
 // the second argument is a function which runs on error
 err => console.error(err),
 // the third argument is a function which runs on completion
 () => console.log('done loading mashape')
 );

 }*/
//=====================================EDIT COMPONENT===========================================
var EditComponent = (function () {
    function EditComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.taskService.getTasks().subscribe(function (tasks) {
            _this.tasks = tasks,
                function () { return console.log(tasks); };
        });
    }
    EditComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    EditComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService.getTasks().subscribe(function (data) { _this.tasks = data; }, function (err) { return console.error(err); }, function () { return console.log(_this.tasks); });
    };
    EditComponent.prototype.onSubmit = function (task) {
        var _this = this;
        this.taskService.updateTask(task).subscribe(function (response) {
            _this.getTasks();
            return true;
        });
    };
    return EditComponent;
}());
EditComponent = __decorate([
    core_1.Component({
        selector: 'edit',
        template: "<h1>Edit</h1>\n<ul class=\"list-group\">\n              \n                \n               \n                <li class =\"list-group-item\"*ngFor=\"let task of tasks\">\n                 <form class=\"form-inline\" (submit)=\"onSubmit(task)\">\n                <div class=\"form-group\">\n                  \n                <input value=\"{{task.id}}\" [(ngModel)]=\"task.id\" placeholder=\"ID\" name=\"task.id\">\n                </div>\n                <div class=\"form-group\">\n                  \n                <input value=\"{{task.title}}\" [(ngModel)]=\"task.title\" placeholder=\"Task Title\" name=\"task.title\">\n                </div>\n                \n                <input type=\"submit\" value=\"Update\" class=\"btn btn-default\">\n                \n                </form>\n                </li>\n                \n               \n            </ul>\n    \n"
    }),
    __metadata("design:paramtypes", [TaskService])
], EditComponent);
exports.EditComponent = EditComponent;
//=====================================ROOT COMPONENT===========================================
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: "app/app.component.html",
        providers: [TaskService],
        styleUrls: ['bower_components/bootstrap/dist/css/bootstrap-theme.css']
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
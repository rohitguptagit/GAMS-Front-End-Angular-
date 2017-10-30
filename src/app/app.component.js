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
var student_service_1 = require("./student.service");
var AppComponent = (function () {
    function AppComponent(studentService) {
        this.studentService = studentService;
        this.title = 'Tour of Students';
    }
    AppComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService.getStudents().then(function (students) { return _this.students = students; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    AppComponent.prototype.onSelect = function (student) {
        this.selectedStudent = student;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <h1>{{title}}</h1>\n    <h2>My Students</h2>\n    <ul class=\"students\">\n      <li *ngFor=\"let student of students\"\n        [class.selected]=\"student === selectedStudent\"\n        (click)=\"onSelect(student)\">\n        <span class=\"badge\">{{student.sId}}</span> {{student.firstName}}\n      </li>\n    </ul>\n    <student-detail [student]=\"selectedStudent\"></student-detail>\n  ",
        styles: ["\n    .selected {\n      background-color: #CFD8DC !important;\n      color: white;\n    }\n    .students {\n      margin: 0 0 2em 0;\n      list-style-type: none;\n      padding: 0;\n      width: 15em;\n    }\n    .students li {\n      cursor: pointer;\n      position: relative;\n      left: 0;\n      background-color: #EEE;\n      margin: .5em;\n      padding: .3em 0;\n      height: 1.6em;\n      border-radius: 4px;\n    }\n    .students li.selected:hover {\n      background-color: #BBD8DC !important;\n      color: white;\n    }\n    .students li:hover {\n      color: #607D8B;\n      background-color: #DDD;\n      left: .1em;\n    }\n    .students .text {\n      position: relative;\n      top: -3px;\n    }\n    .students .badge {\n      display: inline-block;\n      font-size: small;\n      color: white;\n      padding: 0.8em 0.7em 0 0.7em;\n      background-color: #607D8B;\n      line-height: 1em;\n      position: relative;\n      left: -1px;\n      top: -4px;\n      height: 1.8em;\n      margin-right: .8em;\n      border-radius: 4px 0 0 4px;\n    }\n  "],
        providers: [student_service_1.StudentService]
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
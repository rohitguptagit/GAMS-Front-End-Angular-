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
var student_1 = require("./student");
var StudentDetailComponent = (function () {
    function StudentDetailComponent() {
    }
    return StudentDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", student_1.Student)
], StudentDetailComponent.prototype, "student", void 0);
StudentDetailComponent = __decorate([
    core_1.Component({
        selector: 'student-detail',
        template: "\n    <div *ngIf=\"student\">\n      <h2>{{student.lastName}} details!</h2>\n      <div>\n        <label>sId: </label>{{student.sId}}\n      </div>\n      <div>\n        <label>lastName: </label>{{student.lastName}}\n      </div>\n      <div>\n        <label>firstName: </label>{{student.firstName}}\n      </div>\n      <div>\n        <label>major: </label>{{student.major}}\n      </div>\n    </div>\n  "
    })
], StudentDetailComponent);
exports.StudentDetailComponent = StudentDetailComponent;
//# sourceMappingURL=student-detail.component.js.map
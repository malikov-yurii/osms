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
var ContenteditableModel = /** @class */ (function () {
    function ContenteditableModel(el) {
        this.el = el;
        this.update = new core_1.EventEmitter();
        this.changed = new core_1.EventEmitter();
    }
    ContenteditableModel.prototype.ngOnChanges = function (changes) {
        if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    };
    ContenteditableModel.prototype.onKeydown = function (e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.el.nativeElement.blur();
            return false;
        }
    };
    /** This should probably be debounced. */
    ContenteditableModel.prototype.onBlur = function () {
        var value = this.el.nativeElement.innerText;
        // tslint:disable-next-line
        if (this.lastViewModel != value) {
            // debugger
            this.changed.emit({ newValue: value, oldValue: this.lastViewModel });
            this.lastViewModel = value;
        }
        this.update.emit(value);
    };
    ContenteditableModel.prototype.refreshView = function () {
        this.el.nativeElement.innerText = this.model;
    };
    __decorate([
        core_1.Input('contenteditableModel'),
        __metadata("design:type", String)
    ], ContenteditableModel.prototype, "model", void 0);
    __decorate([
        core_1.Output('contenteditableModelChange'),
        __metadata("design:type", Object)
    ], ContenteditableModel.prototype, "update", void 0);
    __decorate([
        core_1.Output('contentChanged'),
        __metadata("design:type", Object)
    ], ContenteditableModel.prototype, "changed", void 0);
    ContenteditableModel = __decorate([
        core_1.Directive({
            selector: '[contenteditableModel]',
            host: {
                '(blur)': 'onBlur()',
                '(keypress)': 'onKeydown($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ContenteditableModel);
    return ContenteditableModel;
}());
exports.ContenteditableModel = ContenteditableModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY29udGVudGVkaXRhYmxlLW1vZGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRztBQVNsRztJQWlCRSw4QkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFiSSxXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBWWxCLENBQUM7SUFFdEMsMENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsQ0FBQztRQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCx5Q0FBeUM7SUFDekMscUNBQU0sR0FBTjtRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUM1QywyQkFBMkI7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFdBQVc7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sMENBQVcsR0FBbkI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMvQyxDQUFDO0lBNUM4QjtRQUE5QixZQUFLLENBQUMsc0JBQXNCLENBQUM7O3VEQUFlO0lBQ1A7UUFBckMsYUFBTSxDQUFDLDRCQUE0QixDQUFDOzt3REFBNkI7SUFDeEM7UUFBekIsYUFBTSxDQUFDLGdCQUFnQixDQUFDOzt5REFBOEI7SUFMNUMsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsWUFBWSxFQUFFLG1CQUFtQjthQUNsQztTQUNGLENBQUM7eUNBa0J3QixpQkFBVTtPQWpCdkIsb0JBQW9CLENBZ0RoQztJQUFELDJCQUFDO0NBaERELEFBZ0RDLElBQUE7QUFoRFksb0RBQW9CIiwiZmlsZSI6ImRpcmVjdGl2ZXMvY29udGVudGVkaXRhYmxlLW1vZGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjb250ZW50ZWRpdGFibGVNb2RlbF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxyXG4gICAgJyhrZXlwcmVzcyknOiAnb25LZXlkb3duKCRldmVudCknXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGVudGVkaXRhYmxlTW9kZWwge1xyXG4gIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1Mzc4MDg3L2hvdy10by11c2Utbmdtb2RlbC1vbi1kaXZzLWNvbnRlbnRlZGl0YWJsZS1pbi1hbmd1bGFyMlxyXG5cclxuICBASW5wdXQoJ2NvbnRlbnRlZGl0YWJsZU1vZGVsJykgbW9kZWw6IHN0cmluZztcclxuICBAT3V0cHV0KCdjb250ZW50ZWRpdGFibGVNb2RlbENoYW5nZScpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCdjb250ZW50Q2hhbmdlZCcpIGNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ5IHVwZGF0aW5nIHRoaXMgcHJvcGVydHkgb24ga2V5dXAsIGFuZCBjaGVja2luZyBhZ2FpbnN0IGl0IGR1cmluZ1xyXG4gICAqIG5nT25DaGFuZ2VzLCB3ZSBjYW4gcnVsZSBvdXQgY2hhbmdlIGV2ZW50cyBmaXJlZCBieSBvdXIgb3duIG9uS2V5dXAuXHJcbiAgICogSWRlYWxseSB3ZSB3b3VsZCBub3QgaGF2ZSB0byBjaGVjayBhZ2FpbnN0IHRoZSB3aG9sZSBzdHJpbmcgb24gZXZlcnlcclxuICAgKiBjaGFuZ2UsIGNvdWxkIHBvc3NpYmx5IHN0b3JlIGEgZmxhZyBkdXJpbmcgb25LZXl1cCBhbmQgdGVzdCBhZ2FpbnN0IHRoYXRcclxuICAgKiBmbGFnIGluIG5nT25DaGFuZ2VzLCBidXQgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvZiBBbmd1bGFyIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgKiBjeWNsZSBtaWdodCBtYWtlIHRoaXMgbm90IHdvcmsgaW4gc29tZSBlZGdlIGNhc2VzP1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGFzdFZpZXdNb2RlbDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snbW9kZWwnXSAmJiBjaGFuZ2VzWydtb2RlbCddLmN1cnJlbnRWYWx1ZSAhPT0gdGhpcy5sYXN0Vmlld01vZGVsKSB7XHJcbiAgICAgIHRoaXMubGFzdFZpZXdNb2RlbCA9IHRoaXMubW9kZWw7XHJcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDI3KSB7IC8vIEVudGVyIGFuZCBFc2NhcGVcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIGRlYm91bmNlZC4gKi9cclxuICBvbkJsdXIoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBpZiAodGhpcy5sYXN0Vmlld01vZGVsICE9IHZhbHVlKSB7IC8vIG5vbnN0cmljdCBjb21wYXJpc29uIGlzIG5lZWRlZFxyXG4gICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICB0aGlzLmNoYW5nZWQuZW1pdCh7bmV3VmFsdWU6IHZhbHVlLCBvbGRWYWx1ZTogdGhpcy5sYXN0Vmlld01vZGVsfSk7XHJcbiAgICAgIHRoaXMubGFzdFZpZXdNb2RlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGUuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hWaWV3KCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMubW9kZWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==

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
var index_1 = require("../services/index");
var index_2 = require("../ui/index");
var index_3 = require("../models/index");
var Autocomplete = /** @class */ (function () {
    function Autocomplete(orderService, viewRef, compiler) {
        this.orderService = orderService;
        this.viewRef = viewRef;
        this.compiler = compiler;
        this.selected = new core_1.EventEmitter();
        this.refreshTimer = undefined;
        this.searchRequired = false;
        this.searchInProgress = false;
        this.isBlurred = true;
        this.listComponent = undefined;
    }
    Autocomplete.prototype.onKeyDown = function (e) {
        var _this = this;
        if (index_3.STATIC_DATA.fieldsToAutocomplete.indexOf(this.types[1]) > -1) {
            if (this.listComponent) {
                switch (e.code) {
                    case 'ArrowDown':
                        this.listComponent.instance.focusMoved.next('next');
                        return false;
                    case 'ArrowUp':
                        this.listComponent.instance.focusMoved.next('prev');
                        return false;
                    case 'Enter':
                        this.listComponent.instance.selectedStream.next();
                        return false;
                    case 'NumpadEnter':
                        this.listComponent.instance.selectedStream.next();
                        return true;
                    case 'Tab':
                        this.listComponent.instance.selectedStream.next();
                        return true;
                    case 'Escape':
                        this.removeList();
                        return false;
                }
            }
            if (index_3.STATIC_DATA.keycodesNotToAutocomplete.indexOf(e.which) === -1) {
                setTimeout(function () { return _this.onKeyUp(e); }, 0);
            }
        }
    };
    Autocomplete.prototype.onKeyUp = function (e) {
        var _this = this;
        this.isBlurred = false;
        this.term = e.target.innerText;
        if (this.term && !this.refreshTimer) {
            this.refreshTimer = setTimeout(function () {
                if (!_this.searchInProgress && _this.term && !_this.isBlurred) {
                    _this.doSearch();
                }
                else {
                    _this.searchRequired = true;
                }
            }, 800);
        }
        if (this.listComponent && !this.term) {
            this.removeList();
        }
    };
    Autocomplete.prototype.onBlur = function () {
        var _this = this;
        this.isBlurred = true;
        setTimeout(function () {
            _this.removeList();
        }, 500);
    };
    Autocomplete.prototype.doSearch = function () {
        var _this = this;
        this.refreshTimer = undefined;
        this.searchInProgress = true;
        this.orderService.requestAutocomplete(this.types, this.term).subscribe(function (resp) {
            _this.searchInProgress = false;
            if (_this.searchRequired) {
                _this.searchRequired = false;
                _this.doSearch();
            }
            else if (resp.length) {
                _this.renderList(resp);
            }
        });
    };
    Autocomplete.prototype.renderList = function (resp) {
        var _this = this;
        if (!this.listComponent) {
            var componentFactory = this.compiler.resolveComponentFactory(index_2.AutocompleteList);
            this.listComponent = this.viewRef.createComponent(componentFactory);
            var offsetTop = this.viewRef.element.nativeElement.offsetTop + this.viewRef.element.nativeElement.offsetHeight;
            var offsetLeft = this.viewRef.element.nativeElement.offsetLeft;
            this.listComponent.instance.styleTop = offsetTop;
            this.listComponent.instance.styleLeft = offsetLeft;
            this.listComponent.instance.selectedSource.subscribe(function (item) {
                _this.selected.emit(item.value);
                _this.removeList();
                setTimeout(function () {
                    _this.viewRef.element.nativeElement.blur();
                }, 50);
            });
        }
        this.listComponent.instance.list = resp;
    };
    Autocomplete.prototype.removeList = function () {
        this.refreshTimer = undefined;
        this.searchInProgress = false;
        this.searchRequired = false;
        if (this.listComponent) {
            this.listComponent.destroy();
            this.listComponent = undefined;
        }
    };
    __decorate([
        core_1.Input('autocomplete'),
        __metadata("design:type", Array)
    ], Autocomplete.prototype, "types", void 0);
    __decorate([
        core_1.Output('selectedAutocomplete'),
        __metadata("design:type", Object)
    ], Autocomplete.prototype, "selected", void 0);
    Autocomplete = __decorate([
        core_1.Directive({
            selector: '[autocomplete]',
            host: {
                '(keydown)': 'onKeyDown($event)',
                '(blur)': 'onBlur($event)'
            }
        }),
        __metadata("design:paramtypes", [index_1.OrderService,
            core_1.ViewContainerRef,
            core_1.ComponentFactoryResolver])
    ], Autocomplete);
    return Autocomplete;
}());
exports.Autocomplete = Autocomplete;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFpSTtBQUVqSSwyQ0FBaUQ7QUFDakQscUNBQStDO0FBQy9DLHlDQUE4QztBQVM5QztJQWFFLHNCQUNVLFlBQTBCLEVBQzFCLE9BQXlCLEVBQ3pCLFFBQWtDO1FBRmxDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBYlosYUFBUSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBR3RELGlCQUFZLEdBQVEsU0FBUyxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQW1DLFNBQVMsQ0FBQztJQU8vRCxDQUFDO0lBR0osZ0NBQVMsR0FBVCxVQUFVLENBQUM7UUFBWCxpQkFnQ0M7UUEvQkMsRUFBRSxDQUFDLENBQUMsbUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsS0FBSyxXQUFXO3dCQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2YsS0FBSyxTQUFTO3dCQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJ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QUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzVDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNULENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFMUMsQ0FBQztJQUVPLGlDQUFVLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBeElzQjtRQUF0QixZQUFLLENBQUMsY0FBYyxDQUFDOzsrQ0FBaUI7SUFDUDtRQUEvQixhQUFNLENBQUMsc0JBQXNCLENBQUM7O2tEQUErQjtJQUhuRCxZQUFZO1FBUHhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCO1NBQ0YsQ0FBQzt5Q0Fld0Isb0JBQVk7WUFDakIsdUJBQWdCO1lBQ2YsK0JBQXdCO09BaEJqQyxZQUFZLENBMkl4QjtJQUFELG1CQUFDO0NBM0lELEFBMklDLElBQUE7QUEzSVksb0NBQVkiLCJmaWxlIjoiZGlyZWN0aXZlcy9hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q29udGFpbmVyUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmRleCc7XHJcbmltcG9ydCB7IEF1dG9jb21wbGV0ZUxpc3QgfSBmcm9tICcuLi91aS9pbmRleCc7XHJcbmltcG9ydCB7IFNUQVRJQ19EQVRBIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2F1dG9jb21wbGV0ZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhibHVyKSc6ICdvbkJsdXIoJGV2ZW50KSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGUge1xyXG5cclxuICBASW5wdXQoJ2F1dG9jb21wbGV0ZScpIHR5cGVzOiBzdHJpbmdbXTtcclxuICBAT3V0cHV0KCdzZWxlY3RlZEF1dG9jb21wbGV0ZScpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIHRlcm06IHN0cmluZztcclxuICBwcml2YXRlIHJlZnJlc2hUaW1lcjogYW55ID0gdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgc2VhcmNoUmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIHNlYXJjaEluUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIGlzQmx1cnJlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHJpdmF0ZSBsaXN0Q29tcG9uZW50OiBDb21wb25lbnRSZWY8QXV0b2NvbXBsZXRlTGlzdD4gPSB1bmRlZmluZWQ7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgb3JkZXJTZXJ2aWNlOiBPcmRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcml2YXRlIGNvbXBpbGVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICApIHt9XHJcblxyXG5cclxuICBvbktleURvd24oZSkge1xyXG4gICAgaWYgKFNUQVRJQ19EQVRBLmZpZWxkc1RvQXV0b2NvbXBsZXRlLmluZGV4T2YodGhpcy50eXBlc1sxXSkgPiAtMSkge1xyXG5cclxuICAgICAgaWYgKHRoaXMubGlzdENvbXBvbmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZS5jb2RlKSB7XHJcbiAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nIDpcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29tcG9uZW50Lmluc3RhbmNlLmZvY3VzTW92ZWQubmV4dCgnbmV4dCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBjYXNlICdBcnJvd1VwJyA6XHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvbXBvbmVudC5pbnN0YW5jZS5mb2N1c01vdmVkLm5leHQoJ3ByZXYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgY2FzZSAnRW50ZXInIDpcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdGVkU3RyZWFtLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgY2FzZSAnTnVtcGFkRW50ZXInIDpcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdGVkU3RyZWFtLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBjYXNlICdUYWInIDpcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdGVkU3RyZWFtLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBjYXNlICdFc2NhcGUnIDpcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoU1RBVElDX0RBVEEua2V5Y29kZXNOb3RUb0F1dG9jb21wbGV0ZS5pbmRleE9mKGUud2hpY2gpID09PSAtMSApIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25LZXlVcChlKSwgMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgb25LZXlVcChlKSB7XHJcbiAgICB0aGlzLmlzQmx1cnJlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy50ZXJtID0gZS50YXJnZXQuaW5uZXJUZXh0O1xyXG4gICAgaWYgKHRoaXMudGVybSAmJiAhdGhpcy5yZWZyZXNoVGltZXIpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoVGltZXIgPSBzZXRUaW1lb3V0KFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hJblByb2dyZXNzICYmIHRoaXMudGVybSAmJiAhdGhpcy5pc0JsdXJyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kb1NlYXJjaCgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICA4MDBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5saXN0Q29tcG9uZW50ICYmICF0aGlzLnRlcm0pIHtcclxuICAgICAgdGhpcy5yZW1vdmVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5pc0JsdXJyZWQgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVtb3ZlTGlzdCgpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZG9TZWFyY2goKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hUaW1lciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuc2VhcmNoSW5Qcm9ncmVzcyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vcmRlclNlcnZpY2UucmVxdWVzdEF1dG9jb21wbGV0ZSh0aGlzLnR5cGVzLCB0aGlzLnRlcm0pLnN1YnNjcmliZShcclxuICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVxdWlyZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2VhcmNoUmVxdWlyZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZG9TZWFyY2goKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3AubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlckxpc3QocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyTGlzdChyZXNwKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3RDb21wb25lbnQpIHtcclxuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBpbGVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEF1dG9jb21wbGV0ZUxpc3QpO1xyXG4gICAgICB0aGlzLmxpc3RDb21wb25lbnQgPSB0aGlzLnZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgbGV0IG9mZnNldFRvcCA9IHRoaXMudmlld1JlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wICsgdGhpcy52aWV3UmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIGxldCBvZmZzZXRMZWZ0ID0gdGhpcy52aWV3UmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xyXG5cclxuICAgICAgdGhpcy5saXN0Q29tcG9uZW50Lmluc3RhbmNlLnN0eWxlVG9wID0gb2Zmc2V0VG9wO1xyXG4gICAgICB0aGlzLmxpc3RDb21wb25lbnQuaW5zdGFuY2Uuc3R5bGVMZWZ0ID0gb2Zmc2V0TGVmdDtcclxuXHJcblxyXG4gICAgICB0aGlzLmxpc3RDb21wb25lbnQuaW5zdGFuY2Uuc2VsZWN0ZWRTb3VyY2Uuc3Vic2NyaWJlKFxyXG4gICAgICAgIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KGl0ZW0udmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0KCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWV3UmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdENvbXBvbmVudC5pbnN0YW5jZS5saXN0ID0gcmVzcDtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZUxpc3QoKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hUaW1lciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuc2VhcmNoSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWFyY2hSZXF1aXJlZCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMubGlzdENvbXBvbmVudCkge1xyXG4gICAgICB0aGlzLmxpc3RDb21wb25lbnQuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLmxpc3RDb21wb25lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==

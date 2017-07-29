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
var models_1 = require("../models");
var Autocomplete = (function () {
    function Autocomplete(orderService, viewRef, compiler) {
        this.orderService = orderService;
        this.viewRef = viewRef;
        this.compiler = compiler;
        this.selected = new core_1.EventEmitter();
        this.fieldsToAutocomplete = models_1.StaticDATA.autocompleteBlocks;
        this.refreshTimer = undefined;
        this.searchRequired = false;
        this.searchInProgress = false;
        this.isBlurred = true;
        this.listComponent = undefined;
    }
    Autocomplete.prototype.onKeyDown = function (e) {
        var _this = this;
        if (this.fieldsToAutocomplete.indexOf(this.types[1]) > -1) {
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
                        return true;
                    case 'NumpadEnter':
                        this.listComponent.instance.selectedStream.next();
                        return false;
                    case 'Tab':
                        this.listComponent.instance.selectedStream.next();
                        return true;
                    case 'Escape':
                        this.removeList();
                        return false;
                }
            }
            if (models_1.StaticDATA.keycodesNotToAutocomplete.indexOf(e.which) === -1) {
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
    Autocomplete.prototype.onBlur = function (e) {
        this.isBlurred = true;
        this.removeList();
    };
    Autocomplete.prototype.doSearch = function () {
        var _this = this;
        this.refreshTimer = undefined;
        this.searchInProgress = true;
        this.orderService.autocomplete(this.types, this.term).subscribe(function (resp) {
            _this.searchInProgress = false;
            if (_this.searchRequired) {
                _this.searchRequired = false;
                _this.doSearch();
            }
            else {
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
    return Autocomplete;
}());
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
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=autocomplete.js.map
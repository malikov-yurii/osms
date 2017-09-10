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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Pagination = /** @class */ (function () {
    function Pagination() {
        this.totalItems = 0;
        this.pageLength = 10;
        this.currentParentPage = 1;
        this.currentPageStream = new BehaviorSubject_1.BehaviorSubject(1);
        this.pagesToDisplay = 3;
        this.dataChanged = new core_1.EventEmitter();
        this.lengthChanged = new core_1.EventEmitter();
    }
    Pagination.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageStream.subscribe(function (page) {
            _this.currentPageNumber = page;
            _this.setPages();
        });
    };
    Pagination.prototype.ngOnChanges = function () {
        this.lastPage = Math.ceil(this.totalItems / this.pageLength);
        this.setPages();
        this.currentPageStream.next(this.currentParentPage);
    };
    Pagination.prototype.selectPage = function (page) {
        if (page > 0) {
            this.currentPageStream.next(page);
            this.dataChanged.emit({ page: page, length: this.pageLength });
        }
    };
    Pagination.prototype.changeLength = function (length) {
        this.dataChanged.emit({ page: 1, length: +length });
    };
    Pagination.prototype.getPrevPage = function () {
        if (this.currentPageNumber > 1) {
            return --this.currentPageNumber;
        }
    };
    Pagination.prototype.getNextPage = function () {
        if (this.currentPageNumber < this.lastPage) {
            return ++this.currentPageNumber;
        }
    };
    Pagination.prototype.getLastPage = function () {
        return this.lastPage;
    };
    Pagination.prototype.setPages = function () {
        var start = 2;
        var current = this.currentPageNumber;
        var ptd = this.pagesToDisplay;
        var end = ptd;
        if (current <= ptd + 1) {
            end = 4;
        }
        if (current > ptd + 1) {
            start = current - 1;
            if (current >= this.lastPage - ptd) {
                start = this.lastPage - ptd - 1;
                end = 4;
            }
        }
        if (this.lastPage <= ptd + 4) {
            start = 2;
            end = ptd + 2;
            if (this.lastPage <= ptd + 2) {
                end = this.lastPage - 2;
            }
        }
        this.pages = Array.from(new Array(Math.max(0, end)), function (v, i) { return i + start; });
    };
    Pagination.prototype.isPrevSpreadShown = function () {
        return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber > this.pagesToDisplay + 1;
    };
    Pagination.prototype.isNextSpreadShown = function () {
        return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber < this.lastPage - this.pagesToDisplay;
    };
    __decorate([
        core_1.Input('total'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input('length'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "pageLength", void 0);
    __decorate([
        core_1.Input('current'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "currentParentPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "dataChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "lengthChanged", void 0);
    Pagination = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pagination',
            templateUrl: 'pagination.html',
            styleUrls: ['./pagination.css']
        })
    ], Pagination);
    return Pagination;
}());
exports.Pagination = Pagination;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL3BhZ2luYXRpb24vcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwRjtBQUMxRix3REFBdUQ7QUFRdkQ7SUFOQTtRQU9rQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDdkIsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBRXhDLHNCQUFpQixHQUFHLElBQUksaUNBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUduRCxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUN6QixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBa0MsQ0FBQztRQUNqRSxrQkFBYSxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO0lBb0Z2RCxDQUFDO0lBakZDLDZCQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ25DLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELCtCQUFVLEdBQVYsVUFBVyxJQUFZO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7SUFDSCxDQUFDO0lBRUQsaUNBQVksR0FBWixVQUFhLE1BQU07UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUNFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzlCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFLLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUVwQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDVixHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUVkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxLQUFLLEVBQVQsQ0FBUyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELHNDQUFpQixHQUFqQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsc0NBQWlCLEdBQWpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNqSCxDQUFDO0lBekZlO1FBQWYsWUFBSyxDQUFDLE9BQU8sQ0FBQzs7a0RBQXdCO0lBQ3RCO1FBQWhCLFlBQUssQ0FBQyxRQUFRLENBQUM7O2tEQUF5QjtJQUN2QjtRQUFqQixZQUFLLENBQUMsU0FBUyxDQUFDOzt5REFBK0I7SUFNdEM7UUFBVCxhQUFNLEVBQUU7O21EQUFrRTtJQUNqRTtRQUFULGFBQU0sRUFBRTs7cURBQTRDO0lBVjFDLFVBQVU7UUFOdEIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2hDLENBQUM7T0FDVyxVQUFVLENBOEZ0QjtJQUFELGlCQUFDO0NBOUZELEFBOEZDLElBQUE7QUE5RlksZ0NBQVUiLCJmaWxlIjoidWkvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3BhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2luYXRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhZ2luYXRpb24uY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCd0b3RhbCcpIHRvdGFsSXRlbXM6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgnbGVuZ3RoJykgcGFnZUxlbmd0aDogbnVtYmVyID0gMTA7XG4gIEBJbnB1dCgnY3VycmVudCcpIGN1cnJlbnRQYXJlbnRQYWdlOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGN1cnJlbnRQYWdlTnVtYmVyOiBudW1iZXI7XG4gIHByaXZhdGUgY3VycmVudFBhZ2VTdHJlYW0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMSk7XG4gIHByaXZhdGUgbGFzdFBhZ2U6IG51bWJlcjtcbiAgcHJpdmF0ZSBwYWdlczogbnVtYmVyW107XG4gIHByaXZhdGUgcGFnZXNUb0Rpc3BsYXk6IG51bWJlciA9IDM7XG4gIEBPdXRwdXQoKSBkYXRhQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e3BhZ2U6IG51bWJlciwgbGVuZ3RoOiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgbGVuZ3RoQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jdXJyZW50UGFnZVN0cmVhbS5zdWJzY3JpYmUocGFnZSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlTnVtYmVyID0gcGFnZTtcbiAgICAgIHRoaXMuc2V0UGFnZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5wYWdlTGVuZ3RoKTtcbiAgICB0aGlzLnNldFBhZ2VzKCk7XG4gICAgdGhpcy5jdXJyZW50UGFnZVN0cmVhbS5uZXh0KHRoaXMuY3VycmVudFBhcmVudFBhZ2UpO1xuICB9XG5cbiAgc2VsZWN0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2VTdHJlYW0ubmV4dChwYWdlKTtcbiAgICAgIHRoaXMuZGF0YUNoYW5nZWQuZW1pdCh7cGFnZTogcGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9KTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VMZW5ndGgobGVuZ3RoKSB7XG4gICAgdGhpcy5kYXRhQ2hhbmdlZC5lbWl0KHtwYWdlOiAxLCBsZW5ndGg6ICtsZW5ndGh9KTtcbiAgfVxuXG4gIGdldFByZXZQYWdlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlTnVtYmVyID4gMSkge1xuICAgICAgcmV0dXJuIC0tdGhpcy5jdXJyZW50UGFnZU51bWJlcjtcbiAgICB9XG4gIH1cblxuICBnZXROZXh0UGFnZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZU51bWJlciA8IHRoaXMubGFzdFBhZ2UpIHtcbiAgICAgIHJldHVybiArK3RoaXMuY3VycmVudFBhZ2VOdW1iZXI7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFzdFBhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFzdFBhZ2U7XG4gIH1cblxuICBzZXRQYWdlcygpIHtcbiAgICBsZXQgc3RhcnQgPSAyO1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50UGFnZU51bWJlcjtcbiAgICBsZXQgcHRkID0gdGhpcy5wYWdlc1RvRGlzcGxheTtcbiAgICBsZXQgZW5kID0gcHRkO1xuXG4gICAgaWYgKGN1cnJlbnQgPD0gcHRkICsgMSkge1xuICAgICAgZW5kID0gNDtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCA+IHB0ZCArIDEpIHtcbiAgICAgIHN0YXJ0ID0gY3VycmVudCAtIDE7XG5cbiAgICAgIGlmIChjdXJyZW50ID49IHRoaXMubGFzdFBhZ2UgLSBwdGQpIHtcbiAgICAgICAgc3RhcnQgPSB0aGlzLmxhc3RQYWdlIC0gcHRkIC0gMTtcbiAgICAgICAgZW5kID0gNDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0UGFnZSA8PSBwdGQgKyA0KSB7XG4gICAgICBzdGFydCA9IDI7XG4gICAgICBlbmQgPSBwdGQgKyAyO1xuXG4gICAgICBpZiAodGhpcy5sYXN0UGFnZSA8PSBwdGQgKyAyKSB7XG4gICAgICAgIGVuZCA9IHRoaXMubGFzdFBhZ2UgLSAyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGFnZXMgPSBBcnJheS5mcm9tKG5ldyBBcnJheShNYXRoLm1heCgwLCBlbmQpKSwgKHYsIGkpID0+IGkgKyBzdGFydCk7XG4gIH1cblxuICBpc1ByZXZTcHJlYWRTaG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5sYXN0UGFnZSA+IHRoaXMucGFnZXNUb0Rpc3BsYXkgKyA0ICYmIHRoaXMuY3VycmVudFBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VzVG9EaXNwbGF5ICsgMTtcbiAgfVxuXG4gIGlzTmV4dFNwcmVhZFNob3duKCkge1xuICAgIHJldHVybiB0aGlzLmxhc3RQYWdlID4gdGhpcy5wYWdlc1RvRGlzcGxheSArIDQgJiYgdGhpcy5jdXJyZW50UGFnZU51bWJlciA8IHRoaXMubGFzdFBhZ2UgLSB0aGlzLnBhZ2VzVG9EaXNwbGF5O1xuICB9XG5cblxuXG59XG4iXX0=

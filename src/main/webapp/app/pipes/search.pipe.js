"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, searchQuery) {
        function _ifValueConsistQuery(value) {
            // Return true if given value isn't empty and matches search text
            if (value) {
                value += '';
                return value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
            }
        }
        function _deepSearch(item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    // At first checks in values of given object, e.g. 'firstName/totalSum'
                    // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'
                    if (_ifValueConsistQuery(item[key]) ||
                        typeof item[key] === 'object' && _deepSearch(item[key])) {
                        return true;
                    }
                }
            }
        }
        return items.length && searchQuery ? items.filter(_deepSearch) : items;
    };
    SearchPipe = __decorate([
        core_1.Pipe({ name: 'search' })
    ], SearchPipe);
    return SearchPipe;
}());
exports.SearchPipe = SearchPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcGVzL3NlYXJjaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBR3BEO0lBQUE7SUEwQkEsQ0FBQztJQXpCQyw4QkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLFdBQW1CO1FBRXZDLDhCQUE4QixLQUFLO1lBQ2pDLGlFQUFpRTtZQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQztRQUNILENBQUM7UUFDRCxxQkFBcUIsSUFBSTtZQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsdUVBQXVFO29CQUN2RSxzRkFBc0Y7b0JBQ3RGLEVBQUUsQ0FBQyxDQUNELG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ3hELENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQUMsQ0FBQztnQkFFcEIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3pFLENBQUM7SUF6QlUsVUFBVTtRQUR0QixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7T0FDVixVQUFVLENBMEJ0QjtJQUFELGlCQUFDO0NBMUJELEFBMEJDLElBQUE7QUExQlksZ0NBQVUiLCJmaWxlIjoicGlwZXMvc2VhcmNoLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7bmFtZTogJ3NlYXJjaCd9KVxyXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShpdGVtczogYW55LCBzZWFyY2hRdWVyeTogc3RyaW5nKTogYW55IHtcclxuXHJcbiAgICBmdW5jdGlvbiBfaWZWYWx1ZUNvbnNpc3RRdWVyeSh2YWx1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAvLyBSZXR1cm4gdHJ1ZSBpZiBnaXZlbiB2YWx1ZSBpc24ndCBlbXB0eSBhbmQgbWF0Y2hlcyBzZWFyY2ggdGV4dFxyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB2YWx1ZSArPSAnJztcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIF9kZWVwU2VhcmNoKGl0ZW0pIHtcclxuICAgICAgZm9yIChsZXQga2V5IGluIGl0ZW0pIHtcclxuICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAvLyBBdCBmaXJzdCBjaGVja3MgaW4gdmFsdWVzIG9mIGdpdmVuIG9iamVjdCwgZS5nLiAnZmlyc3ROYW1lL3RvdGFsU3VtJ1xyXG4gICAgICAgICAgLy8gaWYgbm8sIHRoZW4gZ29lcyByZWN1cnNpdmx5IGFuZCBjaGVja3MgaW4gbmVzdGVkIG9iamVjdC9hcnJheXMsIGUuZy4gJ29yZGVySXRlbVRvcydcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgX2lmVmFsdWVDb25zaXN0UXVlcnkoaXRlbVtrZXldKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0JyAmJiBfZGVlcFNlYXJjaChpdGVtW2tleV0pXHJcbiAgICAgICAgICApIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCAmJiBzZWFyY2hRdWVyeSA/IGl0ZW1zLmZpbHRlcihfZGVlcFNlYXJjaCkgOiBpdGVtcztcclxuICB9XHJcbn0iXX0=

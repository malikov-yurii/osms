"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchService = /** @class */ (function () {
    function SearchService() {
    }
    SearchService_1 = SearchService;
    SearchService.prototype.search = function (items, searchQuery) {
        // To enable deep search, change "_search" to "_deepSearch" in following line
        return items.length && searchQuery ? items.filter(SearchService_1._search.bind(this, searchQuery)) : items;
    };
    SearchService._ifValueConsistQuery = function (query, value) {
        // Return true if given value isn't empty and matches search text
        if (value) {
            value += '';
            return value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        }
    };
    SearchService._deepSearch = function (query, item) {
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                // At first checks in values of given object, e.g. 'firstName/phoneNumber'
                // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
                if (SearchService_1._ifValueConsistQuery(query, item[key])
                    || typeof item[key] === 'object'
                        && SearchService_1._deepSearch(query, item[key])) {
                    return true;
                }
            }
        }
    };
    SearchService._search = function (query, item) {
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                // Checks in values of given object, e.g. 'firstName/phoneNumber'
                if (SearchService_1._ifValueConsistQuery(query, item[key])) {
                    return true;
                }
            }
        }
    };
    SearchService = SearchService_1 = __decorate([
        core_1.Injectable()
    ], SearchService);
    return SearchService;
    var SearchService_1;
}());
exports.SearchService = SearchService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDO0lBQUE7SUEwQ0EsQ0FBQztzQkExQ1ksYUFBYTtJQUV4Qiw4QkFBTSxHQUFOLFVBQU8sS0FBWSxFQUFFLFdBQW1CO1FBQ3RDLDZFQUE2RTtRQUM3RSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDM0csQ0FBQztJQUVjLGtDQUFvQixHQUFuQyxVQUFvQyxLQUFLLEVBQUUsS0FBSztRQUM5QyxpRUFBaUU7UUFDakUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0gsQ0FBQztJQUVjLHlCQUFXLEdBQTFCLFVBQTJCLEtBQUssRUFBRSxJQUFJO1FBQ3BDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLDBFQUEwRTtnQkFDMUUsdUZBQXVGO2dCQUN2RixFQUFFLENBQUMsQ0FDRCxlQUFhLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt1QkFDakQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTsyQkFDN0IsZUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUMvQyxDQUFDLENBQUMsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFYyxxQkFBTyxHQUF0QixVQUF1QixLQUFLLEVBQUUsSUFBSTtRQUNoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixpRUFBaUU7Z0JBRWpFLEVBQUUsQ0FBQyxDQUFDLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUF6Q1UsYUFBYTtRQUR6QixpQkFBVSxFQUFFO09BQ0EsYUFBYSxDQTBDekI7SUFBRCxvQkFBQzs7Q0ExQ0QsQUEwQ0MsSUFBQTtBQTFDWSxzQ0FBYSIsImZpbGUiOiJzZXJ2aWNlcy9zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuXG4gIHNlYXJjaChpdGVtczogYW55W10sIHNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgLy8gVG8gZW5hYmxlIGRlZXAgc2VhcmNoLCBjaGFuZ2UgXCJfc2VhcmNoXCIgdG8gXCJfZGVlcFNlYXJjaFwiIGluIGZvbGxvd2luZyBsaW5lXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCAmJiBzZWFyY2hRdWVyeSA/IGl0ZW1zLmZpbHRlcihTZWFyY2hTZXJ2aWNlLl9zZWFyY2guYmluZCh0aGlzLCBzZWFyY2hRdWVyeSkpIDogaXRlbXM7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfaWZWYWx1ZUNvbnNpc3RRdWVyeShxdWVyeSwgdmFsdWUpOiBib29sZWFuIHtcbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiBnaXZlbiB2YWx1ZSBpc24ndCBlbXB0eSBhbmQgbWF0Y2hlcyBzZWFyY2ggdGV4dFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgKz0gJyc7XG4gICAgICByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2RlZXBTZWFyY2gocXVlcnksIGl0ZW0pIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gaXRlbSkge1xuICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAvLyBBdCBmaXJzdCBjaGVja3MgaW4gdmFsdWVzIG9mIGdpdmVuIG9iamVjdCwgZS5nLiAnZmlyc3ROYW1lL3Bob25lTnVtYmVyJ1xuICAgICAgICAvLyBpZiBubywgdGhlbiBnb2VzIHJlY3Vyc2l2bHkgYW5kIGNoZWNrcyBpbiBuZXN0ZWQgb2JqZWN0L2FycmF5cywgZS5nLiAnb3JkZXJJdGVtVG9zJy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIFNlYXJjaFNlcnZpY2UuX2lmVmFsdWVDb25zaXN0UXVlcnkocXVlcnksIGl0ZW1ba2V5XSlcbiAgICAgICAgICB8fCB0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0J1xuICAgICAgICAgICYmIFNlYXJjaFNlcnZpY2UuX2RlZXBTZWFyY2gocXVlcnksIGl0ZW1ba2V5XSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfc2VhcmNoKHF1ZXJ5LCBpdGVtKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gQ2hlY2tzIGluIHZhbHVlcyBvZiBnaXZlbiBvYmplY3QsIGUuZy4gJ2ZpcnN0TmFtZS9waG9uZU51bWJlcidcblxuICAgICAgICBpZiAoU2VhcmNoU2VydmljZS5faWZWYWx1ZUNvbnNpc3RRdWVyeShxdWVyeSwgaXRlbVtrZXldKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=

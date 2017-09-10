"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
function slideToRight() {
    return animations_1.trigger('slideToRight', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(100%)' }))
        ])
    ]);
}
exports.slideToRight = slideToRight;
function slideToLeft() {
    return animations_1.trigger('slideToLeft', [
        animations_1.state('void', animations_1.style({})),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(100%)', position: 'fixed', width: '100%' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)', position: 'fixed', width: '100%' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
exports.slideToLeft = slideToLeft;
function slideToBottom() {
    return animations_1.trigger('slideToBottom', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
exports.slideToBottom = slideToBottom;
function slideToTop() {
    return animations_1.trigger('slideToTop', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
exports.slideToTop = slideToTop;
function appear() {
    return animations_1.trigger('appear', [
        animations_1.transition(':enter', [
            animations_1.style({ opacity: 0.001, height: 1 }),
            animations_1.group([
                animations_1.animate('0.25s ease', animations_1.style({ height: '*' })),
                animations_1.animate('0.35s 0.1s ease', animations_1.style({ opacity: 1 }))
            ])
        ]),
        animations_1.transition(':leave', [
            animations_1.group([
                animations_1.animate('0.25s ease', animations_1.style({ height: 0, margin: 0 })),
                animations_1.animate('0.25s 0.1s ease', animations_1.style({ opacity: 0 }))
            ])
        ])
    ]);
}
exports.appear = appear;
function changeWidth(width) {
    if (width === void 0) { width = '300px'; }
    return animations_1.trigger('changeWidth', [
        animations_1.state('collapsed', animations_1.style({ width: '*' })),
        animations_1.state('expanded', animations_1.style({ width: width })),
        animations_1.transition('collapsed <=> expanded', animations_1.animate('.3s ease')),
    ]);
}
exports.changeWidth = changeWidth;
function fadeInOut(params) {
    var voidState = params ? params.paramsVoid : 'void';
    var anyState = params ? params.paramsAny : '*';
    return animations_1.trigger('fadeInOut', [
        animations_1.state(voidState, animations_1.style({ display: 'none', opacity: 0 })),
        animations_1.state(anyState, animations_1.style({ display: '*', opacity: 1 })),
        animations_1.transition(voidState + " <=> " + anyState, animations_1.animate('.2s ease')),
    ]);
}
exports.fadeInOut = fadeInOut;
function appearNoty() {
    return animations_1.trigger('appearNoty', [
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translate(-50%, 100%)', color: 'transparent' }),
            animations_1.group([
                animations_1.animate('275ms', animations_1.style({ transform: 'translate(-50%, 0)', easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)' })),
                animations_1.animate('275ms 100ms ease', animations_1.style({ color: '#fff' }))
            ])
        ]),
        animations_1.transition('* => destroyed', [
            animations_1.animate('250ms', animations_1.style({ transform: 'translate(-50%, 100%)', easing: 'cubic-bezier(0.4, 0.0, 1, 1)' }))
        ])
    ]);
}
exports.appearNoty = appearNoty;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL2FuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBd0Y7QUFFeEY7SUFDRSxNQUFNLENBQUMsb0JBQU8sQ0FBQyxjQUFjLEVBQUU7UUFDN0Isa0JBQUssQ0FBQyxNQUFNLEVBQUUsa0JBQUssQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUU7UUFDekQsa0JBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQUssQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUU7UUFDdEQsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBQyxDQUFDO1lBQ3ZDLG9CQUFPLENBQUMsa0JBQWtCLEVBQUUsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7U0FDbEUsQ0FBQztRQUNGLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQ25CLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztZQUNwQyxvQkFBTyxDQUFDLGtCQUFrQixFQUFFLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQ3BFLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBYkQsb0NBYUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGFBQWEsRUFBRTtRQUM1QixrQkFBSyxDQUFDLE1BQU0sRUFBRSxrQkFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFFO1FBQ3pCLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQ25CLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUM7WUFDeEUsb0JBQU8sQ0FBQyxrQkFBa0IsRUFBRSxrQkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztTQUNsRSxDQUFDO1FBQ0YsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQztZQUN0RSxvQkFBTyxDQUFDLGtCQUFrQixFQUFFLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO1NBQ3JFLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWkQsa0NBWUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGVBQWUsRUFBRTtRQUM5QixrQkFBSyxDQUFDLE1BQU0sRUFBRSxrQkFBSyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFFO1FBQ3pFLGtCQUFLLENBQUMsR0FBRyxFQUFFLGtCQUFLLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUU7UUFDdEUsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBQyxDQUFDO1lBQ3ZDLG9CQUFPLENBQUMsa0JBQWtCLEVBQUUsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7U0FDbEUsQ0FBQztRQUNGLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQ25CLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztZQUNwQyxvQkFBTyxDQUFDLGtCQUFrQixFQUFFLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQ3BFLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBYkQsc0NBYUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLFlBQVksRUFBRTtRQUMzQixrQkFBSyxDQUFDLE1BQU0sRUFBRSxrQkFBSyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFFO1FBQ3pFLGtCQUFLLENBQUMsR0FBRyxFQUFFLGtCQUFLLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUU7UUFDdEUsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDO1lBQ3RDLG9CQUFPLENBQUMsa0JBQWtCLEVBQUUsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7U0FDbEUsQ0FBQztRQUNGLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQ25CLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztZQUNwQyxvQkFBTyxDQUFDLGtCQUFrQixFQUFFLGtCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO1NBQ3JFLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBYkQsZ0NBYUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLFFBQVEsRUFBRTtRQUN2Qix1QkFBVSxDQUFDLFFBQVEsRUFBRTtZQUNuQixrQkFBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7WUFDbEMsa0JBQUssQ0FBQztnQkFDSixvQkFBTyxDQUFDLFlBQVksRUFBRSxrQkFBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7Z0JBQzNDLG9CQUFPLENBQUMsaUJBQWlCLEVBQUUsa0JBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ2hELENBQUM7U0FDSCxDQUFDO1FBQ0YsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQztnQkFDSixvQkFBTyxDQUFDLFlBQVksRUFBRSxrQkFBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDcEQsb0JBQU8sQ0FBQyxpQkFBaUIsRUFBRSxrQkFBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDaEQsQ0FBQztTQUNILENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBaEJELHdCQWdCQztBQUVELHFCQUE0QixLQUF1QjtJQUF2QixzQkFBQSxFQUFBLGVBQXVCO0lBQ2pELE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGFBQWEsRUFBRTtRQUM1QixrQkFBSyxDQUFDLFdBQVcsRUFBRSxrQkFBSyxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDdkMsa0JBQUssQ0FBQyxVQUFVLEVBQUUsa0JBQUssQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3hDLHVCQUFVLENBQUMsd0JBQXdCLEVBQUUsb0JBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMxRCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBTkQsa0NBTUM7QUFFRCxtQkFBMEIsTUFBZ0Q7SUFDeEUsSUFBSSxTQUFTLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3BELElBQUksUUFBUSxHQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUNoRCxNQUFNLENBQUMsb0JBQU8sQ0FBQyxXQUFXLEVBQUU7UUFDMUIsa0JBQUssQ0FBQyxTQUFTLEVBQUUsa0JBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDdEQsa0JBQUssQ0FBQyxRQUFRLEVBQUUsa0JBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDbEQsdUJBQVUsQ0FBSSxTQUFTLGFBQVEsUUFBVSxFQUFFLG9CQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEUsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELDhCQVFDO0FBR0Q7SUFDRSxNQUFNLENBQUMsb0JBQU8sQ0FBQyxZQUFZLEVBQUU7UUFDM0IsdUJBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsa0JBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFDLENBQUM7WUFDakUsa0JBQUssQ0FBQztnQkFDSixvQkFBTyxDQUFDLE9BQU8sRUFBRSxrQkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7Z0JBQ3BHLG9CQUFPLENBQUMsa0JBQWtCLEVBQUUsa0JBQUssQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2FBQ3BELENBQUM7U0FDSCxDQUFDO1FBQ0YsdUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQixvQkFBTyxDQUFDLE9BQU8sRUFBRSxrQkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRSw4QkFBOEIsRUFBQyxDQUFDLENBQUM7U0FDdEcsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUM7QUFiRCxnQ0FhQyIsImZpbGUiOiJ1aS9hbmltYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIGdyb3VwLCBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNsaWRlVG9SaWdodCgpIHtcclxuICByZXR1cm4gdHJpZ2dlcignc2xpZGVUb1JpZ2h0JywgW1xyXG4gICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7cG9zaXRpb246ICdmaXhlZCcsIHdpZHRoOiAnMTAwJSd9KSApLFxyXG4gICAgc3RhdGUoJyonLCBzdHlsZSh7cG9zaXRpb246ICdmaXhlZCcsIHdpZHRoOiAnMTAwJSd9KSApLFxyXG4gICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknfSksXHJcbiAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknfSkpXHJcbiAgICBdKSxcclxuICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJ30pLFxyXG4gICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknfSkpXHJcbiAgICBdKVxyXG4gIF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2xpZGVUb0xlZnQoKSB7XHJcbiAgcmV0dXJuIHRyaWdnZXIoJ3NsaWRlVG9MZWZ0JywgW1xyXG4gICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7fSkgKSxcclxuICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLCBwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJ30pLFxyXG4gICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJ30pKVxyXG4gICAgXSksXHJcbiAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsIHBvc2l0aW9uOiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnfSksXHJcbiAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknfSkpXHJcbiAgICBdKVxyXG4gIF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2xpZGVUb0JvdHRvbSgpIHtcclxuICByZXR1cm4gdHJpZ2dlcignc2xpZGVUb0JvdHRvbScsIFtcclxuICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe3Bvc2l0aW9uOiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJ30pICksXHJcbiAgICBzdGF0ZSgnKicsIHN0eWxlKHtwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9KSApLFxyXG4gICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwJSknfSksXHJcbiAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwJSknfSkpXHJcbiAgICBdKSxcclxuICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCUpJ30pLFxyXG4gICAgICBhbmltYXRlKCcwLjVzIGVhc2UtaW4tb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwJSknfSkpXHJcbiAgICBdKVxyXG4gIF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2xpZGVUb1RvcCgpIHtcclxuICByZXR1cm4gdHJpZ2dlcignc2xpZGVUb1RvcCcsIFtcclxuICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe3Bvc2l0aW9uOiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJ30pICksXHJcbiAgICBzdGF0ZSgnKicsIHN0eWxlKHtwb3NpdGlvbjogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9KSApLFxyXG4gICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAlKSd9KSxcclxuICAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLWluLW91dCcsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDAlKSd9KSlcclxuICAgIF0pLFxyXG4gICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwJSknfSksXHJcbiAgICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwJSknfSkpXHJcbiAgICBdKVxyXG4gIF0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwZWFyKCkge1xyXG4gIHJldHVybiB0cmlnZ2VyKCdhcHBlYXInLCBbXHJcbiAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLjAwMSwgaGVpZ2h0OiAxfSksXHJcbiAgICAgIGdyb3VwKFtcclxuICAgICAgICBhbmltYXRlKCcwLjI1cyBlYXNlJywgc3R5bGUoe2hlaWdodDogJyonfSkpLFxyXG4gICAgICAgIGFuaW1hdGUoJzAuMzVzIDAuMXMgZWFzZScsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgZ3JvdXAoW1xyXG4gICAgICAgIGFuaW1hdGUoJzAuMjVzIGVhc2UnLCBzdHlsZSh7aGVpZ2h0OiAwLCBtYXJnaW46IDB9KSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMC4yNXMgMC4xcyBlYXNlJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VXaWR0aCh3aWR0aDogc3RyaW5nID0gJzMwMHB4Jykge1xyXG4gIHJldHVybiB0cmlnZ2VyKCdjaGFuZ2VXaWR0aCcsIFtcclxuICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7d2lkdGg6ICcqJ30pKSxcclxuICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHt3aWR0aDogd2lkdGh9KSksXHJcbiAgICB0cmFuc2l0aW9uKCdjb2xsYXBzZWQgPD0+IGV4cGFuZGVkJywgYW5pbWF0ZSgnLjNzIGVhc2UnKSksXHJcbiAgXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWRlSW5PdXQocGFyYW1zPzoge3BhcmFtc1ZvaWQ6IHN0cmluZywgcGFyYW1zQW55OiBzdHJpbmd9KSB7XHJcbiAgbGV0IHZvaWRTdGF0ZSA9IHBhcmFtcyA/IHBhcmFtcy5wYXJhbXNWb2lkIDogJ3ZvaWQnO1xyXG4gIGxldCBhbnlTdGF0ZSAgPSBwYXJhbXMgPyBwYXJhbXMucGFyYW1zQW55IDogJyonO1xyXG4gIHJldHVybiB0cmlnZ2VyKCdmYWRlSW5PdXQnLCBbXHJcbiAgICBzdGF0ZSh2b2lkU3RhdGUsIHN0eWxlKHtkaXNwbGF5OiAnbm9uZScsIG9wYWNpdHk6IDB9KSksXHJcbiAgICBzdGF0ZShhbnlTdGF0ZSwgc3R5bGUoe2Rpc3BsYXk6ICcqJywgb3BhY2l0eTogMX0pKSxcclxuICAgIHRyYW5zaXRpb24oYCR7dm9pZFN0YXRlfSA8PT4gJHthbnlTdGF0ZX1gLCBhbmltYXRlKCcuMnMgZWFzZScpKSxcclxuICBdKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlYXJOb3R5KCkge1xyXG4gIHJldHVybiB0cmlnZ2VyKCdhcHBlYXJOb3R5JywgW1xyXG4gICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIDEwMCUpJywgY29sb3I6ICd0cmFuc3BhcmVudCd9KSxcclxuICAgICAgZ3JvdXAoW1xyXG4gICAgICAgIGFuaW1hdGUoJzI3NW1zJywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAwKScsIGVhc2luZzogJ2N1YmljLWJlemllcigwLjAsIDAuMCwgMC4yLCAxKSd9KSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMjc1bXMgMTAwbXMgZWFzZScsIHN0eWxlKHtjb2xvcjogJyNmZmYnfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyYW5zaXRpb24oJyogPT4gZGVzdHJveWVkJywgW1xyXG4gICAgICBhbmltYXRlKCcyNTBtcycsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgMTAwJSknLCBlYXNpbmc6ICdjdWJpYy1iZXppZXIoMC40LCAwLjAsIDEsIDEpJ30pKVxyXG4gICAgXSlcclxuICBdKTtcclxufVxyXG4iXX0=

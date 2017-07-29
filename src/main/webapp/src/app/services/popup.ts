import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/delay';

import { PopupComponent } from '../ui/index';

@Injectable()
export class PopupService {
  public viewContainerRef: ViewContainerRef;
  private popupComponent: ComponentRef<PopupComponent> = undefined;

  constructor(private compiler: ComponentFactoryResolver) {}

  renderPopup(header, data?: any) {
    let popupFactory = this.compiler.resolveComponentFactory(PopupComponent);
    this.popupComponent = this.viewContainerRef.createComponent(popupFactory);

    this.popupComponent.instance.destroyedStream.delay(180).subscribe(() => {
      this.popupComponent.destroy();
    });

    this.popupComponent.instance.header = header;
    if (data) {
      this.popupComponent.instance.provideWithData(data);
    }

    return this.popupComponent.instance.submittedStream;
  }

  onProvideWithFormData(data: {any}) {
    this.popupComponent.instance.provideWithFormData(data);
  }



}

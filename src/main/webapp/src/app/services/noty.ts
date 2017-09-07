import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { NotyComponent } from '../ui/index';

@Injectable()
export class NotyService {
  public viewContainerRef: ViewContainerRef;

  constructor(private compiler: ComponentFactoryResolver) {}

  renderNoty(message, isError?) {
    let notyFactory = this.compiler.resolveComponentFactory(NotyComponent);
    let notyComponent: ComponentRef<NotyComponent> = this.viewContainerRef.createComponent(notyFactory);

    notyComponent.instance.destroyedStream.subscribe(() => {
      notyComponent.destroy();
    });

    if (isError) {
      notyComponent.instance.isError = isError;
      message = JSON.parse(message.text()).detail || message;
    }
    notyComponent.instance.message = message;

  }

}

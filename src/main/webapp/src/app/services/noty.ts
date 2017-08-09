import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { NotyComponent } from '../ui/index';

@Injectable()
export class NotyService {
  public viewContainerRef: ViewContainerRef;

  constructor(private compiler: ComponentFactoryResolver) {}

  renderNoty(msg, data?: any) {
    let notyFactory = this.compiler.resolveComponentFactory(NotyComponent);
    let notyComponent: ComponentRef<NotyComponent> = this.viewContainerRef.createComponent(notyFactory);

    notyComponent.instance.destroyedStream.subscribe(() => {
      notyComponent.destroy();
    });

    notyComponent.instance.message = msg;

  }

}

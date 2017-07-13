import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { ModalComponent } from '../ui/index';

@Injectable()
export class ModalService {

  modalComponent: ComponentRef<ModalComponent> = undefined;

}

import { Component, OnInit } from '@angular/core';

import { PoshtaService } from '../../services/index';
import { slideToLeft } from '../../ui/animations';
import { Parcel } from '../../models/poshta.interface';

@Component({
  moduleId: module.id,
  templateUrl : 'poshta.component.html',
  styleUrls   : ['poshta.component.css'],
  animations  : [slideToLeft()],
  host        : {'[@slideToLeft]': ''},
})
export class PoshtaComponent implements OnInit {
  currentTab: string;
  parcels: Parcel[];

  constructor(private poshtaService: PoshtaService) {
    this.currentTab = 'list';
    this.parcels = [];
  }

  ngOnInit() {
    this.poshtaService.getCounterpartyContactPerson().subscribe(response => console.log(response));
    this.poshtaService.getCounterparties().subscribe(response => console.log(response));

    this.poshtaService.getDocumentList().subscribe(response => this.parcels = response.data);
  }


}
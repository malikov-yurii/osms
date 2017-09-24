import { Component, OnInit } from '@angular/core';
import { PoshtaService } from '../../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'poshta.html'
})
export class PoshtaComponent implements OnInit {
  info: any;

  constructor(private poshtaService: PoshtaService) {}

  ngOnInit() {
    this.poshtaService.getCounterparties().subscribe(response => this.info = response);
  }


}
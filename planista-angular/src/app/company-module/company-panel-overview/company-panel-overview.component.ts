import { Component, OnInit } from '@angular/core';
import { stateEnum } from 'src/app/models/errand';

@Component({
  selector: 'app-company-panel-overview',
  templateUrl: './company-panel-overview.component.html',
  styleUrls: ['./company-panel-overview.component.css']
})
export class CompanyPanelOverviewComponent implements OnInit {
  states = stateEnum;

  constructor() { }

  ngOnInit(): void {
  }
}
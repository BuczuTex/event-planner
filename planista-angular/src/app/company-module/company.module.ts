import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CompanyPanelOverviewComponent } from './company-panel-overview/company-panel-overview.component';
import { CompanyPanelComponent } from './company-panel/company-panel.component';
import { UserRoles } from '../models/user';
import { ErrandListComponent } from './errand-list/errand-list.component';
import { ManageErrandProposalsComponent } from './manage-errand-proposals/manage-errand-proposals.component';

export const COMPANY_ROUTES : Routes = [
  {
    path: 'overview',
    component: CompanyPanelOverviewComponent,
    data: { role: UserRoles.COMPANY_USER },
  },
  {
    path: 'errands/manage',
    component: ManageErrandProposalsComponent,
    data: { role: UserRoles.COMPANY_USER}
  }
];

@NgModule({
  declarations: [
    CompanyPanelOverviewComponent,
    CompanyPanelComponent,
    ErrandListComponent,
    ManageErrandProposalsComponent,
  ],
  imports: [
    RouterModule.forRoot(COMPANY_ROUTES, { enableTracing: true }),
    CommonModule,
    SharedModule
  ]
})
export class CompanyModule { }
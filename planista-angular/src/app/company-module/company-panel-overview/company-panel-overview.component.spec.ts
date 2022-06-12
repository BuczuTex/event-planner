import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPanelOverviewComponent } from './company-panel-overview.component';

describe('CompanyPanelOverviewComponent', () => {
  let component: CompanyPanelOverviewComponent;
  let fixture: ComponentFixture<CompanyPanelOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyPanelOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPanelOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

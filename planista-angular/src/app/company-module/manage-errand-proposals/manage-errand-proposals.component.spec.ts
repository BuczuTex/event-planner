import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageErrandProposalsComponent } from './manage-errand-proposals.component';

describe('ManageErrandProposalsComponent', () => {
  let component: ManageErrandProposalsComponent;
  let fixture: ComponentFixture<ManageErrandProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageErrandProposalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageErrandProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddOpinionComponent } from './company-add-opinion.component';

describe('CompanyAddOpinionComponent', () => {
  let component: CompanyAddOpinionComponent;
  let fixture: ComponentFixture<CompanyAddOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAddOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationSystemComponent } from './recomendation-system.component';

describe('RecommendationSystemComponent', () => {
  let component: RecommendationSystemComponent;
  let fixture: ComponentFixture<RecommendationSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

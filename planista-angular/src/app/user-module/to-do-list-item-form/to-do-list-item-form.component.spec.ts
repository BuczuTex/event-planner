import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListItemFormComponent } from './to-do-list-item-form.component';

describe('ToDoListItemFormComponent', () => {
  let component: ToDoListItemFormComponent;
  let fixture: ComponentFixture<ToDoListItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoListItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

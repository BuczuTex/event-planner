import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { stateEnum } from 'src/app/models/errand';
import { ToDoListItemService } from 'src/app/services/to-do-list-item.service';

@Component({
  selector: 'app-to-do-list-item-form',
  templateUrl: './to-do-list-item-form.component.html',
  styleUrls: ['./to-do-list-item-form.component.css']
})
export class ToDoListItemFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

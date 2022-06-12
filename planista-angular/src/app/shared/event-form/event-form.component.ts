import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import * as moment from 'moment';
import { EventService } from 'src/app/services/event.service';
import { FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  minDate = moment().add(3, "days");
  categories : Observable<string>;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() form: FormGroup;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.categories = this.eventService.getCategories();
  }
}
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-errand-form',
  templateUrl: './errand-form.component.html',
  styleUrls: ['./errand-form.component.css']
})
export class ErrandFormComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}

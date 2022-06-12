import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-register-form',
  templateUrl: './company-register-form.component.html',
  styleUrls: ['./company-register-form.component.css']
})
export class CompanyRegisterFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }
}
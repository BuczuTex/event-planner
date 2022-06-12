import { Component, forwardRef, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, ControlContainer, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  providers: [{
    provide: ControlContainer,
    useExisting: forwardRef(() => FormGroupDirective)
  }, 
  {
    provide: FormGroupDirective
  }]
})
export class AddressFormComponent implements OnInit {
  @Input() form: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}

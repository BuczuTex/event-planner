import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormVariables } from 'src/app/form-variables';
import { Event } from 'src/app/models/event';
import { Address } from 'src/app/models/address';
import { Category } from 'src/app/models/category';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  addressForm: FormGroup;

  constructor(private title: Title, private eventService: EventService, private router: Router, private snackBar: MatSnackBar,
              private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.title.setTitle("Dodaj wydarzenie");

    this.eventForm = this.fb.group(FormVariables.eventForm);
    this.addressForm = this.fb.group(FormVariables.addressForm);
  }

  onSubmit(eventData: FormGroup, addressData: FormGroup): void {
    let date = new Date(eventData.value.date).toUTCString();

    let address = new Address(addressData.value.street, addressData.value.buildingNumber, addressData.value.city, 
      addressData.value.zipCode, addressData.value.flatNumber);
    let category = new Category(eventData.value.category);
    let event = new Event(eventData.value.name, eventData.value.description, date, address, category)
    this.eventService.postEvent(event, address).subscribe({
      complete: () => {
        this.snackBar.open("Pomyślnie utworzono wydarzenie", "", {
          duration: 4000
        });

        this.eventForm.reset();
        this.addressForm.reset();

        this.router.navigate(['event-list']);
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
      }
    });
  }
}

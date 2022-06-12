import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { FormVariables } from 'src/app/form-variables';
import { Address } from 'src/app/models/address';
import { Category } from 'src/app/models/category';
import { Event } from 'src/app/models/event';
import { AddressService } from 'src/app/services/address.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventId: number;
  subscription: Subscription;

  eventInfo: Event;
  addressInfo: Address;

  eventForm: FormGroup;
  addressForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private eventService: EventService, private snackBar: MatSnackBar,
    private router: Router, private addressService: AddressService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group(FormVariables.eventForm);
    this.addressForm = this.fb.group(FormVariables.addressForm);

    this.subscription = this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('id');
    });

    this.eventService.getEvent(this.eventId).subscribe( {
      next: (event: Event) => {
        this.eventInfo = event;
        this.addressInfo = event.address;
        console.log(event);
        this.eventForm.setValue({
          name: event.name,
          description: event.description,
          date: event.date,
          category: event.category.name
        });
        this.addressForm.setValue({
          street: event.address.street,
          buildingNumber: event.address.buildingNumber,
          flatNumber: event.address.flatNumber,
          city: event.address.city,
          zipCode: event.address.zipCode
        });
    },
    error: (error: HttpResponse<any>) => {
      if(error.status === 404) {
        this.snackBar.open("Brak dostępu do strony", "", {
          duration: 4000
        });

        this.router.navigate(["/"]);
      }
    }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editEvent() {
    let date = new Date(this.eventForm.value.date).toUTCString();
    if(this.addressForm.valid && this.eventForm.valid) {
      const address = new Address(this.addressForm.value['street'], this.addressForm.value['buildingNumber'], this.addressForm.value['city'], 
      this.addressForm.value['zipCode'], this.addressForm.value['flatNumber']);
      address.id = this.addressInfo.id;

      const event = new Event(this.eventForm.value['name'], this.eventForm.value['description'], date, address, 
      new Category(this.eventForm.value['category']));
      event.id = this.eventInfo.id;
      event.userId = this.eventInfo.userId;
      
      const eventPut = this.eventService.putEvent(this.eventId, event);
      const addressPut = this.addressService.putAddress(this.addressInfo.id, address);

      forkJoin([eventPut, addressPut])
      .subscribe({
        complete: () => {
          this.snackBar.open("Zedytowano wydarzenie", "", {
            duration: 4000
          });
          this.router.navigate(['user/events']);
        },
        error: (error) => {
          this.snackBar.open("Wystąpił błąd", "", {
            duration: 4000
          });
          console.log(error)
        }
      });
    }
  }
}

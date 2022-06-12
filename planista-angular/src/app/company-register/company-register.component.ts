import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, tap, switchMap } from 'rxjs';
import { Address } from '../models/address';
import { Company } from '../models/company';
import { User, UserRoles } from '../models/user';
import { AddressService } from '../services/address.service';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormVariables } from '../form-variables';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  userId: string;
  address: Address;

  userForm: FormGroup;
  companyForm: FormGroup;
  addressForm: FormGroup;

  constructor(private auth: AuthService, private addressService: AddressService, private companyService: CompanyService, 
              private route: Router, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group(FormVariables.userForm);
    this.companyForm = this.fb.group(FormVariables.companyForm);
    this.addressForm = this.fb.group(FormVariables.addressForm);
  }

  onSubmit(): void {
    var user = new User(this.userForm.value.userName, this.userForm.value.password, this.userForm.value.firstName,
      this.userForm.value.lastName, this.userForm.value.email, UserRoles.COMPANY_USER, false, true);
    var address = new Address(this.addressForm.value.street, this.addressForm.value.buildingNumber, this.addressForm.value.city,
      this.addressForm.value.zipCode, this.addressForm.value.flatNumber);
    var company = new Company(this.companyForm.value.name, this.companyForm.value.description, this.companyForm.value.nip);

    forkJoin([this.auth.register(user), this.addressService.postAddress(address)]).pipe(tap(res => {
      company.userId = res[0]['id'];
      company.addressId = res[1].id;
    }), switchMap(res => this.companyService.postCompany(company))).subscribe({
      complete: () => {
        this.route.navigate(['/']);
        this.snackBar.open("Konto firmy zostało pomyślnie założone. Można się zalogować!", "Zamknij", {
          duration: 10000
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

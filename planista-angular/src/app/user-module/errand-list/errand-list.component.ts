import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormVariables } from 'src/app/form-variables';
import { Errand, stateEnum } from 'src/app/models/errand';
import { ErrandService } from 'src/app/services/errand.service';

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css']
})
export class ErrandListComponent implements OnInit {
  @Input() errandList: Array<Errand>;
  errandForm: FormGroup;
  states = stateEnum;

  constructor(private errandService: ErrandService, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.errandForm = this.fb.group(FormVariables.errandForm);
  }

  initForm(index: number) {
    let errand = this.errandList[index];

    this.errandForm.setValue({
      title: errand.title,
      description: errand.description
    });
  }
  saveChanges(index: number) {
    if(this.errandForm.valid) {
      let errand = new Errand(this.errandForm.value['title'], this.errandForm.value['description'], this.errandList[index].state);
      errand.companyId = this.errandList[index].companyId;
      errand.eventId = this.errandList[index].eventId;
      errand.id = this.errandList[index].id;

      this.errandService.putErrand(errand).subscribe({
        complete: () => {
          this.errandList[index] = errand;

          this.snackBar.open("Zapisano zmiany!", "", {
            duration: 4000
          });
        },
        error: (error) => {
          this.snackBar.open("Wystąpił błąd", "", {
            duration: 4000
          });
          console.log(error);
        }
      });
    }
  }
  deleteErrand(index: number) {
    let errandId = this.errandList[index].id;

    this.errandService.deleteErrand(errandId).subscribe({
      complete: () => {
        this.snackBar.open("Usunięto zadanie dla firmy", "", {
          duration: 4000
        });
        this.errandList.splice(index, 1);
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
        console.log(error);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Errand, stateEnum } from 'src/app/models/errand';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormVariables } from 'src/app/form-variables';
import { OpinionService } from 'src/app/services/opinion.service';
import { Opinion } from 'src/app/models/opinion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrandService } from 'src/app/services/errand.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-company-add-opinion',
  templateUrl: './company-add-opinion.component.html',
  styleUrls: ['./company-add-opinion.component.css']
})
export class CompanyAddOpinionComponent implements OnInit {
  companyListToRate: Array<Company>;
  errandList: Array<Errand>;

  userId = localStorage.getItem('id');
  opinionForm: FormGroup;
  
  constructor(private userService: UserService, private fb: FormBuilder, private opinionService: OpinionService, private snackBar: MatSnackBar,
              private errandService: ErrandService) { }

  ngOnInit(): void {
    this.opinionForm = this.fb.group(FormVariables.opinionForm);

    this.userService.getEventsByUserId(this.userId).subscribe(x => {
      this.companyListToRate = x.filter(y => moment(y.date).add(3, "days") >= moment(y.date) && y.errands.some(z => z.state == stateEnum.FINISHED))
                                .flatMap(y => y.companies);
      this.errandList = x.flatMap(y => y.errands);

      console.log(x);
    });
  }
  addOpinion(index: number) {
    const date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

    if(this.opinionForm.valid) {
      var opinion = new Opinion(this.opinionForm.value['contents'], date);
      var errand: Errand;

      opinion.userId = this.userId;
      opinion.companyId = this.companyListToRate[index].id;

      errand = this.errandList.find(x => x.companyId == opinion.companyId);
      errand.state = stateEnum.RATED;

      const postOpinion = this.opinionService.postOpinion(opinion);
      const putErrand = this.errandService.putErrand(errand);

      forkJoin([postOpinion, putErrand]).subscribe({
        complete: () => {
          this.snackBar.open("Dodano opinię", "", {
            duration: 4000
          });

          this.companyListToRate.splice(index, 1);
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
}

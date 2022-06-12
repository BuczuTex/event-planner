import { HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Observable, switchMap } from 'rxjs';
import { FormVariables } from 'src/app/form-variables';
import { stateEnum } from 'src/app/models/errand';
import { Event } from 'src/app/models/event';
import { ToDoListItem } from 'src/app/models/toDoListItem';
import { EventService } from 'src/app/services/event.service';
import { ToDoListItemService } from 'src/app/services/to-do-list-item.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  toDoListItems: Array<ToDoListItem>;
  event: Event;

  toDoListItemForm: FormGroup;
  eventId = 0;

  constructor(private toDoListItemService: ToDoListItemService, private eventService: EventService, private fb: FormBuilder,
    private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { 
    }

  ngOnInit() : void { 
    this.toDoListItemForm = this.fb.group(FormVariables.toDoListItemForm);
    this.toDoListItems = new Array<ToDoListItem>();

    this.route.paramMap.pipe(switchMap(x => {
      this.eventId = +x.get("id");

      return this.eventService.getEvent(+x.get('id'));
    })).subscribe({
      next: x => {
        this.event = x;

        this.toDoListItems = x.toDoListItems.sort((a, b) => a.state - b.state);
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
  addToDoItem() {
    if(this.toDoListItemForm.valid) {
      let item = new ToDoListItem(this.toDoListItemForm.value['title'], this.toDoListItemForm.value['description'], this.eventId, 
      this.event.category);

      this.toDoListItemService.postToDoListItem(item).subscribe({
        complete: () => {
          this.snackBar.open("Dodano zadanie!", "", {
            duration: 4000
          });

          this.toDoListItems = this.toDoListItems.sort((a, b) => a.state - b.state);
          this.toDoListItemForm.reset();
        },
        error: (error) => {
          this.snackBar.open("Wystąpił błąd", "", {
            duration: 4000
          });

          console.log(error);
        }, 
        next: (toDoItem) => this.toDoListItems.push(toDoItem)
      });
    }
  }
  deleteToDoItem(index: number) {
    let item = this.toDoListItems[index];

    this.toDoListItemService.deleteToDoItem(+item.id).subscribe({
      complete: () => {
        this.toDoListItems[index].state = stateEnum.DELETED;
        this.toDoListItems = this.toDoListItems.sort((a, b) => a.state - b.state);
        this.snackBar.open("Usunięto zadanie", "", {
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
  markItemAsDone(index: number) {
    let item = this.toDoListItems[index];
    item.state = stateEnum.FINISHED;

    this.toDoListItemService.putToDoItem(item).subscribe({
      complete: () => {
        this.snackBar.open("Oznaczono zadanie jako wykonane", "", {
          duration: 4000
        });
        this.toDoListItems = this.toDoListItems.sort((a, b) => a.state - b.state);
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });

        console.log(error);
      }
    })
  }
  fillForm(title: string) {
    this.toDoListItemForm.setValue({
      title: title,
      description: ""
    });
  }
}

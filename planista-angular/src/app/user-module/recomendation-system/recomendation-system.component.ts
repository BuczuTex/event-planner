import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Event } from 'src/app/models/event';
import { ToDoListItem } from 'src/app/models/toDoListItem';
import { ToDoListItemService } from 'src/app/services/to-do-list-item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommendation-system',
  templateUrl: './recomendation-system.component.html',
  styleUrls: ['./recomendation-system.component.css']
})
export class RecomendationSystemComponent implements OnInit {
  recommendedItems: Array<any>;
  filteredItems: Array<any>;

  @Input() event: Event;
  @Output() addItemInfo = new EventEmitter<any>();

  constructor(private toDoListItemService: ToDoListItemService) { }

  compare(a: ToDoListItem, b: ToDoListItem) {
    if(a.count < b.count) {
      return 1;
    }
    else if(a.count > b.count) {
      return -1;
    }
    return 0;
  }

  ngOnInit(): void {
    this.toDoListItemService.recomendToDoItems(this.event.id).subscribe(x => {
      x = x.sort(this.compare);
      x = x.filter(x => !this.event.toDoListItems.some(y => y.title === x.title));

      this.recommendedItems = x;
      this.filteredItems = x;
  });
  }

  sendItemInfoToParent(option: MatListOption) {
    let item = option.value;

    this.addItemInfo.emit(item);

    const index = this.recommendedItems.findIndex(x => x.title === item);
    this.recommendedItems.splice(index, 1);
  }

  filter(value: string) {
    this.filteredItems = this.recommendedItems.filter(x => String(x.title).toLocaleLowerCase().includes(value.toLocaleLowerCase()));
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './event-delete-dialog.component.html',
  styleUrls: ['./event-delete-dialog.component.css']
})
export class EventDeleteDialogComponent implements OnInit {
  deleteConfirmed = false;

  constructor(private dialogRef: MatDialogRef<EventDeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  onClick() {
    this.deleteConfirmed = true;

    this.dialogRef.close(this.deleteConfirmed);
  }
}

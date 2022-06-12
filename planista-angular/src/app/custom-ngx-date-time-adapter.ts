import { NgxMatDateFormats } from "@angular-material-components/datetime-picker";

export const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'DD.MM.YYYY HH:mm',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };

export class CustomNgxDateTimeAdapter {
}

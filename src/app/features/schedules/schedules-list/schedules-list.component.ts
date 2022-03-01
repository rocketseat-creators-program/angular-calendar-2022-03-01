import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { isSameDay, isSameMonth } from 'date-fns';
import { Schedule } from '../schedule';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  viewDate = new Date();
  activeDayIsOpen = false;
  view = CalendarView.Month;

  modalData!: { schedule: Schedule };

  constructor() { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeActiveDay() {
    this.activeDayIsOpen = false;
  }

  onDayClick({ date, events }: MonthViewDay) {
    if (isSameMonth(date, this.viewDate)) {
      if (events.length === 0 || (isSameDay(this.viewDate, date) && this.activeDayIsOpen)) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }

      this.viewDate = date;
    }
  }

  private loadSchedules() {

  }

}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { format, isSameDay, isSameMonth, parse, parseISO } from 'date-fns';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  view: CalendarView = CalendarView.Month;

  modalData!: { schedule: Schedule };

  constructor(
    private router: Router,
    private modal: NgbModal,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  onDayClick({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }

      this.viewDate = date;
    }
  }

  onEventClick(event: CalendarEvent) {
    this.modalData = { schedule: event.meta };
    this.modal.open(this.modalContent, { size: 'md' });
  }

  onSegmentClick(date: Date) {
    this.router.navigate(['schedules/new'], {
      queryParams: {
        date: format(date, 'yyyy-MM-dd'),
        initTime: format(date, 'HH:mm')
      }
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeActiveDay() {
    this.activeDayIsOpen = false;
  }

  private buildEventActions(schedule: Schedule) {
    const events: CalendarEventAction[] = [];

    events.push({
      label: '<i class="fa-solid fa-pencil mx-1 text-purple"></i>',
      onClick: (): void => {
        this.router.navigate(['schedules', schedule.id]);
      }
    });

    events.push({
      label: '<i class="fa-solid fa-trash-can mx-1 text-purple"></i>',
      onClick: (): void => {
        this.scheduleService.delete(schedule.id).subscribe(() => {
          this.loadSchedules();
          this.closeActiveDay();
        });
      }
    });

    return events;
  }

  private buildEvent(schedule: Schedule) {
    return {
      title: schedule.title,
      start: parse(schedule.initTime, 'HH:mm', parseISO(schedule.date)),
      end: parse(schedule.endTime, 'HH:mm', parseISO(schedule.date)),
      actions: this.buildEventActions(schedule),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      meta: schedule
    }
  }

  private loadSchedules() {
    this.scheduleService.findAll().subscribe(response => {
      this.events = [];
      response.forEach(schedule => {
        this.events.push(this.buildEvent(schedule));
      });
    });
  }

}

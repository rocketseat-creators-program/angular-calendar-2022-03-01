import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { format, isAfter, isBefore, isSameDay, isSameMonth, parse, parseISO } from 'date-fns';
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
  viewDate = new Date();
  activeDayIsOpen = false;
  view = CalendarView.Month;
  events: CalendarEvent[] = [];

  modalData!: { schedule: Schedule };

  constructor(
    private router: Router,
    private modal: NgbModal,
    private scheduleService: ScheduleService) { }

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

  onEventClick(event: CalendarEvent) {
    this.modalData = { schedule: event.meta };
    this.modal.open(this.modalContent, { size: 'md' });
  }

  onSegmentClick(date: Date) {
    if (isAfter(date, new Date())) {
      this.router.navigate(['schedules/new'], {
        queryParams: {
          date: format(date, 'yyyy-MM-dd'),
          initTime: format(date, 'HH:mm')
        }
      });
    }
  }

  onBeforeRenderWeek({ hourColumns }: CalendarWeekViewBeforeRenderEvent) {
    const todayDate = new Date();
    const hours = hourColumns.flatMap(hc => hc.hours);
    const segments = hours.flatMap(hours => hours.segments);

    segments.forEach(segment => {
      segment.cssClass = isBefore(segment.date, todayDate) ? 'cell-disabled' : 'cell-available';
    });
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
    const parsedDate = parseISO(schedule.date);
    const event: CalendarEvent = {
      title: schedule.title,
      start: parse(schedule.initTime, 'HH:mm', parsedDate),
      end: parse(schedule.endTime, 'HH:mm', parsedDate),
      cssClass: 'event-body',
      color: {
        primary: 'var(--purple)',
        secondary: 'var(--bg-purple-alpha)'
      },
      meta: schedule
    }

    if (isAfter(event.start, new Date())) {
      event.actions = this.buildEventActions(schedule);
    }

    return event;
  }

  private loadSchedules() {
    this.scheduleService.findAll().subscribe(response => {
      this.events = response.map(schedule => this.buildEvent(schedule));
    });
  }

}

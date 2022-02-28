import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView } from 'angular-calendar';
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
  view: CalendarView = CalendarView.Month;

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

  private loadSchedules() {
    this.scheduleService.findAll().subscribe(response => {

    });
  }

}

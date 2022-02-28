import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  modalData!: { schedule: Schedule };

  constructor(
    private router: Router,
    private modal: NgbModal,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  private loadSchedules() {
    this.scheduleService.findAll().subscribe(response => {

    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Expert } from '../../experts/expert';
import { ExpertService } from '../../experts/expert.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules-new',
  templateUrl: './schedules-new.component.html',
  styleUrls: ['./schedules-new.component.css']
})
export class SchedulesNewComponent implements OnInit {

  experts: Observable<Expert[]> = this.expertService.findAll();
  scheduleForm: FormGroup = this.formBuilder.group({
    title: [null, Validators.required],
    date: [null, Validators.required],
    initTime: [null, Validators.required],
    endTime: [null, Validators.required],
    description: [null],
    expertsId: [null, Validators.required]
  }, { validators: this.endTimeValidator });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private expertService: ExpertService,
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    const { date, initTime } = this.activatedRoute.snapshot.queryParams;
    if (date && initTime) {
      this.scheduleForm.patchValue({ date, initTime });
    }
  }

  onSubmit() {
    this.scheduleService.save(this.scheduleForm.value).subscribe(() => {
      this.router.navigateByUrl('/schedules');
      this.toastr.success("Event scheduled successfully!", "Information");
    });
  }

  private endTimeValidator(control: AbstractControl) {
    const initTime = parse(control.get('initTime')?.value, 'HH:mm', Date.now());
    const endTime = parse(control.get('endTime')?.value, 'HH:mm', Date.now());

    if (initTime >= endTime) {
      return {
        timeError: 'The end hour must be greater than initial hour.'
      }
    }

    return null;
  }

}

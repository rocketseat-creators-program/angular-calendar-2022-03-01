import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Expert } from '../expert';
import { ExpertService } from '../expert.service';

@Component({
  selector: 'app-experts-new',
  templateUrl: './experts-new.component.html',
  styleUrls: ['./experts-new.component.css']
})
export class ExpertsNewComponent {

  @Output('save')
  saveEvent = new EventEmitter<Expert>();

  expertForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private expertService: ExpertService
  ) { }

  onSubmit() {
    this.expertService.save(this.expertForm.value).subscribe(response => {
      this.expertForm.reset();
      this.saveEvent.emit(response);
      this.toastr.success("Expert created successfully!", "Information");
    });
  }

}

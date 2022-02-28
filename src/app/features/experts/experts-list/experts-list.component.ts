import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Expert } from '../expert';
import { ExpertService } from '../expert.service';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.css']
})
export class ExpertsListComponent implements OnInit {

  experts: Expert[] = [];

  constructor(
    private toastr: ToastrService,
    private expertService: ExpertService
  ) { }

  ngOnInit(): void {
    this.loadExperts();
  }

  onDeleteClick(id: number) {
    this.expertService.delete(id).subscribe(() => {
      this.toastr.success('Expert deleted successfully!', 'Information');
      this.loadExperts();
    });
  }

  trackById(index: number, expert: Expert): number {
    return expert.id;
  }

  loadExperts() {
    this.expertService.findAll().subscribe(response => {
      this.experts = response;
    });
  }

}

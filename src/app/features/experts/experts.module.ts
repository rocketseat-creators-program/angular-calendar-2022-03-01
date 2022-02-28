import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertsRoutingModule } from './experts-routing.module';
import { ExpertsNewComponent } from './experts-new/experts-new.component';
import { ExpertsListComponent } from './experts-list/experts-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExpertsNewComponent,
    ExpertsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpertsRoutingModule
  ]
})
export class ExpertsModule { }

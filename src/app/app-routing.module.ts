import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/experts"
  }, {
    path: 'experts',
    loadChildren: () => import('./features/experts/experts.module').then(m => m.ExpertsModule)
  }, {
    path: 'schedules',
    loadChildren: () => import('./features/schedules/schedules.module').then(m => m.SchedulesModule)
  }, {
    path: "**",
    redirectTo: "/experts"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

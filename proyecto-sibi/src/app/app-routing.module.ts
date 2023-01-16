import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VideogamesComponent } from './components/videogames/videogames.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'videogames', component: VideogamesComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './moduls/dashboard/dashboard.component';
import { PortafolioComponent } from './moduls/portafolio/portafolio.component';
import { SaldosComponent } from './moduls/saldos/saldos.component';
import { AccionesComponent } from './moduls/acciones/acciones.component';
import { MovimientosComponent } from './moduls/movimientos/movimientos.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'portafolio',
    component: PortafolioComponent,
  },
  {
    path: 'saldos',
    component: SaldosComponent,
  },
  {
    path: 'acciones',
    component: AccionesComponent,
  },
  {
    path: 'movimientos',
    component: MovimientosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelacionComponent } from './ui/components/layouts/forms/cancelacion/cancelacion.component';
import { EncuestaComponent } from './ui/components/layouts/forms/encuesta/encuesta.component';
import { NovedadComponent } from './ui/components/layouts/forms/novedad/novedad.component';
import { AccesoComponent } from './ui/components/pages/acceso/acceso.component';
import { AdministracionVehiculoProgramadorComponent } from './ui/components/pages/administracion-vehiculo-programador/administracion-vehiculo-programador.component';
import { AjusteSolicitudServiciosComponent } from './ui/components/pages/ajuste-solicitud-servicios/ajuste-solicitud-servicios.component';
import { AprobacionServicioDirectivoComponent } from './ui/components/pages/aprobacion-servicio-directivo/aprobacion-servicio-directivo.component';
import { ClaveComponent } from './ui/components/pages/clave/clave.component';
import { GestionSolicitudProgramadorComponent } from './ui/components/pages/gestion-solicitud-programador/gestion-solicitud-programador.component';
import { MenuComponent } from './ui/components/pages/menu/menu.component';
import { PagesSolicitudServicioComponent } from './ui/components/pages/pages-solicitud-servicio/pages-solicitud-servicio.component';
import { RutasDirectivasProgramadorComponent } from './ui/components/pages/rutas-directivas-programador/rutas-directivas-programador.component';
import { SeguimientoSolicitudesConductorComponent } from './ui/components/pages/seguimiento-solicitudes-conductor/seguimiento-solicitudes-conductor.component';
import { SeguimientoSolicitudesDirectivoComponent } from './ui/components/pages/seguimiento-solicitudes-directivo/seguimiento-solicitudes-directivo.component';
import { SeguimientoSolicitudesProgramadorComponent } from './ui/components/pages/seguimiento-solicitudes-programador/seguimiento-solicitudes-programador.component';
import { SeguimientoSolicitudesUsuarioComponent } from './ui/components/pages/seguimiento-solicitudes-usuario/seguimiento-solicitudes-usuario.component';
import { SeguimientoSolicitudesComponent } from './ui/components/pages/seguimiento-solicitudes/seguimiento-solicitudes.component';
import {AjusteSolicitudServicioProgramadorComponent } from './ui/components/pages/ajuste-solicitud-servicio-programador/ajuste-solicitud-servicio-programador.component';
const routes: Routes = [
  // modulo1
  { path: "", redirectTo: "Acceso", pathMatch: "full" },
  { path: "Acceso", component: AccesoComponent },
  { path: "Clave", component: ClaveComponent },
  {path: 'menu', component: MenuComponent},
  {path:'ajuste-solicitud-programador/:id/:taskId/:processid', component:AjusteSolicitudServicioProgramadorComponent},
  {path: 'seguimiento-solicitud', component: SeguimientoSolicitudesComponent},
  {path: 'ajuste-solicitud/:id/:taskId/:processid', component: AjusteSolicitudServiciosComponent},
  {path: 'solicitud-servicio', component: PagesSolicitudServicioComponent},
  // modulo2
  {path: 'seguimiento-directivos', component: SeguimientoSolicitudesDirectivoComponent},
  {path: 'aprobacion-directivos/:id/:taskId/:processid', component: AprobacionServicioDirectivoComponent},
  // modulo3
  {path: 'seguimiento-programador', component: SeguimientoSolicitudesProgramadorComponent},
  {path: 'rutas-programador', component: RutasDirectivasProgramadorComponent},
  {path: 'administracion-vehiculo', component: AdministracionVehiculoProgramadorComponent},
  {path: 'solicitud-servicio-programador', component: GestionSolicitudProgramadorComponent},
  {path: 'cancelacion', component: CancelacionComponent},
  {path: 'novedad', component: NovedadComponent},
  //modulo4 
  {path: 'seguimiento-conductor', component: SeguimientoSolicitudesConductorComponent},
  {path: 'encuesta', component: EncuestaComponent},
  //modulo5
  {path: 'seguimiento-usuario', component: SeguimientoSolicitudesUsuarioComponent},



  { path: '**', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

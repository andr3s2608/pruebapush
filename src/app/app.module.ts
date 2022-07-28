import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./ui/components/layouts/navbar/navbar.component";
import { MenuCardComponent } from "./ui/components/layouts/menu-card/menu-card.component";
import { MenuComponent } from "./ui/components/pages/menu/menu.component";
import { SeguimientoSolicitudesComponent } from "./ui/components/pages/seguimiento-solicitudes/seguimiento-solicitudes.component";
import { TabletComponent } from "./ui/components/layouts/tablet/tablet.component";
import { SolitudesRealizadasComponent } from "./ui/components/layouts/forms/solitudes-realizadas/solitudes-realizadas.component";
import { AjusteSolicitudServiciosComponent } from "./ui/components/pages/ajuste-solicitud-servicios/ajuste-solicitud-servicios.component";
import { AjusteSolitudesServiciosComponent } from "./ui/components/layouts/forms/ajuste-solitudes-servicios/ajuste-solitudes-servicios.component";
import { FuncionariosServicioComponent } from "./ui/components/layouts/forms/funcionarios-servicio/funcionarios-servicio.component";
import { SolicitudServicioComponent } from "./ui/components/layouts/forms/solicitud-servicio/solicitud-servicio.component";
import { PagesSolicitudServicioComponent } from "./ui/components/pages/pages-solicitud-servicio/pages-solicitud-servicio.component";
import { SeleccionVehiculoComponent } from "./ui/components/layouts/forms/seleccion-vehiculo/seleccion-vehiculo.component";
import { SolicitudRealizadasProgramadorComponent } from "./ui/components/layouts/forms/solicitud-realizadas-programador/solicitud-realizadas-programador.component";
import { SeguimientoSolicitudesProgramadorComponent } from "./ui/components/pages/seguimiento-solicitudes-programador/seguimiento-solicitudes-programador.component";
import { SeleccionVehiculoUsuarioComponent } from "./ui/components/layouts/forms/seleccion-vehiculo-usuario/seleccion-vehiculo-usuario.component";
import { BloquearDesbloquearVehiculoComponent } from "./ui/components/layouts/forms/bloquear-desbloquear-vehiculo/bloquear-desbloquear-vehiculo.component";
import { GestionSolicitudProgramadorComponent } from "./ui/components/pages/gestion-solicitud-programador/gestion-solicitud-programador.component";
import { GestionSolicitudServicioProgramadorComponent } from "./ui/components/layouts/forms/gestion-solicitud-servicio-programador/gestion-solicitud-servicio-programador.component";
import { BandejaTareaDirectivoComponent } from "./ui/components/layouts/forms/bandeja-tarea-directivo/bandeja-tarea-directivo.component";
import { SeguimientoSolicitudesDirectivoComponent } from "./ui/components/pages/seguimiento-solicitudes-directivo/seguimiento-solicitudes-directivo.component";
import { RutasDirectivasProgramadorComponent } from "./ui/components/pages/rutas-directivas-programador/rutas-directivas-programador.component";
import { CancelacionComponent } from "./ui/components/layouts/forms/cancelacion/cancelacion.component";
import { NovedadComponent } from "./ui/components/layouts/forms/novedad/novedad.component";
import { EncuestaComponent } from "./ui/components/layouts/forms/encuesta/encuesta.component";
import { AprobacionServicioDirectivoComponent } from "./ui/components/pages/aprobacion-servicio-directivo/aprobacion-servicio-directivo.component";
import { AdministracionVehiculoProgramadorComponent } from "./ui/components/pages/administracion-vehiculo-programador/administracion-vehiculo-programador.component";
import { AgregarNovedadComponent } from "./ui/components/layouts/forms/agregar-novedad/agregar-novedad.component";
import { SeguimientoSolicitudesConductorComponent } from "./ui/components/pages/seguimiento-solicitudes-conductor/seguimiento-solicitudes-conductor.component";
import { SeguimientoSolicitudesUsuarioComponent } from "./ui/components/pages/seguimiento-solicitudes-usuario/seguimiento-solicitudes-usuario.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccesoComponent } from "./ui/components/pages/acceso/acceso.component";
import { ClaveComponent } from "./ui/components/pages/clave/clave.component";
import { AjusteSolicitudServicioProgramadorComponent } from './ui/components/pages/ajuste-solicitud-servicio-programador/ajuste-solicitud-servicio-programador.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccesoComponent,
    ClaveComponent,
    MenuCardComponent,
    MenuComponent,
    SeguimientoSolicitudesComponent,
    TabletComponent,
    SolitudesRealizadasComponent,
    AjusteSolicitudServiciosComponent,
    AjusteSolitudesServiciosComponent,
    FuncionariosServicioComponent,
    SolicitudServicioComponent,
    PagesSolicitudServicioComponent,
    SeleccionVehiculoComponent,
    SolicitudRealizadasProgramadorComponent,
    SeguimientoSolicitudesProgramadorComponent,
    SeleccionVehiculoUsuarioComponent,
    BloquearDesbloquearVehiculoComponent,
    GestionSolicitudProgramadorComponent,
    GestionSolicitudServicioProgramadorComponent,
    BandejaTareaDirectivoComponent,
    SeguimientoSolicitudesDirectivoComponent,
    RutasDirectivasProgramadorComponent,
    CancelacionComponent,
    NovedadComponent,
    EncuestaComponent,
    AprobacionServicioDirectivoComponent,
    AdministracionVehiculoProgramadorComponent,
    AgregarNovedadComponent,
    SeguimientoSolicitudesConductorComponent,
    SeguimientoSolicitudesUsuarioComponent,
    AjusteSolicitudServicioProgramadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// URL DE AMBIENTE APIBPM
const urlEnviroment = 'http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/';
const urlEnviromentAPI = 'http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/';
// API-JBMP
const apiJbpm = urlEnviroment+'sds/bpm-api/v1/';
// API-transportabilidad
const apitransporte = urlEnviromentAPI+'sds-transportabilidad-solicitud/v1/';

export const environment = {
  production: false, 
    // Api BPM
    tarea_endPoint: `${apiJbpm}processes/`,

     // Api Transportabilidad
    transporte_endPoint: `${apitransporte}`,

    //Variables de entorno para el bpm
    usuario:'mcuestas',
    clave:'mcuestas'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

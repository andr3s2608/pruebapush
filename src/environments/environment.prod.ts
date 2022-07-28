// URL DE AMBIENTE APIBPM
const urlEnviroment = 'http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/';
const urlEnviromentAPI = 'http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/';
// API-JBMP
const apiJbpm = urlEnviroment+'sds/bpm-api/v1/';
// API-transportabilidad
const apitransporte = urlEnviromentAPI+'sds-transportabilidad-solicitud/v1/';


export const environment = {
  production: true,
    // Api BPM
    tarea_endPoint: `${apiJbpm}processes/`,
    // Api Transportabilidad
    transporte_endPoint: `${apitransporte}`,
};

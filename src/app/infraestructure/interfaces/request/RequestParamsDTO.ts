
import { OwnerUserDTO } from './OwnerUserDTO';
import { ValuesDTO } from './ValuesDTO';

export class RequestParamsDTO {
  containerId?: string;
  taskId?: any;
  taskStatus?: string;
  ownerUser?: OwnerUserDTO;
  parametros?: ValuesDTO;
  processInstance?:string;
  processInstanceId?:string;
  processId?: any;
}

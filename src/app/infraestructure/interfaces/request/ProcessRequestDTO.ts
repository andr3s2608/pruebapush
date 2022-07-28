import { ParametrosDTO } from "./ParametrosDTO";
import { UserBPMDTO } from "./UserBPMDTO";


export class ProcessRequestDTO {
  containerId?: string;
  processesId?: string;
  processInstanceId?: string;
  processInstance?: string;
  taskId?: string;
  taskStatus?: string;
  groups?: string[];
  ownerUser?: UserBPMDTO;
  assignment?: UserBPMDTO;
  parametros?: ParametrosDTO;
  signal?: string;
}

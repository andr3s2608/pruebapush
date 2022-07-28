import { InstanceDTO } from "./InstanceDTO";
import { ParametrosDTO } from "./ParametrosDTO";
import { TareaDTO } from "./TareaDTO";


export class ProcesoDTO {
  processId?: string;
  processName?: string;
  processVersion?: string;
  startDate?: BigInteger;
  initiator?: string;
  packages?: string;
  instance?: InstanceDTO;
  parametros?: ParametrosDTO;
  containerId?: string;
  taskList?: TareaDTO[];
}

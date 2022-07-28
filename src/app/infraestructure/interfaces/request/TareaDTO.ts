import {UserBPMDTO} from "./UserBPMDTO";

export class TareaDTO {
  taskId?: number;
  taskName?: string;
  taskSubject?: string;
  taskDescription?: string;
  taskStatus?: string;
  taskPriority?: number;
  taskActualOwner?: string;
  taskCreatedBy?: string;
  taskCreatedOn?: string;
  taskActivationTime?: string;
  taskExpirationTime?: string;
  taskProcDefId?: string;
  containerId?: string;
  instanceId?: string;
  ownerUser?: UserBPMDTO;
}

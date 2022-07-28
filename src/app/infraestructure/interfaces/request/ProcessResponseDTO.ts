import { ContenedorDTO } from "./ContenedorDTO";
import { ResponseDTO } from "./ResponseDTO";


export class ProcessResponseDTO {
  containers?: Array<ContenedorDTO>
  response?: ResponseDTO;
  status?: string;
  body: any;
}

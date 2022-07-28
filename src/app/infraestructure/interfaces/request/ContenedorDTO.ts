import { ProcesoDTO } from "./ProcesoDTO";
import { ReglaDTO } from "./ReglaDTO";


export class ContenedorDTO {
  containerId?: string;
  version?: string;
  status?: string;
  containerAlias?: string;
  processes?: ProcesoDTO[];
  rules?: ReglaDTO[];
}

import { DecisionDTO } from "./DecisionDTO";

export class ReglaDTO {
  ruleId?: string;
  ruleName?: string;
  ruleNamespace?: string
  context?: any;
  inputList?: any[];
  decisionList?: DecisionDTO[];
}

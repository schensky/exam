import {EventBasic, IEventBasic} from "./EventBasic";

export interface IDryOffEvent extends IEventBasic {
  destinationGroup: number | null
  destinationGroupName: number | null
  daysInPregnancy: number | null
}

export class DryOffEvent extends EventBasic implements IDryOffEvent {
  destinationGroup: number | null = null
  destinationGroupName: number | null = null
  daysInPregnancy: number | null = null

  constructor() {
    super();
  }

}

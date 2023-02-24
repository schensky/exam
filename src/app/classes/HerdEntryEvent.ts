import {EventBasic, IEventBasic} from "./EventBasic";

export interface IHerdEntryEvent extends IEventBasic {
  cowEntryStatus: string | null
  destinationGroup: number | null
  destinationGroupName: string | null
}

export class HerdEntryEvent extends EventBasic implements IHerdEntryEvent {
  cowEntryStatus: string | null = null
  destinationGroup: number | null = null
  destinationGroupName: string | null = null


  constructor() {
    super();
  }


}

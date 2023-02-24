import {EventBasic, IEventBasic} from "./EventBasic";

export interface ICalvingEvent extends IEventBasic {
  destinationGroup: number | null
  destinationGroupName: string | null
  calvingEase: string | null
  daysInPregnancy: number | null
  oldLactationNumber: number | null
  newborns: number | null
}

export class CalvingEvent extends EventBasic implements ICalvingEvent {
  destinationGroup: number | null = null
  destinationGroupName: string | null = null
  calvingEase: string | null = null
  daysInPregnancy: number | null = null
  oldLactationNumber: number | null = null
  newborns: number | null = null

  constructor() {
    super();
  }

}

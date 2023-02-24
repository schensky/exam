import {EventBasic, IEventBasic} from "./EventBasic";

export interface IDistressEvent extends IEventBasic {
  alertType: string | null
  daysInPregnancy: number | null
  duration: number | null
  endDateTime: number | null
  originalStartDateTime: number | null
}

export class DistressEvent extends EventBasic implements IDistressEvent {
  alertType: string | null = null
  daysInPregnancy: number | null = null
  duration: number | null = null
  endDateTime: number | null = null
  originalStartDateTime: number | null = null

  constructor() {
    super();
  }


}

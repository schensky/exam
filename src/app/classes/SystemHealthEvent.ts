import {EventBasic, IEventBasic} from "./EventBasic";

export interface ISystemHealthEvent extends IEventBasic {
  endDate: number | null
  healthIndex: number | null
  minValueDateTime: number | null
}

export class SystemHealthEvent extends EventBasic implements ISystemHealthEvent {
  endDate: number | null = null
  healthIndex: number | null = null
  minValueDateTime: number | null = null

  constructor() {
    super();
  }


}

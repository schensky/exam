import {EventBasic, IEventBasic} from "./EventBasic";

export interface ISystemHeatEvent extends IEventBasic {
  heatIndexPeak: number | null
}

export class SystemHeatEvent extends EventBasic implements ISystemHeatEvent {
  heatIndexPeak: number | null = null

  constructor() {
    super();
  }


}

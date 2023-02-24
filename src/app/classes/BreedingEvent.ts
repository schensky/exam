import {EventBasic, IEventBasic} from "./EventBasic";

export interface IBreedingEvent extends IEventBasic {
  sire: string | null
  breedingNumber: number | null
  isOutOfBreedingWindow: boolean | null
  interval: number | null
}

export class BreedingEvent extends EventBasic implements IBreedingEvent {
  sire: string | null = null
  breedingNumber: number | null = null
  isOutOfBreedingWindow: boolean | null = null
  interval: number | null = null

  constructor() {
    super();
  }


}

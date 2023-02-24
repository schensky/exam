import {EventBasic, IEventBasic} from "./EventBasic";

export interface IBirthEvent extends IEventBasic {
  birthDateCalculated: boolean | null
}

export class BirthEvent extends EventBasic implements IBirthEvent {
  birthDateCalculated: boolean | null = null;

  constructor() {
    super();

  }

}

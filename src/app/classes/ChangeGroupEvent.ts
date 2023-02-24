import {EventBasic, IEventBasic} from "./EventBasic";

export interface IChangeGroupEvent extends IEventBasic {
  currentGroupId: number | null
  currentGroupName: string | null
  newGroupId: number | null
  newGroupName: string | null
}

export class ChangeGroupEvent extends EventBasic implements IChangeGroupEvent {
  currentGroupId: number | null = null
  currentGroupName: string | null = null
  newGroupId: number | null = null
  newGroupName: string | null = null

  constructor() {
    super();
  }
}

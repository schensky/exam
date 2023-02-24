export interface IEventBasic {
  eventId?: number | null
  cowId: number | null
  animalId: string | null
  type: string | null
  startDateTime: number | null
  reportingDateTime: number | null
  lactationNumber: number | null
  deletable: boolean | null
  daysInLactation: number | null
  ageInDays: number | null
}

export class EventBasic implements IEventBasic {
  eventId?: number | null = null
  cowId: number | null = null
  animalId: string | null = null
  type: string | null = null
  startDateTime: number | null = null
  reportingDateTime: number | null = null
  lactationNumber: number | null = null
  deletable: boolean | null = null
  daysInLactation: number | null = null
  ageInDays: number | null = null
}

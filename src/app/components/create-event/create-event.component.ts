import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CowEvent, CowEventService, IBuildingEventStructure} from "../../services/cow-event/cow-event.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  NewEventForm: FormGroup
  currentNewEventType: string = ''
  fieldsList: string[] = []

  @Output()
  onCreate: EventEmitter<CowEvent> = new EventEmitter<CowEvent>()

  get eventStructure(): IBuildingEventStructure[] {
    return this.cowEventService.fullEventList
  }

  constructor(
    private fb: FormBuilder,
    private cowEventService: CowEventService
  ) {
    this.NewEventForm = this.fb.group({})
  }

  changeCreationForm(): void {
    if(this.currentNewEventType === '') {
      this.clear()
      return
    }

    let eventClass = this.eventStructure.find(ev => ev.type === this.currentNewEventType)?.model;
    let fields = Object.getOwnPropertyNames(new eventClass);
    let group: any = {}
    this.fieldsList = []

    for(let field of fields){
      if(field === 'eventId') continue

      group[field] = new FormControl((field === 'type' ? this.currentNewEventType : null));
      this.fieldsList.push(field)
    }

    this.NewEventForm = new FormGroup(group)
  }

  send(): void {
    if(this.NewEventForm.valid){
      this.onCreate.emit(this.NewEventForm.getRawValue());
    }
  }

  clear(): void {
    this.NewEventForm = new FormGroup({})
    this.fieldsList = []
  }
}

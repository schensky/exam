import {Component, OnDestroy, OnInit} from '@angular/core';
import {CowEvent, CowEventService} from "../../services/cow-event/cow-event.service";
import {map, Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, FormControl, AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, OnDestroy {
  total: number = 0
  commonFields: string[] = []
  EventGridForm: FormGroup

  get eventRows(): FormArray {
    return <FormArray>this.EventGridForm.get('events')
  };

  sub: Subscription = new Subscription()

  constructor(
    private cowEventService: CowEventService,
    private fb: FormBuilder
  ){
    this.EventGridForm = this.fb.group({
      metaInRow: [true],
      events: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.cowEventService.getAll()
      .pipe(map(res => {
        this.total = res.total
        return res.result
      }))
      .subscribe((res: CowEvent[]) => {
        this.buildEventGridForm(res)
      });
  }

  remove(row: number): void {
    let id = this.eventRows.at(row).get('eventId')?.value
    this.cowEventService.delete(id)
      .subscribe(() => {
        this.eventRows.removeAt(row)
        this.total--
      });
  }

  update(row: number, field: string): void {
    this.cowEventService.update(
      +this.eventRows.at(row).get('eventId')?.value ,
      {[field]: this.eventRows.at(row)?.get(field)?.value}
    )
    .subscribe((event: CowEvent) => {
      this.eventRows.removeAt(row)
      this.eventRows.insert(row, new FormGroup(this.createGroup(event)))
    });
  }

  create(data: CowEvent): void {
    this.cowEventService.create(data)
      .subscribe((event: CowEvent) => {
        this.eventRows.insert(
          0,
          new FormGroup(this.createGroup(event))
        )
        this.total++
    });
  }

  buildEventGridForm(eventList: CowEvent[]): void {
    this.commonFields = this.cowEventService.getCommonEventFields()
    this.eventRows.clear();

    for(let event of eventList){
      this.eventRows?.push(
        new FormGroup(this.createGroup(event))
      )
    }
  }

  createGroup(event: CowEvent): any {
    let group: any = {}

    Object.entries(event).forEach(([key, value]) => {
      group[key] = new FormControl(value)
    })

    return group
  }

  hasControl(control: AbstractControl, name: string): boolean {
    return (<FormGroup>control).contains(name)
  }

  getFieldControlFromRow(control: AbstractControl, name: string): FormControl {
    return (<FormGroup>control).get(name) as FormControl
  }

  getControlsNamesArray(control: AbstractControl): string[] {
    return Object.keys((<FormGroup>control).controls)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isMetaField(block: string) {
    return !this.commonFields.includes(block)
  }
}

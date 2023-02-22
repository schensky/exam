import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimalEvent, CowEventService} from "../../services/cow-event/cow-event.service";
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import {FormArray, FormBuilder, FormGroup, FormControl, AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, OnDestroy {
  limit!: number
  total!: number

  EventGridForm!: FormGroup
  tableHeader: string[] = []
  eventList: AnimalEvent[] = []

  get eventRows(): FormArray {
    return <FormArray>this.EventGridForm.get('events')
  };

  sub: Subscription = new Subscription()

  constructor(
    private cowEventService: CowEventService,
    private fb: FormBuilder
  ){
    this.EventGridForm = this.fb.group({
      events: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.init();

    this.eventRows.valueChanges.subscribe(res => {
      console.log('valueChanges res', res);
    })
  }

  init(): void {
    this.cowEventService.get()
      .pipe(map(res => {
        this.limit = res.limit
        this.total = res.total

        return res.result
      }))
      .subscribe((res: any) => {
        console.log('get res', res);
        this.eventList = res
        this.buildEventGridForm()
      });
  }

  remove(control: AbstractControl): void{
    this.cowEventService.delete((<FormGroup>control).get('eventId')?.value)
      .pipe(map(res => {
        this.limit = res.limit
        this.total = res.total

        return res.result
      }))
      .subscribe((res: any) => {
        this.eventList = res
        this.buildEventGridForm()
      });
  }

  update(id: number): void {
    const data: AnimalEvent = {
      "healthIndex": 33,
      "endDate": null,
      "minValueDateTime": 1514844000,
      "type": "systemHealth",
      "cowId": 809,
      "animalId": "871",
      "eventId": 34719,
      "deletable": false,
      "lactationNumber": 1,
      "daysInLactation": 357,
      "ageInDays": 1075,
      "startDateTime": 1514844000,
      "reportingDateTime": 1514844929
    }

    this.cowEventService.update(id, data)
      .pipe(map(res => {
        this.limit = res.limit
        this.total = res.total

        return res.result
      }))
      .subscribe((res: any) => {
      console.log('update res', res);
        this.eventList = res
        this.buildEventGridForm()
    });
  }

  create(): void {
    const data: AnimalEvent = {
      "healthIndex": 33,
      "endDate": null,
      "minValueDateTime": 1514844000,
      "type": "systemHealth",
      "cowId": 809,
      "animalId": "871",
      "deletable": false,
      "lactationNumber": 1,
      "daysInLactation": 357,
      "ageInDays": 1075,
      "startDateTime": 1514844000,
      "reportingDateTime": 1514844929
    }

    this.cowEventService.create(data)
      .pipe(map(res => {
        this.limit = res.limit
        this.total = res.total

        return res.result
      }))
      .subscribe((res: any) => {
      console.log('create res', res);
        this.eventList = res

        this.buildEventGridForm()
    });
  }

  buildEventGridForm(): void {
    this.eventRows.clear();
    this.eventList.forEach(event => {
      let group: any = {}

      Object.entries(event).forEach(([key, value]) => {
        group[key] = new FormControl(value)

        if(!this.tableHeader.includes(key)) this.tableHeader.push(key)
      })

      this.eventRows?.push(new FormGroup(group))
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  hasControl(control: AbstractControl, name: string): boolean {
    return (<FormGroup>control).contains(name)
  }
}

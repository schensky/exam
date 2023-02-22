import {Component, OnInit} from '@angular/core';
import {AnimalEvent, CowEventService} from "../../services/cow-event/cow-event.service";
import {catchError, map, throwError} from "rxjs";

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
  public limit!: number
  public total!: number

  constructor(
    private cowEventService: CowEventService
  ){ }

  ngOnInit(): void {
    this.init();
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
      });
  }

  delete(id: number){
    this.cowEventService.delete(id)
      .pipe(map(res => {
        this.limit = res.limit
        this.total = res.total

        return res.result
      }))
      .subscribe((res: any) => {
      console.log('delete res', res);
    });
  }

  update(id: number){
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
    });
  }


  create() {
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
    });
  }
}

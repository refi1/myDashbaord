import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { QueryService } from "./query.service";
import { HttpClient } from "@angular/common/http";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  myMethod$: Observable<any>;
  public myMethodSubject = new Subject<any>();
  constructor(private query: QueryService, private http: HttpClient) {}

  myMethod(data) {
    this.myMethodSubject.next(data);
  }

  gender(female, male, dynamic): Observable<any[]> {
    this.query.getCountF().subscribe(data => {
      female.push(data);
      dynamic.push(female);
    });

    this.query.getCountM().subscribe(data => {
      male.push(data);
      dynamic.push(male);
    });

    return Observable[dynamic];
  }
  severity(low, medium, high, doughnutData): Observable<any[]> {
    this.query.getLow().subscribe(data => {
      low.push(data);
      doughnutData.push(low);
    });

    this.query
      .getHight()
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        high.push(data);
        doughnutData.push(high);
      });

    this.query
      .getMedium()
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        medium.push(data);
        doughnutData.push(medium);
      });

    return Observable[doughnutData];
  }

  mosha(radarData): Observable<any[]> {
    this.query.getAge().subscribe((data: any[]) => {
      let radardata = data;
      // let radarChart=[];
      radardata.forEach(function(character) {
        radarData.push([parseInt(character.mosha)]);
      });
    });
    return Observable[radarData];
  }
  status(progress, open, done, pieData): Observable<any[]> {
    this.query.getOpen().subscribe((data: any) => {
      open.push(data);

      pieData.push(open);
    });
    this.query.getProgress().subscribe((data: any) => {
      progress.push(data);
      pieData.push(progress);
    });

    this.query.getDone().subscribe((data: any) => {
      done.push(data);

      pieData.push(done);
    });
    return Observable[pieData];
  }

  statusbar(progress, open, done, pieData): Observable<any[]> {
    this.query.getOpen().subscribe((data: any) => {
      open.push(data);

      pieData.push(open);
    });
    this.query.getProgress().subscribe((data: any) => {
      progress.push("", data);
      pieData.push(progress);
    });

    this.query.getDone().subscribe((data: any) => {
      done.push("", "", data);

      pieData.push(done);
    });
    return Observable[pieData];
  }

  severitybar(low, medium, high, doughnutData): Observable<any[]> {
    this.query.getLow().subscribe(data => {
      low.push(data);
      doughnutData.push(low);
    });
    this.query
      .getHight()
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        high.push("", data);
        doughnutData.push(high);
      });
    this.query
      .getMedium()
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        medium.push("", "", data);
        doughnutData.push(medium);
      });

    return Observable[doughnutData];
  }
  genderbar(female, male, dynamic): Observable<any[]> {
    this.query.getCountF().subscribe(data => {
      female.push(data);
      dynamic.push(female);
    });

    this.query.getCountM().subscribe(data => {
      male.push("", data);
      dynamic.push(male);
    });

    return Observable[dynamic];
  }
  moshabar(radarData): Observable<any[]> {
    this.query.getAge().subscribe((data: any[]) => {
      let radardata = data;
      radarData.push([""]);
      radardata.forEach(function(character) {
        radarData.push([parseInt(character.mosha)]);
      });
    });
    return Observable[radarData];
  }
  statusline(progress, open, done, pieData): Observable<any[]> {
    let test = [];
    this.query.getOpen().subscribe((data: any) => {
      open.push(data);

      test.push(open);
    });
    this.query.getProgress().subscribe((data: any) => {
      progress.push(data);
      test.push(progress);
    });

    this.query.getDone().subscribe((data: any) => {
      done.push(data);

      test.push(done);
    });
    pieData = [{ data: [test], label: "Status" }];
    return Observable[pieData];
  }
  fetchAge(radarChart): Observable<any[]> {
    this.query.getAge().subscribe((data: any[]) => {
      let ageData = data;
      // let radarChart=[];
      ageData.forEach(function(character) {
        radarChart.push([character.emer, character.mbimer]);
      });
    });
    return Observable[radarChart];
  }
}

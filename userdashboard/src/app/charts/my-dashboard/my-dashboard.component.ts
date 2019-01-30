import { UserService } from "../../user.service";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";
import { DashboardService } from "../dashboard.service";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer,
  OnDestroy
} from "@angular/core";
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridType,
  GridsterItem,
  GridsterItemComponentInterface,
  GridsterComponent
} from "angular-gridster2";
import { Router, ActivatedRoute } from "@angular/router";
import { DialogService } from "../dialog.service";
@Component({
  selector: "my-dashboard",
  templateUrl: "./my-dashboard.component.html",
  styleUrls: ["./my-dashboard.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MyDashboardComponent implements OnInit, OnDestroy {
  constructor(
    private myService: DialogService,
    private dialog: MatDialog,
    private authService: UserService,
    private router: Router,
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}
  dashboardId: any;
  data: any;
  chart: any;

  // per auth
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  private chartSub: Subscription;
  private authorId: String;

  //severity
  low = [];
  severityData = [];
  medium = [];
  high = [];
  // gender
  female = [];
  male = [];
  genderData = [];
  //Age
  ageData = [];
  ageLabel = [];
  //status
  open = [];
  done = [];
  progress = [];
  statusData = [];
  x: any;
  options: GridsterConfig;
  // dashboard: Array<GridsterItem> = [];
  dashboard: any = [];
  public doughnutChartData = [];

  public doughnutChartLabels = [];

  public doughnutChartType;
  static eventStart(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ) {
    console.info("eventStart", item, itemComponent, event);
  }

  static eventStop(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface,
    event: MouseEvent
  ) {
    console.info("eventStop", item, itemComponent, event);
  }

  static overlapEvent(
    source: GridsterItem,
    target: GridsterItem,
    grid: GridsterComponent
  ) {
    console.log("overlap", source, target, grid);
  }

  async ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authorId = this.userId;
    console.log(this.userId);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        console.log(this.userId);
      });
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0,
        enabled: false,
        ignoreContentClass: "gridster-item-content",
        ignoreContent: false,
        dragHandleClass: "drag-handler",
        stop: MyDashboardComponent.eventStop,
        dropOverItems: false,
        dropOverItemsCallback: MyDashboardComponent.overlapEvent
      },
      resizable: {
        enabled: true
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    await this.fetchDashboard();

    await this.myService.myMethodSubject.subscribe(async data => {
      let chartdata = data;
      this.data = chartdata.data;
      this.chart = chartdata.chart;
      await this.addlayout(this.data);
    });
    await this.myService.severity(
      this.low,
      this.medium,
      this.high,
      this.severityData
    );
    await this.myService.gender(this.female, this.male, this.genderData);
    await this.myService.status(
      this.progress,
      this.open,
      this.done,
      this.statusData
    );
    await this.myService.mosha(this.ageData);
    await this.myService.fetchAge(this.ageLabel);
  }
  async fetchDashboard() {
    let userId = this.authService.getUserId();
    this.chartSub = this.dashboardService
      .getDashboards()
      .subscribe((data: any[]) => {
        let radardata = data;
        let prove = [];
        radardata.forEach(function(test) {
          if (userId == test.authordashboard) {
            prove.push({
              id: test._id,
              author: test.authordashboard,
              cols: test.cols,
              rows: test.rows,
              x: test.x,
              y: test.y,
              data: test.data,
              chart: test.chart,
              label: test.label
            });
          }
        });

        this.dashboard = prove;
        this.authStatusSub = this.authService
          .getAuthStatusListener()
          .subscribe();
      });
  }

  // reload() {
  //   this.router
  //     .navigateByUrl("/RefrshComponent", { skipLocationChange: true })
  //     .then(() => this.router.navigate(["/dashboard"]));
  // }
  async update(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "60%";
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
    // this.dashboardId = id;
    // await this.route.params.subscribe(params => {
    //   this.dashboardId = params.id;
    await this.dashboardService.getDashboardsById(id).subscribe(res => {
      let issue;
      issue = res;
      console.log("ress  :", issue);
      this.dashboardId = issue._id;
      console.log("iddd   :", this.dashboardId);
    });
    // });
    await this.fetchDashboard();
  }
  async deleteChart(item, id: any) {
    await this.dashboardService.deleteDashboards(id).subscribe(async () => {
      this.dashboard.splice(this.dashboard.indexOf(item.id), 1);
      // setTimeout(async () => {
      //   await this.changedOptions();
      await this.fetchDashboard();
      //   }, 1000);
    });
    console.log("delete  :", this.dashboard[id]);
  }

  removeItem($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.fetchDashboard();
  }

  addlayout(data) {
    this.doughnutChartType = this.chart;
    console.log("update jasht :" + this.dashboardId);

    if (data == "severity") {
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = ["Low", "High", "Medium"];
      let test = [];
      test.push(this.severityData);
      this.doughnutChartData = test;

      this.dashboardService
        .updateDashboards(
          this.dashboardId,
          this.userId,
          this.doughnutChartData,
          this.doughnutChartType,
          this.doughnutChartLabels
        )
        .subscribe(chart => {
          console.log(`chart add ${JSON.stringify(chart)}`);
        });
      setTimeout(async () => {
        await this.changedOptions();
        await this.fetchDashboard();
      }, 100);
      // this.fetchDashboard();
    }

    if (data == "gender") {
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = ["Female", "Male"];
      let test = [];
      test.push(this.genderData);
      this.doughnutChartData = test;

      this.dashboardService
        .updateDashboards(
          this.dashboardId,
          this.userId,
          this.doughnutChartData,
          this.doughnutChartType,
          this.doughnutChartLabels
        )
        .subscribe(chart => {
          console.log(`chart add ${JSON.stringify(chart)}`);
        });
      setTimeout(async () => {
        await this.changedOptions();
        await this.fetchDashboard();
      }, 100);
      // this.fetchDashboard();
    }
    if (data == "age") {
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      let test = [];
      test.push(this.ageData);
      this.doughnutChartData = test;
      this.doughnutChartLabels = this.ageLabel;
      console.log("ageee", this.doughnutChartLabels);
      this.dashboardService
        .updateDashboards(
          this.dashboardId,
          this.userId,
          this.doughnutChartData,
          this.doughnutChartType,
          this.doughnutChartLabels
        )
        .subscribe(chart => {
          console.log(`chart add ${JSON.stringify(chart)}`);
        });
      setTimeout(async () => {
        await this.changedOptions();
        await this.fetchDashboard();
      }, 100);
      // this.fetchDashboard();
    }
    if (data == "status") {
      this.doughnutChartData = [];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = ["Open", "In Progress", "Done"];
      console.log("statuss", this.doughnutChartLabels);

      let test = [];
      test.push(this.statusData);
      this.doughnutChartData = test;
      this.dashboardService
        .updateDashboards(
          this.dashboardId,
          this.userId,
          this.doughnutChartData,
          this.doughnutChartType,
          this.doughnutChartLabels
        )
        .subscribe(chart => {
          console.log(`chart add ${JSON.stringify(chart)}`);
        });
      setTimeout(async () => {
        await this.changedOptions();
        await this.fetchDashboard();
      }, 100);
      // this.fetchDashboard();
    }
  }

  async addItem() {
    let prove = [];
    this.dashboard.push({
      authordashboard: this.authorId,
      x: 1,
      y: 1,
      cols: 1,
      rows: 1
    });

    await this.dashboardService
      .addDashboards(this.dashboard[this.dashboard.length - 1])
      .subscribe(dashboard => {
        console.log(`dashboard database ${JSON.stringify(dashboard)}`);
      });
    setTimeout(async () => {
      await this.changedOptions();
      await this.fetchDashboard();
    }, 10);
  }
  async changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  //  load($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //    this.fetchDashboard();
  // }
  ngOnDestroy() {
    this.chartSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  emptyCellClick(event: MouseEvent, item: GridsterItem) {
    console.info("empty cell click", event, item);
    this.addItem();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { DialogService } from "../dialog.service";
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent implements OnInit {
  createForm: FormGroup;
  chart;
  data;

  constructor(private fb: FormBuilder, private myService: DialogService) {}
  ngOnInit() {
    this.createForm = this.fb.group({
      chart: [null, Validators.required],
      data: [null, Validators.required]
    });
    console.log("ne dialog", this.createForm.value);
  }

  async addChart(formData: NgForm) {
    this.chart = this.createForm.controls["chart"].value;
    this.data = this.createForm.controls["data"].value;
    if (this.data == null || this.chart == null) {
      return;
    } else {
      return this.myService.myMethod(this.createForm.value);
    }
  }
}

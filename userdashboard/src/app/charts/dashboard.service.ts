import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  httpHeaders = {
    headers: new HttpHeaders({ "Allow-Control-Allow-Origin": "*" })
  };

  url = "http://localhost:4000/dashboards";
  constructor(private http: HttpClient) {}

  // lidhja me db
  getDashboards() {
    return this.http.get(`${this.url}/all`);
  }
  getDashboardsById(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  addDashboards(dashboard) {
    return this.http.post(`${this.url}/add`, dashboard);
  }

  updateDashboards(id, user, data, types, label) {
    const dashboard = {
      data: data,
      chart: types,
      label: label,
      authordashboard: user,
      x: 1,
      y: 1,
      cols: 1,
      rows: 1
    };
    return this.http.post(`${this.url}/update/${id}`, dashboard);
  }
  deleteDashboards(id) {
    return this.http.get(`${this.url}/delete/${id}`);
  }
}

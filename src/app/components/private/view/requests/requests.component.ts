import { Component, OnInit } from '@angular/core';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  data;
  constructor(private thegraph: TheGraphService) {}

  async ngOnInit() {
    const tempData = await this.thegraph.getMyRequests();
    this.data = tempData.data.medicalRecords;
    console.log(this.data);
  }
}

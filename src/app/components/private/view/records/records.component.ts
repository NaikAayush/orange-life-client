import { Component, OnInit } from '@angular/core';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  data;
  constructor(private thegraph: TheGraphService) {}

  async ngOnInit() {
    const tempData = await this.thegraph.getMyRecords();
    this.data = tempData.data.medicalRecords;
    console.log(this.data);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  data;
  type;
  constructor(
    private thegraph: TheGraphService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.type = this.route.snapshot.params.type;
    if (this.type == 'mine') {
      const tempData = await this.thegraph.getMyRecords();
      this.data = tempData.data.medicalRecords;
      console.log(this.data);
    } else {
      const tempData = await this.thegraph.getOthersRecords();
      this.data = tempData.data.medicalRecords;
      console.log(this.data);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  data;
  data1 = [];
  type;
  myAddress;
  constructor(
    private thegraph: TheGraphService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    const data = await this.auth.getCredentials();
    this.myAddress = data.address.toString().toLowerCase();

    this.type = this.route.snapshot.params.type;
    if (this.type == 'user') {
      console.log('im here');
      const id = this.route.snapshot.params.userID;
      const tempData = await this.thegraph.getRecords(id);
      this.data = tempData.data.medicalRecords;
      this.data.forEach((ele) => {
        ele = Object.assign({}, ele);
        if (ele.hasAccess.includes(this.myAddress, 0)) {
          console.log('access is there');
          ele.status = true;
        } else {
          ele.status = false;
        }
        this.data1.push(ele);
      });
      console.log(this.data1);
    } else if (this.type == 'mine') {
      console.log('mine');
      const tempData = await this.thegraph.getMyRecords();
      this.data = tempData.data.medicalRecords;
      console.log(this.data);
      this.data.forEach((ele) => {
        ele = Object.assign({}, ele);
        ele.status = true;
        this.data1.push(ele);
      });
    } else {
      const tempData = await this.thegraph.getOthersRecords();
      this.data = tempData.data.medicalRecords;
      console.log(this.data);
      this.data.forEach((ele) => {
        ele = Object.assign({}, ele);
        if (ele.hasAccess.includes(this.myAddress, 0)) {
          console.log('access is there');
          ele.status = true;
        } else {
          ele.status = false;
        }
        this.data1.push(ele);
      });
    }
  }
}

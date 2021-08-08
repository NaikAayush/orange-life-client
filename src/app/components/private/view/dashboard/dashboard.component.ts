import { Component, OnInit } from '@angular/core';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private graph: TheGraphService) {}

  ngOnInit(): void {
    this.graph.exampleQuery();
  }
}

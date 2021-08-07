import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-private-sidebar-item',
  templateUrl: './private-sidebar-item.component.html',
  styleUrls: ['./private-sidebar-item.component.css'],
})
export class PrivateSidebarItemComponent implements OnInit {
  @Input() text = '';
  @Input() data = {};
  selected = false;

  constructor() {}

  ngOnInit(): void {}
}

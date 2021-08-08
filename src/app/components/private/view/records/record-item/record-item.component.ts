import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css'],
})
export class RecordItemComponent implements OnInit {
  @Input() name: string;
  @Input() access: number;
  shortName: string;
  fileExtensions = ['.png', '.jpg', '.pdf'];
  color: string;
  colorArray = [
    'bg-pink-600',
    'bg-purple-600',
    'bg-yellow-500',
    'bg-green-500',
  ];
  fileType: string;

  constructor() {}

  ngOnInit() {
    this.access = this.access - 1;
    this.fileType = 'assets/fileIcons/' + this.name.split('.').pop() + '.svg';
    this.name = this.cleanName(this.name);
    this.shortName = this.name.slice(0, 2).toUpperCase();
    const index = this.getRandomInt(0, 4);
    this.color = this.colorArray[index];
  }

  cleanName(string: string): string {
    string = this.capitalizeFirstLetter(string);
    string = string.replace(new RegExp(this.fileExtensions.join('|')), '');
    return string;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

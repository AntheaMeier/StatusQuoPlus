import {Component, ElementRef, OnInit} from '@angular/core';
import Chart from "chart.js/auto";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.newChart();
  }

  newChart() {
    const ctx = this.elementRef.nativeElement.querySelector(`#myChart`);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Januar 2022', 'Februar 2022', 'März 2022', 'April 2022', 'Mai 2022', 'Juni 2022'],
        datasets: [
          {
            label: 'neutral',
            data: [20, 19, 18, 28, 31, 25],
            borderWidth: 1
          },
          {
            label: 'schlecht',
            data: [2, 5, 1, 10, 4, 3],
            borderWidth: 1
          },
          {
            label: 'gut',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

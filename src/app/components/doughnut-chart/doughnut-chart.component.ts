import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

 // Doughnut
 @Input() doughnutChartLabels: Label[] = [];
 @Input() doughnutChartData: MultiDataSet = [];
 public doughnutChartType: ChartType = 'doughnut';
 public doughnutChartLegend = true;
  public doughnutChartPlugins = [pluginAnnotations];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = value;
          return label;
        },
      },
    }
  };
 colorScheme = {
  domain: [
    '#FF8A80',
    '#EA80FC',
    '#8C9EFF',
    '#80D8FF'
  ]
};

 constructor() { }

 ngOnInit() {
 }
 

 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }

}

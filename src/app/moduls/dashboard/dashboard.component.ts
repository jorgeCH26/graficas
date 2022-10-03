import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexOptions,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';
import { Quejas, Solicitudes } from 'src/app/models/dashboard/dashboardModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public res: any;

  //chart line
  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  stroke: ApexStroke | any;
  chartTitle: ApexTitleSubtitle | any;
  grid: ApexGrid | any;
  xaxis: ApexXAxis | any;
  tooltipLine: ApexTooltip | any;

  //chart bar
  seriesBar: ApexAxisChartSeries = [];
  chartBar: ApexChart | any;
  dataLabelsBar: ApexDataLabels | any;
  plotOptionsBar: ApexPlotOptions | any;
  xaxisBar: ApexXAxis | any;
  chartTitleBar: ApexTitleSubtitle | any;

  public solicitudes: Solicitudes[] = [];

  public quejas: Quejas[] = [];

  constructor(private services: ApiService) {}

  ngOnInit(): void {
    this.getSolicitides();
    this.getQuejas();
  }

  getSolicitides(): void {
    const dataLine: number[] = [];
    const mesLine: string[] = [];
    this.services.getSolicitides().subscribe((res: Solicitudes) => {
      this.res = res;
      this.solicitudes = this.res;

      this.solicitudes.forEach((element) => {
        dataLine.push(element.num_solicitud);
      });

      this.solicitudes.forEach((element) => {
        mesLine.push(element.mes);
      });

      this.initLineChar(dataLine, mesLine);
    });
  }

  getQuejas(): void {
    const dataBar: number[] = [];
    const mesBar: string[] = [];
    this.services.getQuejas().subscribe((res) => {
      this.res = res;
      this.quejas = this.res;

      this.solicitudes.forEach((element) => {
        dataBar.push(element.num_solicitud);
      });

      this.solicitudes.forEach((element) => {
        mesBar.push(element.mes);
      });
      this.initBarChar(dataBar, mesBar);
    });
  }

  initLineChar(data: any, mes: any) {
    this.chartSeries = [
      {
        name: 'Solicitudes',
        data: data,
      },
    ];

    this.chartDetails = {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    };

    this.dataLabels = {
      enabled: false,
    };

    this.stroke = {
      curve: 'straight',
    };

    this.chartTitle = {
      text: 'Solicitudes por mes',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };

    this.grid = {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    };

    this.xaxis = {
      categories: mes,
    };
  }

  initBarChar(data: any, mes: any) {
    this.seriesBar = [
      {
        name: 'basic',
        data: data,
      },
    ];

    this.chartBar = {
      type: 'bar',
      height: 350,
    };

    this.plotOptionsBar = {
      bar: {
        horizontal: false,
      },
    };

    this.dataLabelsBar = {
      enabled: false,
    };

    this.xaxisBar = {
      categories: mes,
    };

    this.chartTitleBar = {
      text: 'Quejas por mes',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };
  }
}

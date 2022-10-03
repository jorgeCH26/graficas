import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';
import { IngresosRetiros, Saldos } from 'src/app/models/saldos/saldosModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css'],
})
export class SaldosComponent implements OnInit {
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
 colorsLine: string[] = [];

 //chart bar
 seriesBar: ApexAxisChartSeries = [];
 chartBar: ApexChart | any;
 dataLabelsBar: ApexDataLabels | any;
 plotOptionsBar: ApexPlotOptions | any;
 xaxisBar: ApexXAxis | any;
 tooltipBar: ApexTooltip | any;
 colorsBar: string[] = [];
 chartTitleBar: ApexTitleSubtitle | any;

 public saldos: Saldos[] = [];

 public retiroIngresos: IngresosRetiros[] = [];

  constructor(private services: ApiService) {}

  ngOnInit(): void {
  
    this.getSaldos();

    setTimeout(() => {
      this.getIngresosRetiros();
    }, 500);
   
  }

  getSaldos(): void {
    const dataPositive: number[] = [];
    const dataNegative: number[] = [];
    const label: string[] = [];
    this.services.getSaldos().subscribe((res) => {
      this.res = res;
      this.saldos = this.res;

      this.saldos.forEach((element) => {
        dataPositive.push(element.postivos);
      });

      this.saldos.forEach((element) => {
        dataNegative.push(element.negativos);
      });

      this.saldos.forEach((element) => {
        label.push(element.mes);
      });
      this.initLineChar(dataPositive, dataNegative,label);
      this.initBarChar(dataPositive, dataNegative, label);
    });
  }

  getIngresosRetiros() {
    const dataIngreso: number[] = [];
    const dataRetito: number[] = [];
    const label: string[] = [];
    this.services.getIngresosRetiros().subscribe((res) => {
      this.res = res;
      this.retiroIngresos = this.res;

      this.retiroIngresos.forEach((element) => {
        dataIngreso.push(element.ingreso);
      });

      this.retiroIngresos.forEach((element) => {
        dataRetito.push(element.retiros);
      });

      this.retiroIngresos.forEach((element) => {
        label.push(element.trimestre);
      });
      
    });
  }



  
  initLineChar(postiveData: any , negativeeData: any, labels : any) {
    this.chartSeries = [
      {
        name: 'Saldos positivos',
        data: postiveData,
      },
      {
        name: 'Saldos negativos',
        data: negativeeData,
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
      text: 'Saldos de año',
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
      categories: labels,
    };

    this.tooltipLine = {
      enabled: true,
      y: {
        formatter: function (value: number) {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          });
          return formatter.format(value);
        },
      },
    };

    this.colorsLine = ["#5FFF19" , "#F31600"];
  }

  initBarChar(ingreso: any , retiro: any  , labels : any) {
    this.seriesBar = [
      {
        name: 'Ingresos por trimestre',
        data: ingreso,
      },
      {
        name: 'Retiros por trimestre',
        data: retiro,
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
      categories: labels,
    };

    this.chartTitleBar = {
      text: 'Ingresos y retiros por trimestre',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };

    this.colorsBar = ["#5FFF19" , "#F31600"];

    this.tooltipBar = {
      enabled: true,
      y: {
        formatter: function (value: number) {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          });
          return formatter.format(value);
        },
      },
    };
  }
}

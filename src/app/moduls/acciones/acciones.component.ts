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
import { Acciones } from 'src/app/models/acciones/accionesModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css'],
})
export class AccionesComponent implements OnInit {
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

  public acciones: Acciones[] = [];

  constructor(private services: ApiService) {}

  ngOnInit(): void {
    this.getAcciones();
  }


  getAcciones(): void {
    const dataValor: number[] = [];
    const dataInversion: number[] = [];
    const label: string[] = [];
    this.services.getAcciones().subscribe((res) => {
      this.res = res;
      this.acciones = this.res;

      this.acciones.forEach((element) => {
        dataValor.push(element.valor);
      });

      this.acciones.forEach((element) => {
        dataInversion.push(element.inversion);
      });

      this.acciones.forEach((element) => {
        label.push(element.trimestre);
      });

      this.initBarChar(dataValor, label);
      this.initLineChar(dataValor, label);

    });
  }

  initLineChar(data: any, labels: any) {
    this.chartSeries = [
      {
        name: 'Valor de las acciones',
        data: data,
      },
    ];

    this.chartDetails = {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          customIcons: []
        },
        export: {
          csv: {
            filename: 'Valor Acciones',
            columnDelimiter: ',',
            headerCategory: 'Trimestre',
            headerValue: 'value',
            dateFormatter(timestamp: string | number | Date) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          }
        },
        autoSelected: 'zoom' 
      },
    };

    this.dataLabels = {
      enabled: false,
    };

    this.stroke = {
      curve: 'straight',
    };

    this.chartTitle = {
      text: 'Valor de las acciones por trimestre',
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

    this.colorsLine = ['#7600F3'];
  }

  initBarChar(data: any, labels: any) {
    this.seriesBar = [
      {
        name: 'Inversion por trimestre',
        data: data,
      },
    ];

    this.chartBar = {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          customIcons: []
        },
        export: {
          csv: {
            filename: 'Inversion Acciones',
            columnDelimiter: ',',
            headerCategory: 'Trimestre',
            headerValue: 'value',
            dateFormatter(timestamp: string | number | Date) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          }
        },
        autoSelected: 'zoom' 
      },
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
      text: 'Inversion por trimestre',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };

    this.colorsBar = ['#88A09D'];

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

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';
import { Crecimiento, Perdidas, Porcentaje } from 'src/app/models/portafolio/portafolioMofdels';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css'],
})
export class PortafolioComponent implements OnInit {
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

  //Chart dount

  series: ApexNonAxisChartSeries = [];
  chart: ApexChart | any;
  responsive: ApexResponsive[] = [];
  labels: any;
  chartTitleDount: ApexTitleSubtitle | any;

  public crecimientos: Crecimiento[] = [];
  public perdidas: Perdidas[] = [];
  public porcentaje: Porcentaje[] = [];
  selected = new FormControl(0);
  

  constructor(private services: ApiService) {}

  ngOnInit(): void {
    this.getCrecimiento();
    this.getperdidas();
  }


  getCrecimiento(): void {
    const dataLine: number[] = [];
    const label: string[] = [];
    this.services.getCrecimiento().subscribe((res) => {
      this.res = res;
      this.crecimientos = this.res;

      this.crecimientos.forEach((element) => {
        dataLine.push(element.valor);
      });

      this.crecimientos.forEach((element) => {
        label.push(element.ano);
      });
      this.initLineChar(dataLine, label);
    });
  }

  getperdidas(): void {
    const dataLine: number[] = [];
    const label: string[] = [];
    this.services.getperdidas().subscribe((res) => {
      this.res = res;
      this.perdidas = this.res;

      this.perdidas.forEach((element) => {
        dataLine.push(element.valor);
      });

      this.perdidas.forEach((element) => {
        label.push(element.ano);
      });
      this.initBarChar(dataLine, label);
    });
  }


  getPorcentaje(): void {
    const data: number[] = [];
    const label: string[] = [];
    this.services.getPorcentaje().subscribe((res) => {
      this.res = res;
      this.porcentaje = this.res;

      this.porcentaje.forEach((element) => {
        data.push(element.porcentaje);
      });

      this.porcentaje.forEach((element) => {
        label.push(element.tipo);
      });
      this.initDount(data, label);
    });
  }


  initLineChar(data: any , labels : any) {
    this.chartSeries = [
      {
        name: 'Valor por año',
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
      text: 'Crecimiento en 15 años',
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

    this.colorsLine = ["#56EFDD"];
  }

  initBarChar(data: any , labels : any) {
    this.seriesBar = [
      {
        name: 'Pedrdidas por año',
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
      categories: labels,
    };

    this.chartTitleBar = {
      text: 'Perdidas en 15 años',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };

    this.colorsBar = ["#FF2A19"];

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

  initDount(data: any , labels : any) {
    this.series = data;

    this.chart = {
      width: 400,
      type: 'pie',
    };

    this.labels = labels;

    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 340,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];

    this.chartTitleDount= {
      text: 'Porcentaje de crecimiento y perdidas',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    };
  }

  index(selected : any) {
   this.getperdidas();
   this.getPorcentaje();
  }
}

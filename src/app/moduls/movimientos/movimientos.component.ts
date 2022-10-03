import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movimientos } from 'src/app/models/movimientos/movimientosModel';
import { ApiService } from 'src/app/services/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
})
export class MovimientosComponent implements OnInit {
  public res: any;

  displayedColumns: string[] = [
    'nombre',
    'apellido_p',
    'apellido_m',
    'fecha',
    'accion',
    'valor',
  ];
  
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  public movimientos: Movimientos[] = [];
  constructor(private services: ApiService) {}

  ngOnInit(): void {
    this.getMovimentos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getMovimentos(): void {
    this.services.getMovimentos().subscribe((res) => {
      this.res = res;
      this.movimientos = this.res;
      this.dataSource = new MatTableDataSource<any>(this.res);
      this.dataSource.paginator = this.paginator;
      localStorage.setItem("lista" , JSON.stringify(this.movimientos))
      sessionStorage.setItem("lista" , JSON.stringify(this.movimientos))
    });
  }
}

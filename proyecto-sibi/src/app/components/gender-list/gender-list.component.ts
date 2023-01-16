import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { genero } from 'src/app/models/genero';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss'],
})
export class GenderListComponent implements OnInit {
  public displayedColumns: string[] = ['nombre'];
  public genders = new MatTableDataSource<genero>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private service: DbConnectorService) {}
  public getGeneros() {
    this.genders.paginator = this.paginator;
    this.service.getGenero().then((res) => {
      this.genders = new MatTableDataSource<genero>(res);
      this.genders.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    this.getGeneros();
  }
}

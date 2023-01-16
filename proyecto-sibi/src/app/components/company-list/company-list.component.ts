import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { empresa } from 'src/app/models/empresa';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  public displayedColumns: string[] = ['nombre'];
  public companies = new MatTableDataSource<empresa>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private service: DbConnectorService) {}
  public getEmpresas() {
    this.companies.paginator = this.paginator;
    this.service.getEmpresa().then((res) => {
      this.companies = new MatTableDataSource<empresa>(res);
      this.companies.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    this.getEmpresas();
  }
}

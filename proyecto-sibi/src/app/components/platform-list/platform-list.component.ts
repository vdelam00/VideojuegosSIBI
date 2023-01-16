import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { plataforma } from 'src/app/models/plataforma';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.scss'],
})
export class PlatformListComponent implements OnInit {
  public displayedColumns: string[] = ['nombre'];
  public platforms = new MatTableDataSource<plataforma>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private service: DbConnectorService) {}
  public getPlataformas() {
    this.platforms.paginator = this.paginator;
    this.service.getPlataforma().then((res) => {
      this.platforms = new MatTableDataSource<plataforma>(res);
      this.platforms.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    this.getPlataformas();
  }
}

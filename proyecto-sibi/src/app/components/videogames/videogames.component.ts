import { Component } from '@angular/core';
import { DbConnectorService } from 'src/app/services/db-connector.service';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss'],
})
export class VideogamesComponent {
  constructor(private service: DbConnectorService) {}
}

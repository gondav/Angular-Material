import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dataSource = [
    {sorszam: 1, uzletiEv: 2023, szerzodoFel: 'UBM Grain', ugyletTipus: 'Eladás'}
  ]

  datasrc = new MatTableDataSource();
  

  displayedColumns = ['sorszam', 'uzletiEv', 'szerzodoFel', 'ugyletTipus']
}

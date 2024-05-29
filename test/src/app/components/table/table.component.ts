import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/models/response.model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent {
    dataObs: any = null;

    constructor(
        private dataService: DataService,
        public dialog: MatDialog,
    ) {
        this.dataService.fetchDataFromServer();
    }

    ngOnInit() {
        this.dataObs = this.dataService.data$;
        console.log('my data', this.dataObs);
    }
}

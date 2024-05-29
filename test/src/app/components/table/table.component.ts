import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/models/response.model';
import { DataService } from 'src/app/services/data.service';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent {
    dataObs: any = null;

    indeterminate = true;

    constructor(
        private dataService: DataService,
        public dialog: MatDialog,
    ) {
        this.dataService.fetchDataFromServer();
    }

    ngOnInit() {
        this.dataObs = this.dataService.data$;
    }

    editClient(data: any, index: any): void {
        this.dialog.open(ModalWindowComponent, {
            width: '448px',
            height: '593px',
            data: {
                client: data,
                index: index,
            },
        });
    }
}

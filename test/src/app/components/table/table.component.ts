import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
    dataObs: any = null;

    selectedIndexes: number[] = [];
    isMasterIndeterminate: boolean = false;
    isMasterChecked: boolean = false;

    sortField: string = 'name';
    sortDirection: 'asc' | 'desc' = 'asc';
    filterValue: string = '';

    constructor(
        private dataService: DataService,
        public dialog: MatDialog,
    ) {
        this.dataService.fetchDataFromServer();

        this.dataObs = this.dataService.data$;

        this.dataService.itemsForRemoving$.subscribe((data) => {
            if (data !== null) {
                this.selectedIndexes = data;
                this.isMasterIndeterminate = false;
                if (data.length == 0) this.isMasterChecked = false;
            }
        });
    }

    ngOnInit() {
        this.dataObs = this.dataService.data$;
        console.log('Опять', this.dataObs);
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

    masterChange(event: any): void {
        this.isMasterChecked = event.checked;
        console.log(this.isMasterChecked);
        this.isMasterIndeterminate = false;

        if (this.isMasterChecked) {
            console.log(this.isMasterChecked);
            const allClients = this.dataService.dataSubject.getValue();
            allClients?.map((_item, index) => this.selectedIndexes.push(index));
        } else {
            this.selectedIndexes = [];
        }
        this.dataService.updateItemsForRemoving(this.selectedIndexes);
    }

    clientChange(event: any, index: number): void {
        if (event.checked && !this.selectedIndexes.includes(index)) {
            this.selectedIndexes.push(index);
        } else {
            this.selectedIndexes = this.selectedIndexes.filter(
                (i) => i !== index,
            );
        }
        this.dataService.updateItemsForRemoving(this.selectedIndexes);
        this.updateMasterCheckboxState();
    }

    updateMasterCheckboxState(): void {
        if (this.selectedIndexes.length === 0) {
            this.isMasterChecked = false;
            console.log(this.isMasterChecked);
            this.isMasterIndeterminate = false;
        } else {
            this.isMasterIndeterminate = true;
        }
    }

    applySort(field: string) {
        this.sortDirection =
            this.sortField === field && this.sortDirection === 'asc'
                ? 'desc'
                : 'asc';
        this.sortField = field;

        let filteredData = this.dataService.dataSubject
            .getValue()
            ?.sort((a: any, b: any) => {
                if (a[this.sortField] < b[this.sortField])
                    return this.sortDirection === 'asc' ? -1 : 1;
                if (a[this.sortField] > b[this.sortField])
                    return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        if (this.filterValue !== '') {
            this.applyFilter();
        } else if (filteredData) {
            this.dataService.dataSubject.next(filteredData);
            this.dataService.setDataToLocal();
        }
    }

    applyFilter() {
        let filteredData =
            this.filterValue === ''
                ? this.dataService.resetAll()
                : this.dataService.dataSubject
                      .getValue()
                      ?.filter(
                          (item) =>
                              item.name
                                  .toLocaleLowerCase()
                                  .includes(
                                      this.filterValue.toLocaleLowerCase(),
                                  ) ||
                              item.surname
                                  .toLocaleLowerCase()
                                  .includes(
                                      this.filterValue.toLocaleLowerCase(),
                                  ) ||
                              item.email
                                  .toLocaleLowerCase()
                                  .includes(
                                      this.filterValue.toLocaleLowerCase(),
                                  ) ||
                              item.phone
                                  .toLocaleLowerCase()
                                  .includes(
                                      this.filterValue.toLocaleLowerCase(),
                                  ),
                      );
        if (this.sortField && filteredData) {
            filteredData.sort((a: any, b: any) => {
                if (a[this.sortField] < b[this.sortField])
                    return this.sortDirection === 'asc' ? -1 : 1;
                if (a[this.sortField] > b[this.sortField])
                    return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }
        if (filteredData) this.dataService.dataSubject.next(filteredData);
    }
}

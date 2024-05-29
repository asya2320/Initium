import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-modal-confirm-removing',
    templateUrl: './modal-confirm-removing.component.html',
    styleUrl: './modal-confirm-removing.component.scss',
})
export class ModalConfirmRemovingComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalConfirmRemovingComponent>,
        public dataService: DataService,
    ) {}

    removeClient() {
        this.dataService.removeClients();
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

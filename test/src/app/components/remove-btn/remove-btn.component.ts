import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmRemovingComponent } from '../modal-confirm-removing/modal-confirm-removing.component';

@Component({
    selector: 'app-remove-btn',
    templateUrl: './remove-btn.component.html',
    styleUrl: './remove-btn.component.scss',
})
export class RemoveBtnComponent {
    constructor(public dialog: MatDialog) {}

    removeClients(): void {
        this.dialog.open(ModalConfirmRemovingComponent, {
            width: '448px',
            height: '300px',
        });
    }
}

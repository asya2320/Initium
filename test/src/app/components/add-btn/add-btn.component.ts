import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
    selector: 'app-add-btn',
    templateUrl: './add-btn.component.html',
    styleUrl: './add-btn.component.scss',
})
export class AddBtnComponent {
    constructor(public dialog: MatDialog) {}

    addNewData(): void {
        this.dialog.open(ModalWindowComponent, {
            width: '448px',
            height: '593px',
        });
    }
}

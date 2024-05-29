import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBtnComponent } from '../components/add-btn/add-btn.component';
import { RemoveBtnComponent } from '../components/remove-btn/remove-btn.component';
import { TableComponent } from '../components/table/table.component';
import { ClientsInfoComponent } from '../pages/clients-info/clients-info.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@NgModule({
    declarations: [
        AddBtnComponent,
        RemoveBtnComponent,
        TableComponent,
        ClientsInfoComponent,
        ModalWindowComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        HttpClientModule,
        MatCheckboxModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
    exports: [ClientsInfoComponent],
})
export class ClientModule {}

import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrl: './modal-window.component.scss',
})
export class ModalWindowComponent {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalWindowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private dataService: DataService,
    ) {
        this.form = this.formBuilder.group({
            name: [
                this.data === null ? '' : this.data.client.name,
                [Validators.required, Validators.minLength(2)],
            ],
            surname: [
                this.data === null ? '' : this.data.client.surname,
                [Validators.required, Validators.minLength(2)],
            ],
            email: [
                this.data === null ? '' : this.data.client.email,
                [Validators.required, Validators.email],
            ],
            phone: [
                this.data === null ? '' : this.data.client.phone,
                [
                    Validators.pattern(
                        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
                    ),
                ],
            ],
        });
    }

    // (+7|7|8)?:префикс номера как +7, 7 или 8 (возможно, с символом + в начале)
    // [\s-]?: пробел или дефис после префикса, но необязательно
    // (?[489][0-9]{2})?:код региона (3 цифры) в круглых скобках, если они присутствуют, начиная с цифр 4, 8 или 9
    // [\s-]?: пробел или дефис после кода региона, но необязательно
    // [0-9]{3}: первые три цифры номера телефона
    // [\s-]?: пробел или дефис после первых трех цифр, но необязательно
    // [0-9]{2}: следующие две цифры номера телефона
    // [\s-]?: пробел или дефис после следующих двух цифр, но необязательно
    // [0-9]{2}: последние две цифры номера телефона

    addClient() {
        const formValues = this.form.value;
        const newClient = {
            name: formValues.name,
            surname: formValues.surname,
            email: formValues.email,
            phone: formValues.phone,
        };
        if (this.data === null) {
            this.dataService.addClient(newClient);
        } else {
            this.dataService.updateClient(newClient, this.data.index);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

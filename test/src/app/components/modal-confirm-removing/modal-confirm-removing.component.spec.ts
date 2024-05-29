import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmRemovingComponent } from './modal-confirm-removing.component';

describe('ModalConfirmRemovingComponent', () => {
    let component: ModalConfirmRemovingComponent;
    let fixture: ComponentFixture<ModalConfirmRemovingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ModalConfirmRemovingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ModalConfirmRemovingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

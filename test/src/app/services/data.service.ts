import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClient } from '../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    dataSubject = new BehaviorSubject<IClient[] | null>(this.getDataToLocal());
    data$ = this.dataSubject.asObservable();

    itemsForRemovingSubject = new BehaviorSubject<number[] | null>(null);
    itemsForRemoving$ = this.itemsForRemovingSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchDataFromServer() {
        this.http
            .get('https://test-data.directorix.cloud/task1')
            .subscribe((data) => {
                const newData = JSON.parse(JSON.stringify(data));
                if (this.getDataToLocal() === null) {
                    this.dataSubject.next(newData.users);
                    this.setDataToLocal();
                }
            });
    }

    addClient(data: IClient) {
        const oldArray = this.dataSubject.getValue();
        if (oldArray !== null) {
            this.dataSubject.next([...oldArray, data]);
            this.setDataToLocal();
        }
    }

    updateClient(data: IClient, index: number) {
        const allClients = this.dataSubject.getValue();
        if (allClients !== null) {
            allClients[index] = data;
            this.dataSubject.next(allClients);
            this.setDataToLocal();
        }
    }

    updateItemsForRemoving(data: number[]) {
        this.itemsForRemovingSubject.next(data);
    }

    getLengthOfRemovingClients() {
        return this.itemsForRemovingSubject.getValue()?.length;
    }

    removeClients() {
        const removingArr = this.itemsForRemovingSubject.getValue();
        const oldClientsArray = this.dataSubject.getValue();
        const newClientsArray = oldClientsArray?.filter(
            (_item, index) => !removingArr?.includes(index),
        );
        this.dataSubject.next(newClientsArray ? newClientsArray : []);
        this.itemsForRemovingSubject.next([]);
        this.setDataToLocal();
    }

    setDataToLocal() {
        const data = this.dataSubject.getValue();
        localStorage.setItem('tableData', JSON.stringify(data));
    }

    getDataToLocal() {
        const data = localStorage.getItem('tableData');
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    resetAll() {
        const reset = this.getDataToLocal();
        console.log('сброс', reset);
        this.dataSubject.next(reset);
    }
}

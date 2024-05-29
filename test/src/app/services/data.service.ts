import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClient } from '../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private dataSubject = new BehaviorSubject<IClient | null>(null);
    data$ = this.dataSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchDataFromServer() {
        this.http
            .get('https://test-data.directorix.cloud/task1')
            .subscribe((data) => {
                const newData = JSON.parse(JSON.stringify(data));
                this.dataSubject.next(newData.users);
            });
    }
}
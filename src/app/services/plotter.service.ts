import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlotterService {

    constructor(private http: HttpClient) {
    }

    getPlotterColumns() {
        return this.http.get(environment.url + 'columns');
    }

    getColumnsData(columnsForm) {
        return this.http.post(environment.url + 'data', columnsForm);
    }
}

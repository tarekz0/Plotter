import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlotterService {

    constructor(private http: HttpClient) {
    }

    getPlotterColumns() {
        return this.http.get(environment.url + 'columns').pipe(
            catchError((err) => {
                console.log('error caught in service');
                console.error(err);
                return throwError(err);
            })
        );
    }

    getColumnsData(columnsForm) {
        return this.http.post(environment.url + 'data', columnsForm).pipe(
            catchError((err) => {
                console.log('error caught in service');
                console.error(err);
                return throwError(err);
            })
        );
    }
}

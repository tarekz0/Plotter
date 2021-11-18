import {TestBed} from '@angular/core/testing';

import {PlotterService} from './plotter.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PlotterService', () => {
    let service: PlotterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: PlotterService, useValue: PlotterService}
            ]
        });
        service = TestBed.inject(PlotterService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

   /* it('should have get columns function', () => {
        service = TestBed.get(PlotterService);
        expect(service.getPlotterColumns).toBeTruthy();
        service.getPlotterColumns().subscribe(
            data => expect(data).toEqual([], 'should return the employee'),
            fail
        );
    });
    it('should get chart data', () => {
        const chartRequest = {dimension: 'Product', measures: ['Cost']};
        service.getColumnsData(chartRequest).subscribe(
            data => expect(data).toEqual([], 'should return the employee'),
            fail
        );
    });*/
});

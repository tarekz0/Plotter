import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {PlotterService} from './services/plotter.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [
                AppComponent
            ],
            providers: [PlotterService, {ToastrService, useClass: ToastrService}]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Plotter'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Plotter');
    });
    it('should have get columns function', () => {
        const service: PlotterService = TestBed.get(PlotterService);
        expect(service.getPlotterColumns).toBeTruthy();
    });
    it('should have get columns function', () => {
        const service: PlotterService = TestBed.get(PlotterService);
        expect(service.getPlotterColumns).toBeTruthy();
        service.getPlotterColumns().subscribe(
            data => expect(data).toEqual([], 'should return the employee'),
            fail
        );
    });
    it('should get chart data', () => {
        const service: PlotterService = TestBed.get(PlotterService);
        const chartRequest = {dimension: 'Product', measures: ['Cost']};
        service.getColumnsData(chartRequest).subscribe(
            data => expect(data).toEqual([], 'should return the employee'),
            fail
        );
    });
    it('should clear lists bend on type', () => {

    });
});

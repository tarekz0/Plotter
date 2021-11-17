import {Component, OnInit} from '@angular/core';
import {PlotterService} from './services/plotter.service';
import {DndDropEvent} from 'ngx-drag-drop';
import * as Highcharts from 'highcharts';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Plotter';
    columnsList;
    public dimensions: string[] = [];
    public measures: string[] = [];
    Highcharts: typeof Highcharts = Highcharts;

    optFromInputString: string = `
  {
    "title": { "text": "Highcharts chart" },
    "series": [{
      "data": [11,2,3],
      "zones": [{
        "value": 7.2,
        "dashStyle": "dot",
        "color": "red"
      }]
    }, {
      "data": [5,6,7]
    }]
  }
  `;

    optFromInput: Highcharts.Options = JSON.parse(this.optFromInputString);
    updateFromInput: boolean = false;
    seriesTypes: { [key: string]: string } = {
        line: 'column',
        column: 'scatter',
        scatter: 'spline',
        spline: 'line'
    };
    columnsForm: any;

    constructor(private pService: PlotterService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.pService.getPlotterColumns().subscribe(
            result => {
                this.columnsList = result;
            },
            error => {

            },
        );
    }

    onDragged(event: DndDropEvent, item: any, list: any[]) {
        const index = list.indexOf(item);
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(index, 1);
            }
        }
    }

    onDrop(event: DndDropEvent, list: any[], type: string) {
        if (type === 'dimension') {
            if (list.length === 0) {
                let index = event.index;
                if (typeof index === 'undefined') {
                    index = list.length;
                }
                list.splice(index, 0, event.data);
            } else {
                return false;
            }
        } else {
            let index = event.index;

            if (typeof index === 'undefined') {

                index = list.length;
            }

            list.splice(index, 0, event.data);
        }
        this.columnsData();
    }

    clearList(type) {
        if (type === 'dimension') {
            this.columnsList = [...this.columnsList, ...this.dimensions];
            this.dimensions = [];
        } else {
            this.columnsList = [...this.columnsList, ...this.measures];
            this.measures = [];
        }
    }

    logChartInstance(chart: Highcharts.Chart) {
        console.log('Chart instance: ', chart);
    }

    updateInputChart() {
        this.optFromInput = JSON.parse(this.optFromInputString);
    }

    toggleSeriesType(index: number = 0) {
        this.optFromInput.series[index].type =
            this.seriesTypes[this.optFromInput.series[index].type || 'line'] as
                'column' | 'scatter' | 'spline' | 'line';
        // nested change - must trigger update
        this.updateFromInput = true;
    }

    columnsData() {
        this.columnsForm['dimension'] = this.dimensions[0]['name'];
        this.columnsForm['measures'] = [];
        for (let measure in this.measures) {
            this.columnsForm['measures'].push(measure['name']);
        }

        this.pService.getColumnsData(this.columnsForm).subscribe(
            result => {
                this.columnsList = result;
            },
            error => {

            },
        );
    }
}

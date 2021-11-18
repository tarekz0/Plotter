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
    columnsForm = {};
    columnDataResult: any;
    chartSeries = [];
    chartCategories = [];
    chartOptions: any;
    updateFlag = false;

    constructor(private pService: PlotterService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.spinner.show();
        this.pService.getPlotterColumns().subscribe(
            result => {
                this.columnsList = result;
                this.spinner.hide();
            },
            error => {
                this.toastr.error(error.message, 'Failed');
                this.spinner.hide();
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
            this.columnsForm['dimension'] = '';
        } else {
            this.columnsList = [...this.columnsList, ...this.measures];
            this.measures = [];
            this.columnsForm['measures'] = [];
        }
        this.columnsData();
    }

    columnsData() {
        this.columnsForm['measures'] = [];
        this.columnDataResult = undefined;
        this.chartSeries = [];
        this.chartCategories = [];
        for (let dimension in this.dimensions) {
            this.columnsForm['dimension'] = this.dimensions[dimension]['name'];
        }
        for (let measure in this.measures) {
            this.columnsForm['measures'].push(this.measures[measure]['name']);
        }
        if (this.columnsForm['measures'].length > 0 && this.columnsForm['dimension']) {
            this.spinner.show();
            this.pService.getColumnsData(this.columnsForm).subscribe(
                result => {
                    this.columnDataResult = result;
                    for (let i = 0; i < this.columnDataResult.length; i++) {
                        if (this.columnDataResult[i].name === this.columnsForm['dimension']) {
                            this.chartCategories = this.columnDataResult[i].values;
                        } else {
                            this.columnDataResult[i]['data'] = this.columnDataResult[i]['values'];
                            delete this.columnDataResult[i]['values'];
                            this.chartSeries.push(this.columnDataResult[i]);
                        }
                    }
                    this.applyChart();
                },
                error => {
                    this.toastr.error(error.message, 'Failed');
                    this.spinner.hide();
                },
            );
        }
    }

    applyChart() {
        debugger;
        this.chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: this.chartCategories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: this.chartSeries,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 700
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: 0
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        };
        this.updateFlag = true;
        this.spinner.hide();
    }
}

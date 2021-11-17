import {Component, OnInit} from '@angular/core';
import {PlotterService} from './services/plotter.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import {DndDropEvent} from 'ngx-drag-drop';

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

    constructor(private pService: PlotterService) {
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
}

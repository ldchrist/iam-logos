import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconInfo } from '../common/types/icon-info.type';
import { FormControl } from '@angular/forms';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    of,
    Subscription,
} from 'rxjs';
import {
    debounce,
    debounceTime,
    map,
    startWith,
    tap,
    withLatestFrom,
} from 'rxjs/operators';

const FULL_ICON_LIST = require('../../dist/generated-font/dist/iam-logos.json');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    searchFormControl = new FormControl('');

    iconInfoList: BehaviorSubject<IconInfo[]> = new BehaviorSubject<IconInfo[]>(
        []
    );
    iconInfoListSubscription: Subscription;

    showDetailedList: boolean;

    ngOnInit(): void {
        this.iconInfoListSubscription = this.subscribeToIconInfoListChanges();
    }

    ngOnDestroy(): void {
        this.iconInfoListSubscription.unsubscribe();
    }

    onTileViewClicked(): void {
        this.showDetailedList = false;
    }

    onListViewClicked(): void {
        this.showDetailedList = true;
    }

    private subscribeToIconInfoListChanges(): Subscription {
        return combineLatest([
            of(FULL_ICON_LIST).pipe(
                map((icons: IconInfo[]) => {
                    return icons.sort((a: IconInfo, b: IconInfo) =>
                        a.glyph.localeCompare(b.glyph)
                    );
                })
            ),
            this.searchFormControl.valueChanges.pipe(
                debounceTime(200),
                startWith('')
            ),
        ])
            .pipe(
                map(([icons, search]) => {
                    if (search) {
                        let combined_filtered_array = []
                        let filter_by_name= icons.filter((icon: IconInfo) => {
                            return icon.name.indexOf(search) > -1; 
                        });
                        let filter_by_uses= icons.filter((icon: IconInfo) => {

                            return icon.uses.indexOf(search) > -1;
                        });
                        combined_filtered_array.push(...filter_by_name)
                        combined_filtered_array.push(...filter_by_uses)
                        combined_filtered_array = [...new Set(combined_filtered_array)]
                        
                        return combined_filtered_array 
                    }

                    return icons;
                })
            )
            .subscribe(this.iconInfoList); // Keep a hold of the latest value in this BehaviorSubject
    }

    onClearSearchClicked(): void {
        this.searchFormControl.setValue('');
    }
}


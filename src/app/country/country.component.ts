import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../stores/app.reducer';
import * as CountriesActions from '../stores/country/country.actions';
import { Subscription } from 'rxjs';
import { getCountriesError, getCountriesSuccess } from '../stores/country/country.reducer';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule} from '@angular/material/table';
import Fuse from 'fuse.js';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms'; 
import { CountryService } from '../services/country.service';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedbackDetailComponent } from '../share-component/detail/detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
    selector: 'app-country',
    standalone: true,
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss'],
    imports: [CommonModule,
              RouterOutlet,
              MatTableModule,
              FormsModule,
              ReactiveFormsModule,
              MatTableModule,
              MatInputModule,
              NgxDatatableModule,
              MatIconModule,
              MatMenuModule,
              NgxPaginationModule],
})

export class CountryComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: false }) search: any;
  public _subscribeGetRecipe!: Subscription;
  public _subscribeGetRecipeError!: Subscription;
  public _subscribeDeleteRecipe!: Subscription;
  public _subscribeDeleteRecipeError!: Subscription;
  public nativeName: any []=[];
  public altSpellings: any []=[];
  public idd: any;
  public searchForm!: FormGroup;
  private recipeService= inject(CountryService);
  public contriesForm!: UntypedFormGroup;
  public rows: any;
  private dialogRef: any;
  private limitValue = 10;
  private searchValue: string = ''
  public fuse!: Fuse<any>;
  public filteredArray: any[] = [];
  public countries: any[] = [];
  public officalNativeName: any;

  private paramsGlobal: any = {
    limit: 10,
    offset: 0,
    content: '',
   
  };
  public backUpRows: any;
  public currentPage = 1;
  public pageSize =25;
  public sortColumn = 'name';
  public sortOrder: string = 'asc';
  constructor(
              private _router: Router,
              private store: Store<fromApp.AppState>,
              private _dialogs: MatDialog,
              private fb: FormBuilder

             ) { 
         
               }

  ngOnInit(): void {
    this.getCountries(this.paramsGlobal);
  }


    /**
     * function getCountries
     */
  private getCountries(payload: any): void {
    this.store.dispatch(
       new CountriesActions.GetCountries(payload)
    ); 
    this._subscribeGetRecipe = this.store.select(getCountriesSuccess).subscribe((responseData) => {
      if (responseData !== null ) {
        this.rows = responseData;
        this.backUpRows = this.rows;
        
        console.log("rows", this.rows);
   
      }
  }); 

  this._subscribeGetRecipeError = this.store.select(getCountriesError).subscribe((message) => {
      if (message !== '') {
      }
  }); 
  }

     /**
     * function onClickView
     */
  public onClickView(key: any): void {
    this.dialogRef = this._dialogs.open(FeedbackDetailComponent, {
        panelClass: 'myapp-no-padding-dialog',
        width:"648px",
        height:"450px",
        data      : {
          param: key,
        }
      });
      this.dialogRef.afterClosed().subscribe(() => {    
    
    });
  }

    /**
     * function getCallingCodes
     */
  public getCallingCodes(idd: any): string {
    if (idd && idd.suffixes) {
      const d = idd.suffixes.map((suffix: any) => `${idd.root}${suffix}`).join(', ');
      return d;
    }
    return ''; 
  }

    /**
     * function filterByName
     */
  public filterByName(event: any) {
    
    const filter = event.target.value.toLowerCase();
    const FilteredData = this.backUpRows.filter((x: any) => 
      x.name.official.toLowerCase().includes(filter)
    );
    this.rows = FilteredData;
    this.currentPage = 1;
  
  }

    /**
     * function sortBy
     */
  public sortBy(event: any) {
    const column = event.column.prop;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.rows = this.sortData(this.rows, column, this.sortOrder);
  }

    /**
     * function sortData
     */
  private sortData(data: any[], column: string, order: string): any[] {
    return data.sort((a: any, b: any) => {
      const valueA = this.getNestedValue(a, column);
      const valueB = this.getNestedValue(b, column);

      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

    /**
     * function getNestedValue
     */
  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
  }

  ngOnDestroy(): void {
      
    if(this._subscribeGetRecipe){
      this._subscribeGetRecipe.unsubscribe()
    }

    if(this._subscribeGetRecipeError){
      this._subscribeGetRecipeError.unsubscribe()
    }
  }
  
}
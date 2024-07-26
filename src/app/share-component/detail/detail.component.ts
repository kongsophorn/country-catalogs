import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-feed-back-detail',
  standalone:true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports:[
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule]
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {
    public data: any;
    
    constructor(public matDialogRef: MatDialogRef<FeedbackDetailComponent>, 
                @Inject(MAT_DIALOG_DATA) private _data: any,
                ){     
                }
  
    ngOnInit(): void {
        this.data = this._data.param;
    }
   
    public getCallingCodes(idd: any): string {
      if (idd && idd.suffixes) {
        const d = idd.suffixes.map((suffix: any) => `${idd.root}${suffix}`).join(', ');
        return d;
      }
      return ''; 
    }
  

    ngOnDestroy(): void{
      
    }
  }

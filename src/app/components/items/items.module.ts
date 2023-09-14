import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsComponent } from './items.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ItemsComponent,
    AddItemFormComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    provideAnimations()
  ]
})
export class ItemsModule { }

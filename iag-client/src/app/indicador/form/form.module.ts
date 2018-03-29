import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
  imports: [FormsModule, CommonModule, Angular2FontawesomeModule],
  exports: [FormComponent],
  declarations: [FormComponent]
})
export class FormModule { }

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { GridModule } from './indicador/grid/grid.module';
import { FormModule } from './indicador/form/form.module';
import { IndicadorComponent } from './indicador/indicador/indicador.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    IndicadorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormModule,
    GridModule,
    HttpModule,
    Angular2FontawesomeModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

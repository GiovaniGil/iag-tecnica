import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { IndicadorService } from '../service/indicador.service';

@NgModule({
  imports: [CommonModule],
  exports: [GridComponent],
  declarations: [GridComponent],
  providers: [ IndicadorService ]
})
export class GridModule { }

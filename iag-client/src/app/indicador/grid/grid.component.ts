import { FormComponent } from './../form/form.component';
import { Http } from '@angular/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { IndicadorService } from '../service/indicador.service';
import 'rxjs/add/operator/map';
import { IndicadorComponent } from '../indicador/indicador.component';

@Component({
  selector: 'grid-iag',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  indicadores: IndicadorComponent[] = [];
  service: IndicadorService;
  mensagem: string = '';

  ngOnInit(): void {
    this.service.changeLista.subscribe(indicador => {
      if (indicador) {
        this.indicadores.splice(this.indicadores.indexOf(indicador), 1);
      }
    });

    this.service.changeInserido.subscribe(indicador => {
      
      if (indicador) {
        this.service
          .lista()
          .subscribe(indicadores => {
            this.indicadores = indicadores;
          }, erro => console.log(erro));
      }
    });
    
  }

  constructor(service: IndicadorService) {

    this.service = service;
    this.service
      .lista()
      .subscribe(indicadores => {
        this.indicadores = indicadores;
      }, erro => console.log(erro));

  }

  @HostListener('click')
  atualizar(indicador) {
    this.service.emitIndicador(indicador);
  }

}

import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { IndicadorComponent } from '../indicador/indicador.component';
import { IndicadorService } from '../service/indicador.service';

@Component({
  selector: 'form-iag',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @HostBinding('class.indicador')
  indicador: IndicadorComponent = new IndicadorComponent();
  service: IndicadorService;
  mensagem: string = '';
  botaoSalvarLabel: string = "Salvar";

  ngOnInit() {
    this.service.changeIndicador.subscribe(indicador => {
      if (indicador) {
        //copia para evitar two-way databinding        
        this.indicador = Object.assign({}, indicador);
        this.botaoSalvarLabel = "Atualizar";
      }
    });
  }

  constructor(service: IndicadorService) {
    this.service = service;
  }

  salvar(event) {
    event.preventDefault();
    console.log(this.indicador);
    this.service
      .salva(this.indicador)
      .subscribe(res => {
        this.service.inseridoIndicador(this.indicador);
        this.mensagem = res.mensagem;
        this.indicador = new IndicadorComponent();
      }, erro => this.mensagem = erro );
    this.botaoSalvarLabel = "Salvar";
  }

  remover() {
    console.log(this.indicador);
    this.service
      .remove(this.indicador)
      .subscribe(res => {
        this.service.removeIndicador(this.indicador);
        this.mensagem = res.mensagem;
        this.indicador = new IndicadorComponent();
      }, erro => this.mensagem = erro );
    this.botaoSalvarLabel = "Salvar";
  }

  limpar() {
    this.indicador = new IndicadorComponent();
    this.botaoSalvarLabel = "Salvar";
    this.mensagem = "";
  }

  buscarPorId(id) {

    if(id && !isNaN(id)){
    this.service
      .buscaPorId(id)
      .subscribe(indicador => {
        if (indicador.id) {
          this.indicador = Object.assign({}, indicador);;
          this.botaoSalvarLabel = "Atualizar";
          this.mensagem = '';
        } else {
          this.mensagem = 'Nenhum registo encontrado com o ID '+id;
          this.indicador = new IndicadorComponent();
          this.botaoSalvarLabel = "Salvar";
        }
      }, erro => this.mensagem = erro );
    }else{
      this.mensagem = 'Digite um ID (numérico) para realizar a busca';
    }
  }
}

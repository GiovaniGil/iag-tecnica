import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { IndicadorComponent } from '../indicador/indicador.component';


@Injectable()
export class IndicadorService {

    http: Http;
    headers: Headers;
    url: string = 'http://localhost:81/indicador/';

    @Output() changeIndicador: EventEmitter<IndicadorComponent> = new EventEmitter();
    @Output() changeLista: EventEmitter<IndicadorComponent> = new EventEmitter();
    @Output() changeInserido: EventEmitter<IndicadorComponent> = new EventEmitter();

    indicador: IndicadorComponent;

    constructor(http: Http) {

        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

    }

    emitIndicador(indicador) {
        this.indicador = indicador;
        this.changeIndicador.emit(indicador);

    }

    removeIndicador(indicador){
        this.indicador = indicador;
        this.changeLista.emit(indicador);
    }

    inseridoIndicador(indicador){
        this.indicador = indicador;
        this.changeInserido.emit(indicador);
    }

    salva(indicador: IndicadorComponent): Observable<MensagemCadastro> {

        if (indicador.id) {

            return this.http
                .post(this.url + 'save', JSON.stringify(indicador), { headers: this.headers })
                .map(() => new MensagemCadastro('Indicador alterado com sucesso'));

        } else {

            return this.http
                .post(this.url + 'save', JSON.stringify(indicador), { headers: this.headers })
                .map(() => new MensagemCadastro('Indicador incluído com sucesso'));

        }        
    }

    lista(): Observable<IndicadorComponent[]> {

        return this.http
            .get(this.url + 'all')
            .map(res => res.json());

    }

    remove(indicador: IndicadorComponent): Observable<MensagemCadastro> {
        return this.http
            .delete(this.url + 'delete/' + indicador.id)
            .map(() => new MensagemCadastro('Indicador excluído com sucesso'));
    }

    buscaPorId(id: string): Observable<IndicadorComponent> {

        return this.http
            .get(this.url + id)
            .map(res => res.json());
    }

}

export class MensagemCadastro {

    constructor(private _mensagem: string) {

        this._mensagem = _mensagem;
        //this._inclusao = _inclusao;
    }

    get mensagem(): string {
        return this._mensagem;
    }

    

}

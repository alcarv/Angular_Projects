import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frases } from '../shared/frase.model'

import { Frase } from './frases-mock'
import { R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frases[] = Frase
  public instrucao: string = 'Traduza a Frase:'
  public resposta: string

  public progresso: number = 0;

  public rodada: number = 0
  public rodadaFrase: Frases;

  public tentativas: number = 3

@Output()  public encerrarJogo = new EventEmitter()

  constructor() { 
    this.atualizaRodada()

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  public atualizarResposta(resposta: Event): void{
    this.resposta = ( (<HTMLInputElement>resposta.target).value)
    //console.log(this.resposta)
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta){
  
      this.rodada++
      this.progresso = this.progresso + (100 / this.frases.length)

      if(this.rodada === 4) {
        this.encerrarJogo.emit('Vitória')
      }

      this.atualizaRodada()

    } else {
      alert('ERoooouu')
      this.tentativas --;

      if(this.tentativas == -1) {
        this.encerrarJogo.emit('Derrota')
      }
    }


  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}

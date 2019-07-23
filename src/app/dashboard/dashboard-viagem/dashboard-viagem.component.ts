import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';
import { OrdemService } from '../../ordem-trafegos/ordem.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DataSetLinhas } from '../../core/model';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-dashboard-viagem',
  templateUrl: './dashboard-viagem.component.html',
  styleUrls: ['./dashboard-viagem.component.css']
})
export class DashboardViagemComponent implements OnInit {
  coresGraficoPizza = new Array<string>();
  coresGraficoLinha = new Array<string>();

  pieChartData: any;
  lineChartData: any;

  constructor(
    private title: Title,
    private ordemService: OrdemService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Viagem');
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  
  
configurarGraficoPizza(){

  
  this.ordemService.kmPorVeiculo()
    .then(dados => {
      this.coresGraficoPizza = this.preencherCoresGraficos(dados.length);
      this.pieChartData = {
      
    labels: dados.map(dado => `${dado.veiculo.modelo}  ${dado.veiculo.placa}`), 
    datasets: [
      {
        data: dados.map(dado => dado.totalViagem),
        backgroundColor: this.coresGraficoPizza
      }
    ]
  };
    });
}

configurarGraficoLinha() { 
  this.ordemService.kmPorCampusDia()
    .then(dados => {
      this.coresGraficoLinha = this.preencherCoresGraficos(dados.length);
      const diasDoMes = this.configurarDiasMes();
      const campus = this.configuraDataSetsLinha(dados, diasDoMes);           
      
      
      this.lineChartData = {
        labels: diasDoMes,
        datasets: campus
      }
    });
}
  configuraDataSetsLinha(dados, diasDoMes){
    const dataSet = new Array<DataSetLinhas>();
    const labels = this.agruparNomesCampus(dados);
    const totais = new Array<Array<number>>();
    for (let index = 0; index < labels.length; index++) {
      totais.push(this.totaisPorCadaDiaMes(dados.filter(dado=> dado.campus === labels[index]), diasDoMes));      
    }
    const cores = this.preencherCoresGraficos(labels.length);
    for (let index = 0; index < labels.length; index++) {
      let data = new DataSetLinhas();
      data.label = labels[index];
      data.data = totais[index];
      data.borderColor = cores[index];
      dataSet.push(data);
    }
    return dataSet;
  }
  agruparNomesCampus(dados) {
    const labels =  new Array<string>();
    let nomes = [] ;
        
    dados.map(dado => {          
      labels.push(dado.campus);
           
    });
    nomes = Array.from(new Set(labels));       
    return nomes;
  }
private totaisPorCadaDiaMes(dados, diasDoMes) {
  const totais: number[] = [];
  for (const dia of diasDoMes) {
    let total = 0;

    for (const dado of dados) {     
      if(dado.dia.getDate() === dia){
        total = dado.totalKmDia;
        console.log(dado.totalKmDia);
        
        break;
      }
    }

    totais.push(total);
  }

  return totais;
}
private configurarDiasMes() {
  const mesReferencia = new Date();
  mesReferencia.setMonth(mesReferencia.getMonth() + 1);
  mesReferencia.setDate(0);

  const quantidade = mesReferencia.getDate();

  const dias: number[] = [];

  for (let i = 1; i <= quantidade; i++) {
    dias.push(i);
  } 
  return dias;
}
preencherCoresGraficos(tamanho: number): Array<string>{
  const colores = new Array<string>();
  const letras = "0123456789ABCDEF";
  let cor = "#";  
  for (let indice = 0; indice < tamanho; indice++) {  
    for (let index = 0; index < 6; index++) {
      cor += letras[Math.floor(Math.random()*16)]; 
    }
    colores.push(cor);
    cor = "#";
}
 return colores;
}



}

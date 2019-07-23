
export class Campus {
  codigo: number;
  nome: string;
  principal: boolean;
}
export class Condutor {
  codigo: number;
  nome: string;
  cpf: string;
  numeroCnh: string;
  categoriaCnh: string;
  dataCadastro: Date;
  dataNascimento: Date;
  dataVencimentoCnh: Date;
  campus = new Campus();
}
export class Contato {
  codigo: number;
  nome: string;
  email: string;
  observacao: string;
  departamento = new Departamento();
  telefones = new Array<Telefones>();
}
export class Departamento {
  codigo: number;
  descricao: string;
  campus = new Campus();
}
export class Telefones {
  codigo: number;
  tipo: TipoTelefone;
  area: string;
  numero: string;

  constructor(codigo?: number,
    tipo?: TipoTelefone,
    area?: string,
    numero?: string) {
      this.codigo = codigo;
      this.tipo = tipo;
      this.area = area;
      this.numero = numero;
    }
}
export enum TipoTelefone {
  Comercial = 'COMERCIAL',
  Corporativo = 'CORPORATIVO',
  Departamento = 'DEPARTAMENTO',
  Pessoal = 'PESSOAL',
  Residencial = 'RESIDENCIAL',
  Trabalho = 'TRABALHO'
}
export enum TipoTelefoneString {
  Comercial = 'Comercial',
  Corporativo = 'Corporativo',
  Departamento = 'Departamento',
  Pessoal = 'Pessoal',
  Residencial = 'Residencial',
  Trabalho = 'Trabalho'
}
export class OrdemTrafego {
  codigo: number;
  solicitante: string;
  dataCadastro: Date;
  dataSolicitacao: Date;
  observacao: string;
  totalKm = 0;
  ativo: boolean;
  veiculo = new Veiculo();
  condutor = new Condutor();
  usuario = new Usuario();
  rotas = new Array<Rota> ();
  campus = new Campus();

}
export class Rota {
  codigo: number;
  localSaida: string;
  dataSaida: Date;
  horaSaida: string;
  kmSaida = 0;
  localChegada: string;
  dataChegada: Date;
  horaChegada: string;
  kmChegada = 0;
  kmPercorrido = 0;
  nome: string;
  servico: string;
  constructor(codigo?: number,
    localSaida?: string,
    dataSaida?: Date,
    horaSaida?: string,
    kmSaida?: number,
    localChegada?: string,
    dataChegada?: Date,
    horaChegada?: string,
    kmChegada?: number,
    kmPercorrido?: number,
    nome?: string,
    servico?: string) {
      this.codigo = codigo;
      this.localSaida = localSaida;
      this.dataSaida = dataSaida;
      this.horaSaida = horaSaida;
      this.kmSaida = kmSaida;
      this.localChegada = localChegada;
      this.dataChegada = dataChegada;
      this.horaChegada = horaChegada;
      this.kmChegada = kmChegada;
      this.kmPercorrido = kmPercorrido;
      this.nome = nome;
      this.servico = servico;
    }

}
export class Permissao {
  codigo: number;
  descricao: string;
}

export class Veiculo {
  codigo: number;
  modelo: string;
  fabricante: string;
  placa: string;
  ano: string;
  observacao: string;
  campus = new Campus();
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes = new Array<Permissao>();
  campus = new Campus();
}
export class UsuarioFiltro {
  codigo: number;
  nome: string;
  email: string;
  campus: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class CampusFiltro {
  codigo: number;
  nome: string;
  pagina = 0;
  itensPorPagina = 7;
}

export class ContatoFiltro {
  nome: string;
  email: string;
  departamento: string;
  observacao: string;
  campus: string;
  pagina = 0;
  itensPorPagina = 5;
}
export class CondutorFiltro {
  codigo: number;
  nome: string;
  cpf: string;
  campus: string;
  dataNascimentoDe: Date;
  dataNascimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}
export class DepartamentoFiltro {
  descricao: string;
  campus: string;
  pagina = 0;
  itensPorPagina = 5;
}
export class OrdemTrafegoFiltro {
  codigo: number;
  solicitante: string;
  placa: string;
  modelo: string;
  cpf: string;
  condutor: string;
  dataSolicitacaoDe: Date;
  dataSolicitacaoAte: Date;
  campus: string;
  pagina = 0;
  itensPorPagina = 5;

}
export class VeiculoFiltro {
  modelo: string;
  fabricante: string;
  placa: string;
  ano: string;
  observacao: string;
  campus: string;
  pagina = 0;
  itensPorPagina = 5;

}
export class DataSetLinhas {
  label: string;
  data: any;
  fill: false;
  borderColor: string;
}

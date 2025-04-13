import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendaService } from '../../services/venda.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Venda {
  id: number;
  produtoId: number;
  produtoNome?: string;
  quantidade: number;
  valorTotal: number;
  dataVenda: string;
}

@Component({
  selector: 'app-extrato-vendas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './extrato-vendas.component.html',
  styleUrls: ['./extrato-vendas.component.css'],
  providers: [DatePipe]
})
export class ExtratoVendasComponent {
  debug = true;
  extratoForm: FormGroup;
  extrato: any = {
    totalVendas: 0,
    valorTotal: 0,
    vendas: [],
    valorTotalPorProduto: {}
  };
  extratoCarregado = false;
  loading = false;
  displayedColumns: string[] = ['id', 'produto', 'quantidade', 'valorTotal', 'dataVenda'];
  dataSource = new MatTableDataSource<Venda>();

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private datePipe: DatePipe
  ) {
    this.extratoForm = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  gerarExtrato(): void {
    console.log('Formulário válido:', this.extratoForm.valid);
    console.log('Valores do formulário:', this.extratoForm.value);

    if (this.extratoForm.invalid) {
      console.log('Formulário inválido, não enviado');
      return;
    }

    this.loading = true;
    this.extratoCarregado = false;

    const dataInicio = this.datePipe.transform(this.extratoForm.value.dataInicio, 'yyyy-MM-dd');
    const dataFim = this.datePipe.transform(this.extratoForm.value.dataFim, 'yyyy-MM-dd');

    console.log('Datas formatadas:', { dataInicio, dataFim });

    this.vendaService.obterExtratoVendas(dataInicio!, dataFim!).subscribe({
      next: (response) => {
        console.log('Dados recebidos:', response);
        this.extrato = {
          vendas: response.vendas || [],
          valorTotal: response.valorTotalGeral || 0,
          valorTotalPorProduto: response.valorTotalPorProduto || {},
          totalVendas: response.vendas?.length || 0,
          quantidadeVendida: response.quantidadeVendida || 0
        };
        this.dataSource.data = this.extrato.vendas;
        this.extratoCarregado = true;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro completo:', err);
        this.extratoCarregado = false;
        this.loading = false;
      }
    });
  }
}
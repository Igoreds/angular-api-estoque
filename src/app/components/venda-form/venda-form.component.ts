import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProdutoService } from '../../services/produto.service';
import { VendaService } from '../../services/venda.service';
import { Produto } from '../../models/produto.model';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {
  vendaForm: FormGroup;
  produtos: Produto[] = [];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private snackBar: MatSnackBar,
    private router: Router // Adicione o Router no construtor
  ) {
    this.vendaForm = this.fb.group({
      produtoId: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000
        });
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.vendaForm.invalid) {
      return;
    }
  
    const { produtoId, quantidade } = this.vendaForm.value;
  
    this.vendaService.venderProduto(produtoId, quantidade).subscribe({
      next: (response) => {
        this.snackBar.open('Venda registrada com sucesso', 'Fechar', {
          duration: 3000
        });
        this.vendaForm.reset();
        this.carregarProdutos();
        this.router.navigate(['/extrato']);
      },
      error: (err) => {
        let errorMessage = 'Erro ao registrar venda';
        
        // Tratamento detalhado do erro
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage += `: ${err.statusText}`;
        } else if (err.message) {
          errorMessage += `: ${err.message}`;
        }
  
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        console.error('Erro completo:', err);
      }
    });
  }
  }

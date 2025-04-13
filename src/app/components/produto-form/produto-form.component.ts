import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  produtoForm: FormGroup;
  produtoId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      quantidade: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produtoId = params['id'];
      if (this.produtoId) {
        this.isEditMode = true;
        this.carregarProduto(this.produtoId);
      }
    });
  }

  carregarProduto(id: number): void {
    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (produto) => {
        this.produtoForm.patchValue(produto);
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar produto', 'Fechar', {
          duration: 3000
        });
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.produtoForm.invalid) {
      return;
    }

    const produto: Produto = this.produtoForm.value;

    if (this.isEditMode && this.produtoId) {
      this.produtoService.atualizarProduto(this.produtoId, produto).subscribe({
        next: () => {
          this.snackBar.open('Produto atualizado com sucesso', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/produtos']);
        },
        error: (err) => {
          this.snackBar.open('Erro ao atualizar produto', 'Fechar', {
            duration: 3000
          });
          console.error(err);
        }
      });
    } else {
      this.produtoService.cadastrarProduto(produto).subscribe({
        next: () => {
          this.snackBar.open('Produto cadastrado com sucesso', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/produtos']);
        },
        error: (err) => {
          this.snackBar.open('Erro ao cadastrar produto', 'Fechar', {
            duration: 3000
          });
          console.error(err);
        }
      });
    }
  }
}
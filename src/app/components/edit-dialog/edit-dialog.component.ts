
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule  
    
  ],
  selector: 'app-produto-edit-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Editar Produto</h2>
    <mat-dialog-content>
      <form [formGroup]="produtoForm">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="nome" required>
          <mat-error *ngIf="produtoForm.get('nome')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Categoria</mat-label>
          <textarea matInput formControlName="descricao"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Preço</mat-label>
          <input matInput type="number" step="0.01" formControlName="preco" required>
          <mat-error *ngIf="produtoForm.get('preco')?.hasError('required')">
            Preço é obrigatório
          </mat-error>
          <mat-error *ngIf="produtoForm.get('preco')?.hasError('min')">
            Preço deve ser maior que zero
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Quantidade</mat-label>
          <input matInput type="number" formControlName="quantidade" required>
          <mat-error *ngIf="produtoForm.get('quantidade')?.hasError('required')">
            Quantidade é obrigatória
          </mat-error>
          <mat-error *ngIf="produtoForm.get('quantidade')?.hasError('min')">
            Quantidade não pode ser negativa
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="produtoForm.invalid">Salvar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .w-100 { width: 100%; }
    mat-form-field { margin-bottom: 16px; }
  `]
})
export class ProdutoEditDialogComponent {
  produtoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProdutoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private fb: FormBuilder
  ) {
    this.produtoForm = this.fb.group({
      nome: [data.nome, Validators.required],
      descricao: [data.descricao],
      preco: [data.preco, [Validators.required, Validators.min(0.01)]],
      quantidade: [data.quantidade, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.produtoForm.valid) {
      const updatedProduto = {
        ...this.data,
        ...this.produtoForm.value
      };
      this.dialogRef.close(updatedProduto);
    }
  }
}
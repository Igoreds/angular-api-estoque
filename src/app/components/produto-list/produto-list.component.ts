import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProdutoEditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'quantidade', 'acoes'];
  produtos = new MatTableDataSource<Produto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit() {
    this.produtos.paginator = this.paginator;
    this.produtos.sort = this.sort;
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos.data = produtos;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000
        });
        console.error(err);
      }
    });
  }

  editarProduto(id: number): void {
    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (produto) => {
        const dialogRef = this.dialog.open(ProdutoEditDialogComponent, {
          width: '500px',
          data: produto
        });
  
        dialogRef.afterClosed().subscribe((result: Produto) => {
          if (result) {
            this.produtoService.atualizarProduto(result.id!, result).subscribe({
              next: () => {
                this.snackBar.open('Produto atualizado com sucesso', 'Fechar', {
                  duration: 3000
                });
                this.carregarProdutos();
              },
              error: (err) => {
                this.snackBar.open('Erro ao atualizar produto', 'Fechar', {
                  duration: 3000
                });
                console.error(err);
              }
            });
          }
        });
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar produto para edição', 'Fechar', {
          duration: 3000
        });
        console.error(err);
      }
    });
  }

  confirmarExclusao(produto: Produto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Deseja realmente excluir o produto ${produto.nome}?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirProduto(produto.id!);
      }
    });
  }

  excluirProduto(id: number): void {
    this.produtoService.excluirProduto(id).subscribe({
      next: () => {
        this.snackBar.open('Produto excluído com sucesso', 'Fechar', {
          duration: 3000
        });
        this.carregarProdutos();
      },
      error: (err) => {
        this.snackBar.open('Erro ao excluir produto', 'Fechar', {
          duration: 3000
        });
        console.error(err);
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.produtos.filter = filterValue.trim().toLowerCase();

    if (this.produtos.paginator) {
      this.produtos.paginator.firstPage();
    }
  }
}
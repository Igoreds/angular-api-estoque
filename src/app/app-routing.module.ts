import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { VendaFormComponent } from './components/venda-form/venda-form.component';
import { ExtratoVendasComponent } from './components/extrato-vendas/extrato-vendas.component';

const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/editar/:id', component: ProdutoFormComponent },
  { path: 'vendas', component: VendaFormComponent },
  { path: 'extrato', component: ExtratoVendasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
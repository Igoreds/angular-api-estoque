import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { VendaFormComponent } from './components/venda-form/venda-form.component';
import { ExtratoVendasComponent } from './components/extrato-vendas/extrato-vendas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
 //   ProdutoListComponent,
   // ExtratoVendasComponent,
    NavbarComponent,
   //ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    HttpClientModule,
    ProdutoListComponent,
    VendaFormComponent,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ConfirmDialogComponent,
    ExtratoVendasComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  providers: [ [

    provideAnimations(), // Necessário para componentes do Material
    provideHttpClient()
  ]],
  bootstrap: [AppComponent]
})
export class AppModule { }
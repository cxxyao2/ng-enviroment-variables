import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnvServiceProvider } from './env.service.provider';
import { HomeComponent } from './home/home.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLExmapleComponent } from './graph-qlexmaple/graph-qlexmaple.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, GraphQLExmapleComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}

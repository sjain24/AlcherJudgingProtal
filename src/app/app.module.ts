import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import {HttpClientModule} from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule ,MomentModule,
    NgIdleKeepaliveModule.forRoot()],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule {}

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
	declarations: [
		AppComponent,
		TimerComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [Title],
	bootstrap: [AppComponent]
})
export class AppModule { }

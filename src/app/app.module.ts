import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
	declarations: [
		AppComponent,
		TimerComponent
	],
	imports: [
		BrowserModule
	],
	providers: [Title],
	bootstrap: [AppComponent]
})
export class AppModule { }

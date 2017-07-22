import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['../assets/scss/app.component.scss']
})
export class AppComponent {
	title = 'PomoSync';
	constructor(private titleService: Title) {}
	titleAdd(newTitle: string): void {
		if (newTitle === '') {
			this.titleService.setTitle(this.title);
		} else {
			this.titleService.setTitle(newTitle.concat(' - ').concat(this.title));
		}
	}
}

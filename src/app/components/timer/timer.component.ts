import { Component, OnInit } from '@angular/core';

import { Moment, Duration } from 'moment';
import * as moment from 'moment';

import { TimerService } from './timer.service';
import { PomoSessionService } from '../session/pomosession.service';

import { Pomo } from '../../shared/pomo.model'
import { PomoSession } from '../../shared/pomosession.model';

@Component({
	selector: 'timer',
	templateUrl: './timer.component.html',
	providers: [TimerService, PomoSessionService]
})
export class TimerComponent implements OnInit {
	state: string;
	start: Moment;
	end: Moment;
	timer: any;
	pomoSession: PomoSession;
	constructor(private timerService: TimerService,
		private sessionService: PomoSessionService) {}
	ngOnInit() {
		this.start = moment();
		this.end = moment();
		this.state = 'stopped';
		this.timer = undefined;
	}
	createPomo(): Pomo {
		let newPomo = new Pomo(this.start, this.end);
		if(newPomo.validate()) {
			return newPomo;
		} else {
			return undefined;
		}
	}
	startPomo(duration: Duration) {
		this.timer = this.timerService.startTimer(duration);
		this.state = 'running';
	}
	pausePomo() {
		if(this.state === 'running') {
			this.timerService.pauseTimer(this.timer);
			this.state = 'paused';
		}
	}
	resumePomo() {
		if(this.state === 'paused') {
			this.timerService.resumeTimer(this.timer);
			this.state = 'running';
		}
	}
	stopPomo() {
		if(this.state === 'paused' || 'running') {
			this.timerService.stopTimer(this.timer);
			this.state = 'stopped';
			this.end = moment();
			let current: Pomo = this.createPomo();
			this.sessionService.registerPomo(current, this.pomoSession);
		}
	}
	getTimeLeft() {
		return this.timerService.timeLeft(this.timer);
	}
}

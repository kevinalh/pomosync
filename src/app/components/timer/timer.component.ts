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
	state: String;
	duration: Duration;
	start: Moment;
	end: Moment;
	timer: any;
	pomoSession: PomoSession;
	durationOptions: Duration[];
	constructor(private timerService: TimerService,
		private sessionService: PomoSessionService) {}
	ngOnInit() {
		this.start = moment();
		this.end = moment();
		this.state = 'stopped';
		this.timer = undefined;
		this.duration = moment.duration(25, 'minutes');
		this.durationOptions = [moment.duration(20, 'minutes'),
			moment.duration(25, 'minutes'), moment.duration(30, 'minutes'),
			moment.duration(35, 'minutes'), moment.duration(40, 'minutes')];
		this.pomoSession = this.sessionService.createPomoSession();
	}
	createPomo(): Pomo {
		let newPomo = new Pomo(this.start, this.end);
		if(newPomo.validate()) {
			return newPomo;
		} else {
			return undefined;
		}
	}
	startPomo() {
		this.timer = this.timerService.startTimer(this.duration);
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
	getTimeLeft(): Duration {
		if(this.state === 'stopped') {
			return this.duration;
		}
		else return this.timerService.timeLeft(this.timer);
	}
	selectDuration(duration: Duration) {
		this.duration = duration;
	}
	parseDuration(duration: Duration, mode = 'mm:ss') {
		return moment.utc(duration.asMilliseconds()).format(mode);
	}
}

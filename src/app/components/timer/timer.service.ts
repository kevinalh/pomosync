import { Injectable } from '@angular/core';

import { PomoSession } from '../../shared/pomosession.model';

import { Moment, Duration } from 'moment';

import * as shortid from 'shortid';
import Timr from 'timrjs';
import * as moment from 'moment';

@Injectable()
export class TimerService {
	private _start: Moment;
	private _end: Moment;
	private _state: string;
	private _timer: any;
	constructor() {
		this._state = 'stopped';
	}
	set start(time: Moment) {
		this._start = time;
	}
	get start(): Moment {
		return this._start;
	}
	set end(time: Moment) {
		this._end = time;
	}
	get end(): Moment {
		return this._end;
	}
	get state(): string {
		return this._state;
	}
	private createTimer(duration: Duration) {
		this._timer = Timr(duration.asSeconds());
	}
	startTimer(duration: Duration): void {
		this.createTimer(duration);
		this._timer.start();
		this._state = 'running';
		this.start = moment();
	}
	pauseTimer(): void {
		this._timer.pause();
		this._state = 'paused';
	}
	resumeTimer(): void {
		this._timer.start();
		this._state = 'running';
	}
	stopTimer(): void {
		this._timer.stop();
		this._state = 'stopped';
		this.end = moment();
	}
	timeLeft(): Duration {
		return moment.duration(this._timer.getCurrentTime(), 'seconds');
	}
}

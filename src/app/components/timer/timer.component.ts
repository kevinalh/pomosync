import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Moment, Duration } from 'moment';
import * as moment from 'moment';

import { TimerService } from './timer.service';
import { PomoSessionService } from '../session/pomosession.service';

import { Pomo } from '../../shared/pomo.model';
import { PomoSession } from '../../shared/pomosession.model';

/**
 * Component that displays the timer.
 *
 * @export
 * @class TimerComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['../../../assets/scss/timer.component.scss'],
	providers: [TimerService, PomoSessionService]
})
export class TimerComponent implements OnInit {
	duration: Duration;
	pomoSession: PomoSession;
	durationOptions: Duration[];
	@Output() titleAdd = new EventEmitter<string>();
	constructor(private timerService: TimerService,
		private sessionService: PomoSessionService) {}
	ngOnInit(): void {
		this.durationOptions = [moment.duration(5, 'minutes'),
			moment.duration(10, 'minutes'), moment.duration(15, 'minutes'),
			moment.duration(20, 'minutes'), moment.duration(25, 'minutes'),
			moment.duration(30, 'minutes')];
		this.duration = this.durationOptions[4];
		this.pomoSession = this.sessionService.createPomoSession();
	}
	startPomo(): void {
		this.timerService.startTimer(this.duration);
	}
	pausePomo(): void {
		this.timerService.pauseTimer();
	}
	resumePomo(): void {
		this.timerService.resumeTimer();
	}
	stopPomo(): void {
		if (this.timerService.state === 'paused' || 'running') {
			this.timerService.stopTimer();
			const current: Pomo = this.sessionService.createPomo(this.timerService.start, this.timerService.end);
			this.sessionService.registerPomo(current, this.pomoSession);
			this.titleAdd.emit('');
		}
	}
	switchPomo(): void {
		const current = this.timerService.state;
		if (current === 'stopped') {
			this.startPomo();
		} else if (current === 'running') {
			this.stopPomo();
		}
	}
	/**
	 * Returns the time left in the current timer.
	 * Also sets the title.
	 *
	 * @returns {Duration}
	 * @memberof TimerComponent
	 */
	getTimeLeft(): Duration {
		if (this.timerService.state === 'stopped') {
			return this.duration;
		}
		const timeLeft = this.timerService.timeLeft();
		this.titleAdd.emit(this.parseDuration(timeLeft, 'mm:ss'));
		return timeLeft;
	}
	selectDuration(duration: Duration): void {
		this.duration = duration;
	}
	/**
	 * Parses a Duration object using certain format.
	 *
	 * @param {Duration} duration
	 * @param {string} [mode='mm:ss'] - Format used for parsing.
	 * @returns {string}
	 * @memberof TimerComponent
	 */
	parseDuration(duration: Duration, mode = 'mm:ss'): string {
		return moment.utc(duration.asMilliseconds()).format(mode);
	}
	buttonText(): string {
		if (this.timerService.state === 'running') {
			return 'Stop';
		} else {
			return 'Start';
		}
	}
	getState(): string {
		return this.timerService.state;
	}
}

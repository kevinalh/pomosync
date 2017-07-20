import { Injectable } from '@angular/core';

import { PomoSession } from '../../shared/pomosession.model';

import { Duration } from 'moment';

import * as shortid from 'shortid';
import Timr from 'timrjs';
import * as moment from 'moment';

@Injectable()
export class TimerService {
	startTimer(duration: Duration): any {
		let timer = Timr(duration.asSeconds());
		timer.start();
		return timer;
	}
	pauseTimer(timer) {
		timer.pause();
	}
	resumeTimer(timer) {
		timer.start();
	}
	stopTimer(timer) {
		timer.stop();
	}
	timeLeft(timer): Duration {
		return moment.duration(timer.getCurrentTime(), 'seconds');
	}
}

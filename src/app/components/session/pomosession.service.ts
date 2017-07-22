import { Injectable } from '@angular/core';

import { PomoSession } from '../../shared/pomosession.model';
import { Pomo } from '../../shared/pomo.model';

import { Moment, Duration } from 'moment';

import * as shortid from 'shortid';
import * as moment from 'moment';

@Injectable()
export class PomoSessionService {
	createPomoSession(): PomoSession {
		const newSession = new PomoSession();
		return newSession;
	}
	joinPomoSession(oldSession: PomoSession) {

	}
	registerPomo(pomo: Pomo, pomoSession: PomoSession) {
		return pomoSession.registerPomo(pomo);
	}
	/**
	 * Creates a Pomo object based on the start and
	 * end parameters.
	 *
	 * @param {Moment} start
	 * @param {Moment} end
	 * @returns {Pomo}
	 * @memberof PomoSessionService
	 */
	createPomo(start: Moment, end: Moment): Pomo {
		const newPomo = new Pomo(start, end);
		if (newPomo.validate()) {
			return newPomo;
		} else {
			return undefined;
		}
	}
}

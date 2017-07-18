import { Injectable } from '@angular/core';

import { PomoSession } from '../../shared/pomosession.model';
import { Pomo } from '../../shared/pomo.model'

import { Duration } from 'moment';

import * as shortid from 'shortid';
import Timr from 'timrjs';
import * as moment from 'moment';

@Injectable()
export class PomoSessionService {
	createPomoSession(): PomoSession {
		let newSession = new PomoSession();
		return newSession;
	}
	joinPomoSession(oldSession: PomoSession) {

	}
	registerPomo(pomo: Pomo, pomoSession: PomoSession) {
		return pomoSession.registerPomo(pomo);
	}
}

import { Moment, Duration } from 'moment';

import * as moment from 'moment';

export class Pomo {
	start: Moment;
	end: Moment;
	constructor(start: Moment, end: Moment) {
		this.start = start;
		this.end = end;
	}
	validate(): boolean {
		return true;
	}
	print(mode?: string): string {
		return this.start.format(mode) + ' ' + this.end.format(mode);
	}
}

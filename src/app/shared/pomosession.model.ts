import { Pomo } from './pomo.model';

import * as shortid from 'shortid';

export class PomoSession {
	private _pomos: Pomo[];
	private _id: string;
	constructor(initId?: string) {
		if (initId) {
			this._id = initId;
		}
		if (!this._pomos) {
			this._pomos = [];
		}
	}
	get id(): string {
		if (this._id) {
			return this._id;
		}
		console.error('Session id not yet defined');
		return undefined;
	}
	get pomos(): Pomo[] {
		return this._pomos;
	}
	generateSessionId(): string {
		try {
			if (this._id) {
				throw Error('Session id already exists.');
			} else {
				this._id = shortid.generate();
			}
		} catch (e) {
			console.error(e.message);
		}
		return this.id;
	}
	registerPomo(pomo: Pomo): number {
		if (pomo.validate()) {
			return this._pomos.push(pomo);
		}
		console.warn('Current pomo is invalid.');
		return this._pomos.length;
	}
}

import { Pomo } from './pomo.model';

import * as shortid from 'shortid';

export class PomoSession {
	pomos: Pomo[];
	id: string;
	constructor(id?: string) {
		if(id) this.id = id;
	}
	getSessionId(): string {
		if(this.id) {
			return this.id;
		}
		console.error("Session id not yet defined");
		return undefined;
	}
	generateSessionId(): string {
		try {
			if(this.id) {
				throw Error("Session id already exists.");
			} else {
				this.id = shortid.generate();
			}
		} catch(e) {
			console.error(e.message);
		}
		return this.id;
	}
	registerPomo(pomo: Pomo): number {
		if(pomo.validate()) {
			return this.pomos.push(pomo);
		}
		console.warn("Current pomo is invalid.");
		return this.pomos.length;
	}
}

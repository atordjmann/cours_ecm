import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalService {

    isModalLoggingActive = false;
    isModalLoggingActiveSubject = new Subject<boolean>();

    constructor() { }


    // Gestion de la modal de logging
    manageModale() {
        this.isModalLoggingActive = !this.isModalLoggingActive;
        this.emitBoolModalSubject(this.isModalLoggingActive);
    }

    emitBoolModalSubject(isActive: boolean) {
        this.isModalLoggingActiveSubject.next(isActive);
    }
}

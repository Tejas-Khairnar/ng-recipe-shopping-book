import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    // error message coming from its parent component i.e AuthComponent
    @Input() message: string;

    // store event to close modal using EventEmitter object
    @Output() close = new EventEmitter<void>();

    // when user hit close button of modal
    onCloseModal() {
        // emit event to  outside i.e inside AuthComponent for closing modal
        this.close.emit();
    }
}
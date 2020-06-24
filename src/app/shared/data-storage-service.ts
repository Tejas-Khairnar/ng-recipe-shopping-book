// only to focus on http functionality here

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root' // alternative for adding service in app.module providers: []
})
export class DataStoraeService {

    // inject HttpClient service here
    constructor(private http: HttpClient) { }
}
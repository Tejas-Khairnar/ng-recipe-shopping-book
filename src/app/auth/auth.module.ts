import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            // empty this path here and add it to app-routing module to load this module lazily
            { path: '', component: AuthComponent } // localhost:4200/auth
        ])
    ]
})
export class AuthModule { }
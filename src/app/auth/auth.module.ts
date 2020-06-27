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
            { path: 'auth', component: AuthComponent } // localhost:4200/auth
        ])
    ]
})
export class AuthModule { }
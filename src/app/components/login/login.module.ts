import { NgModule } from '@angular/core';;
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule
    ],
    providers: [
        provideAnimations()
    ]
})
export class LoginModule { }

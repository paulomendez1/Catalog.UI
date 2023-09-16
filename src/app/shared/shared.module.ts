import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { FormControlPipe } from "./form-control.pipe";
import { RouterTestingModule } from "@angular/router/testing";

@NgModule({
    declarations: [
        FormControlPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FormControlPipe
    ]
})

export class SharedModule { }
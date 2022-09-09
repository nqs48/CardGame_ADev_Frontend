import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './components/form-login/form-login.component';



@NgModule({
  declarations: [FormLoginComponent],
  imports: [CommonModule],
  exports: [FormLoginComponent]
})

export class AuthModule {}

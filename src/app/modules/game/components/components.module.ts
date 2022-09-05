import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FormLoginComponent } from './form-login/form-login.component';



@NgModule({
  declarations: [HeaderNavComponent, FormLoginComponent],
  imports: [CommonModule],
  exports: [HeaderNavComponent, FormLoginComponent],
})
export class ComponentsModule {}

import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskEffects } from './dashboard/task-management/data/store/effects/task.effects';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './dashboard/task-management/data/store/reducers/task.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ task: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [provideAnimations(), // required animations providers
  provideToastr(),],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';
import { AppealToJobModule } from './appeal-to-job/appeal-to-job.module';
import { AdvertsModule } from './adverts/adverts.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProfileModule,
    AppealToJobModule,
    AdvertsModule
  ]
})
export class ComponentsModule { }

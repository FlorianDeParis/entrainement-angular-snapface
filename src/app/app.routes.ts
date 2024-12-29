import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { RoutesListComponent } from './routes-list/routes-list.component';

export const routes: Routes = [
  { path: 'routes-list', component: RoutesListComponent },
  { path: 'template-form', component: TemplateFormComponent },
  { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
  { path: 'facesnaps', component: FaceSnapListComponent },
  { path: '', component: LandingPageComponent }
];

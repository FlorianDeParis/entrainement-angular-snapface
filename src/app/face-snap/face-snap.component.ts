import { Component, Input } from '@angular/core';
import { FaceSnap } from './../models/face-snap';
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions
],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnap;

  constructor(private router: Router){}

  onViewFaceSnap(){
    this.router.navigateByUrl(`/facesnaps/${this.faceSnap.id}`)
  }
}

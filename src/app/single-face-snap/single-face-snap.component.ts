import { FaceSnapsService } from '../services/face-snaps.service';
import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    DatePipe,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    RouterLink
],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  userHasSnapped!: boolean;
  snapButtonText!: string;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getFaceSnap();
    this.prepareInterface();
  }

  onSnap(): void {
    if(this.userHasSnapped){
      this.unSnap();
    } else{
      this.snap();
    }
  }

  unSnap(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    this.setSnapButtonState('unsnap');
  }

  snap(): void {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.setSnapButtonState('snap');
  }

  private setSnapButtonState(state: ('snap' | 'unsnap') ): void {
    if(state === 'snap'){
      this.userHasSnapped = true;
      this.snapButtonText = "unsnap !";
      return;
    }
    this.userHasSnapped = false;
    this.snapButtonText = "snap !";
  }

  private prepareInterface(): void {
    if(this.userHasSnapped){
      this.snapButtonText = "unsnap !";
      return;
    }
    this.snapButtonText = "snap !";
  }

  private getFaceSnap(): void {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
    this.userHasSnapped = this.faceSnap.alreadySnapped;
  }
}

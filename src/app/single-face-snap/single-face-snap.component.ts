import { FaceSnap } from './../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    CommonModule,
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
    RouterLink,
    AsyncPipe
],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  // faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
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
    // this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap'); // Snap request over http will be added later
    this.setSnapButtonState('unsnap');
  }

  snap(): void {
    // this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap'); // Snap request over http will be added later
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
    // this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
    this.faceSnap$ = this.faceSnapsService.fetchFaceSnapById(faceSnapId);
    // this.userHasSnapped = this.faceSnap$.alreadySnapped;
  }
}

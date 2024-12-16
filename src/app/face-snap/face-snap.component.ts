import { FaceSnapsService } from './../services/face-snaps.service';
import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from './../models/face-snap';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-face-snap',
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
    MatCardActions
],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  userHasSnapped!: boolean;
  snapButtonText!: string;

  constructor(private faceSnapsService: FaceSnapsService){}

  ngOnInit(): void {
    this.userHasSnapped = false;
    this.snapButtonText = "snap !";
  }

  onSnap(){
    if(this.userHasSnapped){
      this.unSnap();
    } else{
      this.snap();
    }
  }

  unSnap(){
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    this.snapButtonText = "snap !";
    this.userHasSnapped = false;
  }

  snap(){
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.snapButtonText = "unsnap !";
    this.userHasSnapped = true;
  }
}

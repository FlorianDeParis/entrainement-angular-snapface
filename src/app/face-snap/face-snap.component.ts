import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from './../models/face-snap';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    MatButtonModule,
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
    this.snapButtonText = "snap !";
    this.faceSnap.removeSnap();
    this.userHasSnapped = false;
  }

  snap(){
    this.snapButtonText = "unsnap !";
    this.faceSnap.addSnap();
    this.userHasSnapped = true;
  }
}

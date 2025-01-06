import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from './../services/face-snaps.service';
import { interval, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    CommonModule,
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy{
  // faceSnaps!: FaceSnap[];
  facesnaps$!: Observable<FaceSnap[]>;
  private destroy$!: Subject<boolean>;

  constructor(private FaceSnapsService: FaceSnapsService){}

  ngOnInit(): void {
    // this.faceSnaps = this.FaceSnapsService.getFaceSnaps();

    // this.destroy$ = new Subject<boolean>();
    // interval(1000).pipe(
    //   takeUntil(this.destroy$),
    //   tap(value => console.log(value))
    // ).subscribe();

    this.facesnaps$ = this.FaceSnapsService.fetchFaceSnaps();
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
  }
}

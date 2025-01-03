import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from './../services/face-snaps.service';
import { interval, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy{
  faceSnaps!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  constructor(private FaceSnapsService: FaceSnapsService){}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.FaceSnapsService.getFaceSnaps();

    interval(1000).pipe(
      takeUntil(this.destroy$),
      tap(value => console.log(value))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}

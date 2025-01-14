import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from './../services/face-snaps.service';
import { interval, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
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
  private destroy$: Subject<void> = new Subject();
  private subscription: Subscription = new Subscription();

  constructor(private FaceSnapsService: FaceSnapsService){}

  ngOnInit(): void {
    // this.faceSnaps = this.FaceSnapsService.getFaceSnaps();

    this.subscription.add(
      interval(1000).pipe(
        // takeUntil(this.destroy$),
        tap(value => console.log(value))
      ).subscribe()
    );

    this.facesnaps$ = this.FaceSnapsService.getFaceSnaps();
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}

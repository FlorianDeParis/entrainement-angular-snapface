import { SnapType } from './../models/snap-type.type';
import { FaceSnap } from './../models/face-snap';
import { Component, Injectable } from "@angular/core";
import { getRandomIntInclusive } from '../utils/random';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { formAddFaceSnap } from '../models/form.type';

@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService{

  constructor(private http: HttpClient){}

  private faceSnaps: FaceSnap[] = [];

  getFaceSnaps(): Observable<FaceSnap[]>{
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: string): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: string, snapType: SnapType): Observable<FaceSnap>{
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`,updatedFaceSnap))
    );
  }

  getRandomFaceSnapNumber(): number {
    return getRandomIntInclusive(0, (this.faceSnaps.length-1));
  }

  getRandomFaceSnap(): FaceSnap {
    return this.faceSnaps[this.getRandomFaceSnapNumber()]
  }

  // addFaceSnap(formValue: {
  //   title: string,
  //   description: string,
  //   imageUrl: string,
  //   location?: string
  // }) {
  //   const { title, description, imageUrl, location } = formValue;
  //   const faceSnap = new FaceSnap(
  //     title,
  //     description,
  //     imageUrl,
  //     new Date(),
  //     0
  //   );
  //   if(location){
  //     faceSnap.withLocation(location);
  //   }
  //   this.faceSnaps.push(faceSnap);
  // }

  addFaceSnap(formValue: formAddFaceSnap): Observable<FaceSnap>{
    return this.getFaceSnaps().pipe(
      map(faceSnaps => faceSnaps[faceSnaps.length - 1]),
      map(previousFaceSnap => ({
        id: crypto.randomUUID().substring(0,8),
        ...formValue,
        createdAt: new Date(),
        snaps: 0,
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap))
    );
  }
}

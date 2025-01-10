import { SnapType } from './../models/snap-type.type';
import { FaceSnap } from './../models/face-snap';
import { Component, Injectable } from "@angular/core";
import { getRandomIntInclusive } from '../utils/random';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, switchMap, tap } from 'rxjs';

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

  getRandomFaceSnap() {
  //  return this.getFaceSnaps().subscribe(
  //   faceSnap => {
  //     console.log(faceSnap.length)
  //     const rand = getRandomIntInclusive(0, faceSnap.length - 1);
  //     faceSnap = faceSnap[rand];
  //   }
  //  );

    return this.getFaceSnaps().pipe(
      map(faceSnaps => {
        const rand = getRandomIntInclusive(0, faceSnaps.length - 1);
        console.log(rand)
        faceSnaps.filter((faceSnap, id) => {
          console.log(faceSnap, id)
          if(id === rand){
            console.log("yes")
            return faceSnap;
          }
          console.log("nope")
          return;
        })
      })
    ).subscribe();
  }

  getRandomFaceSnapNumber(maxLength: number): number {
    return getRandomIntInclusive(0, maxLength);
  }

  // getRandomFaceSnap(): FaceSnap {
  //   return this.faceSnaps[this.getRandomFaceSnapNumber()]
  // }

  addFaceSnap(formValue: {
    title: string,
    description: string,
    imageUrl: string,
    location?: string
  }) {
    const { title, description, imageUrl, location } = formValue;
    const faceSnap = new FaceSnap(
      title,
      description,
      imageUrl,
      new Date(),
      0
    );
    if(location){
      faceSnap.withLocation(location);
    }
    this.faceSnaps.push(faceSnap);
  }
}

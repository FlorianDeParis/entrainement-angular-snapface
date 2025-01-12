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

  private faceSnaps: FaceSnap[] = [];

  constructor(private http: HttpClient){}

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

  // getRandomFaceSnap(): Observable<FaceSnap> {
  //   return this.getFaceSnaps().pipe(
  //     map(
  //       (faceSnaps, index) => {
  //         const rand = getRandomIntInclusive(0, faceSnaps.length - 1);
  //         const FSRand = faceSnaps[rand];
  //         console.log(faceSnaps);
  //         console.log(rand);
  //         console.log(FSRand);
  //         console.log(index);
  //         faceSnaps = [FSRand];
  //       }
  //     )
  //   );
  // }

  getRandomFaceSnapNumber(maxLength: number): number {
    return getRandomIntInclusive(0, maxLength);
  }

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

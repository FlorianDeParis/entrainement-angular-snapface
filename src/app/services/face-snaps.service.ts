import { SnapType } from './../models/snap-type.type';
import { FaceSnap } from './../models/face-snap';
import { Component, Injectable } from "@angular/core";
import { getRandomIntInclusive } from '../utils/random';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService{

  constructor(private http: HttpClient){}

  // private faceSnaps: FaceSnap[] = [
  //   new FaceSnap(
  //     "La Tour Eiffel",
  //     "Ceci est une photo prise devant la tour Eiffel",
  //     "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
  //     new Date(),
  //     5
  //   ),
  //   new FaceSnap(
  //     "L'Arc de Triomphe",
  //     "Photo des Champs Elysées donnant lieu sur l'Arc de Triomphe de Paris",
  //     "https://cdn.pixabay.com/photo/2013/04/07/21/29/arc-de-triomphe-101633_1280.jpg",
  //     new Date(),
  //     10
  //   ).withLocation('Les Champs Elysées'),
  //   new FaceSnap(
  //     "Le Louvre",
  //     "Photo de la pyramide du Louvre",
  //     "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
  //     new Date(),
  //     25
  //   ),
  // ];
  private faceSnaps: FaceSnap[] = [];

  getFaceSnaps(): FaceSnap[] {
    return [...this.faceSnaps];
  }

  fetchFaceSnaps(): Observable<FaceSnap[]>{
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: string): FaceSnap {
    const foundFaceSnap: FaceSnap | undefined = this.faceSnaps.find(faceSnap => faceSnap.id == faceSnapId);
    if(!foundFaceSnap){
      throw new Error('FaceSnap not found.');
    }
    return foundFaceSnap;
  }

  fetchFaceSnapById(faceSnapId: string): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: string, SnapType: SnapType): void{
    // const faceSnap: FaceSnap = this.getFaceSnapById(faceSnapId);
    //faceSnap.snap(SnapType);
  }

  getRandomFaceSnapNumber(): number {
    return getRandomIntInclusive(0, (this.faceSnaps.length-1));
  }

  getRandomFaceSnap(): FaceSnap {
    return this.faceSnaps[this.getRandomFaceSnapNumber()]
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

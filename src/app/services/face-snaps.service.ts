import { SnapType } from './../models/snap-type.type';
import { FaceSnap } from './../models/face-snap';
import { Injectable } from "@angular/core";
import { getRandomIntInclusive } from '../utils/random';
import FaceSnapJson from './../../../public/assets/data/facesnaps.json';

@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService{
  private faceSnaps: FaceSnap[] = [
    new FaceSnap(
      "La Tour Eiffel",
      "Ceci est une photo prise devant la tour Eiffel",
      "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
      new Date(),
      5
    ),
    new FaceSnap(
      "L'Arc de Triomphe",
      "Photo des Champs Elysées donnant lieu sur l'Arc de Triomphe de Paris",
      "https://cdn.pixabay.com/photo/2013/04/07/21/29/arc-de-triomphe-101633_1280.jpg",
      new Date(),
      10
    ).withLocation('Les Champs Elysées'),
    new FaceSnap(
      "Le Louvre",
      "Photo de la pyramide du Louvre",
      "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
      new Date(),
      25
    ),
  ];
  private faceSnapsByJson: any;

  constructor(){
    // console.log(FaceSnapJson);
    this.parseFaceSnapsFromJson();
  }

  parseFaceSnapsFromJson(): void {
    FaceSnapJson.map(
      snap => {
        console.log(snap);
        this.faceSnaps.push(
          new FaceSnap(
            snap.titre,
            snap.description,
            snap.url_photo,
            new Date(snap.date_publication),
            snap.likes
          )
        )
      }
    )
  }

  getFaceSnapsbyJson(): string {
    return this.faceSnapsByJson;
  }

  getFaceSnaps(): FaceSnap[] {
    return [...this.faceSnaps];
  }

  getFaceSnapById(faceSnapId: string): FaceSnap {
    const foundFaceSnap: FaceSnap | undefined = this.faceSnaps.find(faceSnap => faceSnap.id == faceSnapId);
    if(!foundFaceSnap){
      throw new Error('FaceSnap not found.');
    }
    return foundFaceSnap;
  }

  snapFaceSnapById(faceSnapId: string, SnapType: SnapType): void{
    const faceSnap: FaceSnap = this.getFaceSnapById(faceSnapId);
    faceSnap.snap(SnapType);
  }

  getRandomFaceSnapNumber(): number {
    return getRandomIntInclusive(0, (this.faceSnaps.length-1));
  }

  getRandomFaceSnap(): FaceSnap {
    return this.faceSnaps[this.getRandomFaceSnapNumber()]
  }
}

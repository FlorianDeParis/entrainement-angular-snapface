import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  mySnap!: FaceSnap;
  myOtherSnap!: FaceSnap;
  myLastSnap!: FaceSnap;

  ngOnInit(): void {
    this.mySnap = new FaceSnap(
      "La Tour Eiffel",
      "Ceci est une photo prise devant la tour Eiffel",
      "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg",
      new Date(),
      5
    );
    this.myOtherSnap = new FaceSnap(
      "L'Arc de Triomphe",
      "Photo des Champs Elysées donnant lieu sur l'Arc de Triomphe de Paris",
      "https://cdn.pixabay.com/photo/2013/04/07/21/29/arc-de-triomphe-101633_1280.jpg",
      new Date(),
      10
    );
    this.myLastSnap = new FaceSnap(
      "Le Louvre",
      "Photo de la pyramide du Louvre",
      "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
      new Date(),
      25
    );
  }
}

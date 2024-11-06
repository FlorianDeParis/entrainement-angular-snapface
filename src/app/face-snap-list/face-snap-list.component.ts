import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit{
  faceSnaps!: FaceSnap[];
  ngOnInit(): void {
    this.faceSnaps = [
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
      ),
      new FaceSnap(
        "Le Louvre",
        "Photo de la pyramide du Louvre",
        "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
        new Date(),
        25
      ),
    ];


    this.faceSnaps[1].setLocation('Champs Elysées');
  }
}

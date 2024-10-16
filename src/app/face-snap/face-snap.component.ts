import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;

  ngOnInit(): void {
    this.title = "La Tour Eiffel";
    this.description = "Ceci est une photo prise devant la tour Eiffel";
    this.createdAt = new Date();
    this.snaps = 0;
  }
}

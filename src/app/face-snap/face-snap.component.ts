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
  imageUrl!: string;
  userHasSnapped!: boolean;
  snapButtonText!: string;

  ngOnInit(): void {
    this.title = "La Tour Eiffel";
    this.description = "Ceci est une photo prise devant la tour Eiffel";
    this.createdAt = new Date();
    this.snaps = 5;
    this.imageUrl = "https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_1280.jpg";
    this.userHasSnapped = false;
    this.snapButtonText = "snap !";
  }

  onSnap(){
    if(this.userHasSnapped){
      this.unSnap();
    } else{
      this.snap();
    }
  }

  unSnap(){
    this.snapButtonText = "snap !";
    this.snaps--;
    this.userHasSnapped = false;
  }

  snap(){
    this.snapButtonText = "unsnap !";
    this.snaps++;
    this.userHasSnapped = true;
  }
}

import { FaceSnap } from '../models/face-snap';
import { customRoute } from '../models/routes-list.type';
import { FaceSnapsService } from './../services/face-snaps.service';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.scss'
})

export class RoutesListComponent implements OnInit {
  myRoutes!: customRoute[];
  randomSnap$!: Observable<FaceSnap>;
  // randomSnapId!: string;

  constructor(private FaceSnapsService: FaceSnapsService){
    // this.randomSnapId = this.FaceSnapsService.getRandomFaceSnap().id.toString();
    const random$ = this.FaceSnapsService.getRandomFaceSnap();
    console.log('random$');
    console.log(random$);
  }

  ngOnInit(): void {
    this.myRoutes = [
      { id:"start", name:"Accueil", path:"" },
      { id:"facesnaplist", name:"Liste des FaceSnaps", path:"/facesnaps" },
      // { id:"facesnapcard", name:"Accès à la carte d'un FaceSnap", path:`/facesnaps/${this.randomSnapId}`, desc: "Id du FaceSnap requis pour y accéder"},
      { id:"facesnapcard", name:"Accès à la carte d'un FaceSnap", path:`/facesnaps/1`, desc: "Id du FaceSnap requis pour y accéder"},
      { id:"facesnapcreate", name:"Créer un FaceSnap", path:'/create'},
      { id:"templateform", name:"Exemple d'un 'template form'", path:"/template-form" },
      { id:"routeslist", name:"Index des routes disponibles", path:"/routes-list" },
    ];
  }
}

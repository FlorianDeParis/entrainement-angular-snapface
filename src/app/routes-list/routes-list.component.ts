import { FaceSnap } from '../models/face-snap';
import { customRoute } from '../models/routes-list.type';
import { FaceSnapsService } from './../services/face-snaps.service';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { from, map, Observable, of, takeUntil, tap } from 'rxjs';

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
  FaceSnap$!: Observable<FaceSnap[]>;
  randomSnap$!: Observable<FaceSnap>;
  returnedFaceSnap!: FaceSnap;

  constructor(private FaceSnapsService: FaceSnapsService){
    // this.randomSnapId = this.FaceSnapsService.getRandomFaceSnap().id.toString();
    this.randomSnap$ = this.FaceSnapsService.getRandomFaceSnap$();
    console.log('random$');
    this.FaceSnap$ = this.FaceSnapsService.getFaceSnaps();
  }

  ngOnInit(): void {
    this.myRoutes = [
      { id:"start", name:"Accueil", path:"" },
      { id:"facesnaplist", name:"Liste des FaceSnaps", path:"/facesnaps" },
      // { id:"facesnapcard", name:"Accès à la carte d'un FaceSnap", path:`/facesnaps/${this.randomSnapId}`, desc: "Id du FaceSnap requis pour y accéder"},
      { id:"facesnapcard", name:"Accès à la carte d'un FaceSnap", path:`/facesnaps/__randomFaceSnapId__`, desc: "Id du FaceSnap requis pour y accéder"},
      { id:"facesnapcreate", name:"Créer un FaceSnap", path:'/create'},
      { id:"templateform", name:"Exemple d'un 'template form'", path:"/template-form" },
      { id:"routeslist", name:"Index des routes disponibles", path:"/routes-list" },
    ];


    this.randomSnap$.pipe(
      tap(data => {
        console.log(data);
        this.returnedFaceSnap = data;
      })
    ).subscribe()

    const routes: Observable<customRoute> = from(this.myRoutes);
    routes.pipe(
      takeUntil(this.randomSnap$),
      tap(route => console.log(route)),
      map(
        route => ({
          ...route,
          path : route.path.replace("__randomFaceSnapId__",this.returnedFaceSnap.id)
        })
      ),
      tap(route => console.log('custom route: '+ route))
    ).subscribe();
  }
}

import { FaceSnap } from '../models/face-snap';
import { customRoute } from '../models/routes-list.type';
import { FaceSnapsService } from './../services/face-snaps.service';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, concatMap, from, map, Observable, of, takeUntil, tap, zip } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.scss'
})

export class RoutesListComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap[]>;
  randomSnap$!: Observable<FaceSnap>;

  myRoutes!: customRoute[];
  routes$!: Observable<customRoute[]>;

  constructor(private FaceSnapsService: FaceSnapsService){
    this.randomSnap$ = this.FaceSnapsService.getRandomFaceSnap$();
    this.faceSnap$ = this.FaceSnapsService.getFaceSnaps();
  }

  ngOnInit(): void {
    this.myRoutes = [
      { id:"start", name:"Accueil", path:"" },
      { id:"facesnaplist", name:"Liste des FaceSnaps", path:"/facesnaps" },
      { id:"facesnapcard", name:"Accès à la carte d'un FaceSnap", path:`/facesnaps/__randomFaceSnapId__`, desc: "Id du FaceSnap requis pour y accéder"},
      { id:"facesnapcreate", name:"Créer un FaceSnap", path:'/create'},
      { id:"templateform", name:"Exemple d'un 'template form'", path:"/template-form" },
      { id:"routeslist", name:"Index des routes disponibles", path:"/routes-list" },
    ];
    this.routes$ = of(this.myRoutes);

    this.randomSnap$.subscribe(data => {
      console.log(data);
      this.routes$.pipe(
        map(routes => {
          return routes.map(route => {
            return {
              ...route,
              path : route.path.replace("__randomFaceSnapId__",data.id)
            };
          })
        }),
        tap(routes => {
          console.log('custom route: ');
          console.log(routes);
        })
      ).subscribe();
    })
  }
}

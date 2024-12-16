import { SnapType } from './snap-type.type';
export class FaceSnap {

  location?: string;
  id: string;

  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public createdAt: Date,
    public snaps: number
  ){
    this.id = crypto.randomUUID().substring(0,8);
    console.log(this);
  }

  addSnap(): void {
    this.snaps++;
  }

  removeSnap(): void {
    this.snaps--;
  }

  snap(SnapType: SnapType){
    if(SnapType === 'snap'){
      this.addSnap();
    } else if (SnapType === 'unsnap') {
      this.removeSnap();
    }
  }

  setLocation(location: string): void {
    this.location = location;
  }

  withLocation(location: string): FaceSnap {
    this.setLocation(location);
    return this;
  }
}

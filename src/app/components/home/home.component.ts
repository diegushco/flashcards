import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  groups:any = {};
  index = 0;
  cardSelected:any = null;
  image:any = null;
  flip = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private webService:WebService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.webService.getGroups().subscribe(
      (res:any)=>{
        console.log(res)
        this.groups = res?.groups[0];
        this.cardSelected = this.groups.cards[this.index];
        this.getImage();
      }
    );
  }

  back(){
    if(this.index-1 >= 0){
      this.image = null;
      this.index--;
       this.cardSelected = this.groups.cards[this.index];
       this.getImage();
       this.flip = false;
    }
  }

  next(){
    if(this.index+1 < this.groups.cards.length){
      this.image = null;

      this.index++;
       this.cardSelected = this.groups.cards[this.index];
       this.getImage();
       this.flip = false;

    }
  }

  getImage(){
    this.webService.getImageBySearch(this.cardSelected.worden).subscribe(
      (res)=>{
        console.log("IMAGE", res)
        if(res.hits.length > 0){
          console.log("random", Math.floor((Math.random() * ((res.hits.length-1) - 0 + 1)) + 0))
          this.image = res.hits[Math.floor((Math.random() * ((res.hits.length-1) - 0 + 1)) + 0)].previewURL;
        }else{
          this.image = './assets/no.PNG';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

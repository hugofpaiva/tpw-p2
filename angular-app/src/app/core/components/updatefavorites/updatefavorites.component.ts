import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from '../../models/client';
import {Product} from '../../models/product';
import {ClientService} from '../../services/client/client.service';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-updatefavorites',
  templateUrl: './updatefavorites.component.html',
  styleUrls: ['./updatefavorites.component.css']
})
export class UpdatefavoritesComponent implements OnInit, OnChanges {

  /*
    Child Component of the Product Component, used in order to add/Remove
    the Product From the Client's Favourites.
   */
  public  isfavourite: boolean;
  @Input() client: Client;
  @Input() product: Product;
  constructor(
    private clientService: ClientService,
    protected alertService: SharedService
  ) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes){
      this.client = changes.client.currentValue;
    }
    this.checkFavourite();
  }
  checkFavourite(): void {
    if (this.client && this.product) {
      for (let fav of this.client.favorites) {
        if (fav.id === this.product.id) {
          console.log('Already a Favourite');
          this.isfavourite = true;
          break;
        }
        else {
          console.log('Not a Favourite');
          this.isfavourite = false;
        }
      }
    }
    else{
      console.log('Data not Loaded..');
    }
  }
  submitChanges(): void {
    if (this.client && this.product){
      if (! this.isfavourite){
        this.client.favorites.push(this.product);
      }
      else {
        this.client.favorites.forEach( (item, index) => {
          if (item.id === this.product.id) { this.client.favorites.splice(index, 1); }
        }); // remove element from array
      }
      const serialized = JSON.stringify(this.client);
      const dict = JSON.parse(serialized);
      const arr: number[] = [];
      this.client.favorites.forEach( r => arr.push(r.id));
      dict.favorites = arr;
      dict.user = this.client.user.id;
      this.clientService.updateClient(dict, this.client.id).subscribe(
        data => {
          this.alertService.clear();
          console.log(data);
          this.client = data;
          this.isfavourite = !this.isfavourite;
          if(this.isfavourite){
            this.alertService.success('Success adding to Favorites!');
          }
          else{
            this.alertService.success('Success removing from Favorites');
          }

        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

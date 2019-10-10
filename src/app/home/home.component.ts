import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _url: string = 'https://demo1064913.mockable.io/products';
 allProducts;
  products: any = [];
  searchText;
  cartProductCount: number = 0;
  favouriteProductCount: number = 0;
  isCartToggled = false;
  isFavToggled = false;


  constructor(private http: HttpClient,
              private renderer: Renderer2
            ) { }

  ngOnInit() {
    this.http.get(this._url).subscribe((data :any) => {
      this.products = data.products;
      this.allProducts = data.products;
      console.log(this.allProducts);
    });
  }


  toggleFavourite(){
    this.isFavToggled  = !this.isFavToggled;
    if(this.isFavToggled){
      this.products = this.products.filter(x =>{
        return x.isFavourite == true;
      })
      if (this.products.length == 0){
        this.products = this.allProducts;
      }
    }else{
      this.products = this.allProducts;
    }
  }

  addToFavourite(productId){
    this.products.map((item, index) => {
      if (item.id === productId) {
        item.isFavourite = !item.isFavourite;
        this.favouriteProductCount = this.products.filter(x => {
          return x.isFavourite == true;
        }).length;
        if(this.isFavToggled){
          this.products = this.products.filter(x =>{
            return x.isFavourite == true;
          });

          if (this.products.length == 0){
            this.products = this.allProducts;
          }
        }
      }
    })
  }

  // Add item in cart on Button click
  // ===============================

  addToCart( productId) {



    // Change button color to green
    this.products.map((item, index) => {
      if (item.id === productId) {
        item.isAdded = !item.isAdded;
         this.cartProductCount = this.products.filter(x => {
               return x.isAdded == true;
        }).length;

        if(this.isCartToggled){
          this.products = this.products.filter(x =>{
            return x.isAdded == true;
          });
          if (this.products.length == 0){
            this.products = this.allProducts;
          };
        }

      }
    })
  }

  toggleCart(){
    this.isCartToggled  = !this.isCartToggled;
    if(this.isCartToggled){
      this.products = this.products.filter(x =>{
        return x.isAdded == true;
      });
      if (this.products.length == 0){
        this.products = this.allProducts;
      }
    }else{
      this.products = this.allProducts;
    }
  }


}

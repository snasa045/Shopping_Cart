import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'sowingo';


  constructor(private router:Router, private route: ActivatedRoute)
  {
    this.router.navigate(['/home']);
   }


}

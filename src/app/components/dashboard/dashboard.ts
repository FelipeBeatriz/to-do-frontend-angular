import { Component } from '@angular/core';
import { AmountBox } from "../amount-box/amount-box";

@Component({
  selector: 'app-dashboard',
  imports: [AmountBox],
  templateUrl: './dashboard.html',
})
export class Dashboard {

}

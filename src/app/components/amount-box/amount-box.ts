import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-amount-box',
  imports: [],
  templateUrl: './amount-box.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountBox {
  dado = input.required<string>();
  quantidade = input.required<number>();
}

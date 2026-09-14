import { Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-choice',
  imports: [NzButtonModule],
  templateUrl: './choice.html',
  styleUrl: './choice.css',
})
export class Choice {
  title = input<number>();
  choice = output<string>();
}

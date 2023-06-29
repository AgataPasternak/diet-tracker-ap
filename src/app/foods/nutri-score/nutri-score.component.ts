import { Component, Input } from '@angular/core';
import { NutriScore } from '../foods.model';

@Component({
  selector: 'app-nutri-score',
  templateUrl: './nutri-score.component.html',
  styleUrls: ['./nutri-score.component.scss']
})
export class NutriScoreComponent {
  @Input() nutriScore: NutriScore;
}

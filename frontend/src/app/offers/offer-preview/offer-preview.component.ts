import { Component, OnInit, Input } from '@angular/core';

import { Offer } from '../../../models/Offer';
import {SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {
  @Input() offer: Offer = new Offer;
  matchingScore: number = 0;
  colorScore!: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.matchingScore = Math.floor(Math.random()*100)
    this.colorScore = this.sanitizer.bypassSecurityTrustStyle("color:" +this.defineColor(this.matchingScore))
  }

  defineColor(percentage : number){
    percentage = +percentage/100;
    let percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
    
    for (var i = 1; i < percentColors.length - 1; i++) {
      if (percentage < percentColors[i].pct) {
          break;
      }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (+percentage - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }
}

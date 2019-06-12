import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-slide-indicator',
  templateUrl: './slide-indicator.component.html',
  styleUrls: ['./slide-indicator.component.css']
})
export class SlideIndicatorComponent implements OnChanges, OnDestroy {

  @Input() elements = 6;
  @Input() timing = 1000;
  value = 0;
  slots: any[] = [];
  width: string;
  slotWidth: string;
  innerSlotWidth: string;
  timer: Subscription;

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  ngOnChanges() {
    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.value = 0;
    this.init();
    this.timer = timer(0, this.timing).subscribe(() => this.value = (this.value + 1) % this.elements);
  }

  private init() {
    const w = 1 / this.elements;
    const x = this.value === 0 ? 1 - w : w;
    const y = w / (x);

    this.width = `${w * 100}%`;
    this.slotWidth = `${x * 100}%`;
    this.innerSlotWidth = `${y * 100}%`;
    this.slots = Array(this.elements);
  }
}

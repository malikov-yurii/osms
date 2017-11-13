import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  templateUrl: 'popup.html',
  styleUrls: ['./popup.css'],
  animations: [
    trigger('fadeInOut', [
      state('destroyed', style({opacity: 0})),
      transition(':enter', [
        style({opacity: 0}),
        animate('0.2s ease', style({opacity: 1}))
      ]),
      transition('* => destroyed', [
        animate('0.2s ease')
      ])
    ]),
    trigger('flyInOut', [
      state('destroyed', style({opacity: 0, transform: 'translateX(-10%)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-90%)'}),
        animate('0.2s ease', style({opacity: 1, transform: 'translateX(-50%)'}))
      ]),
      transition('* => destroyed', [
        animate('0.2s ease')
      ])
    ]),
    trigger('expandHeight', [
      state('0', style({height: '150px'})),
      state('1', style({height: '*'})),
      transition('0 => 1', animate('0.2s ease'))
    ])
  ],
})
export class PopupComponent {
  public data = {};
  public form: FormGroup;
  public hasData: boolean = false;
  public hasFormData: boolean = false;
  public animationState: string = 'idle';
  public header: string = 'Popup header';
  public destroyedStream = new Subject();
  public submittedStream = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  provideWithData(data: any) {
    this.data = data;
    this.hasData = true;
  }

  provideWithFormData(data: {any}) {
    this.data = data;
    this.hasFormData = true;
    this.form = this.formBuilder.group(data);
  }

  onSubmit() {
    this.submittedStream.next(this.form.value);
    this.close();
  }

  close() {
    this.animationState = 'destroyed';
  }

  reset() {
    this.form.reset(this.data);
  }

  onAnimationDone(e) {
    if (e.toState === 'destroyed') {
      this.destroyedStream.next();
    }
  }
}

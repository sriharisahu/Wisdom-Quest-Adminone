import { Component, OnInit, Output, EventEmitter, AfterViewInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { share, distinctUntilChanged, map, pairwise, throttleTime, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentecation.service';

export enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

export enum Direction {
  Up = 'Up',
  Down = 'Down'
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() toggleSideMenu  = new EventEmitter<boolean>();
  switchSideBar = false;
  private isVisible = true;
  currentUser;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  @HostBinding('@toggle')
  // get toggle(): VisibilityState {
  //   return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  // }
  get toggle(): VisibilityState {
    return  VisibilityState.Visible;
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }

  toggleSideBar() {
    this.switchSideBar = !this.switchSideBar;
    this.toggleSideMenu.emit(true);
  }

  logout() {
    this.authenticationService.logout();
    }
}

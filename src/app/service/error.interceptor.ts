import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentecation.service';
import { BsModalService } from 'ngx-bootstrap';
import { ErrorMsgComponent } from '../components/error-msg/error-msg.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private bsModalService: BsModalService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map((response) => {
            if (response['body'] && response['body']['status'] === 'error') {
                const configuartion = {
                    initialState : {
                      msg: response['body']['message'],
                    },
                    class: 'modal-sm'
                  };
                  this.bsModalService.show(ErrorMsgComponent, configuartion);

            }

            return response;
        }),catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

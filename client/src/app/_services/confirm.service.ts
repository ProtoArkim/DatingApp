import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { observable, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelaRef: BsModalRef

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok', btnCancelText = 'Cancel'): Observable<boolean>{
      const config = {
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
      }
      this.bsModelaRef = this.modalService.show(ConfirmDialogComponent, config)

      return new Observable<boolean>(this.getResult())
    }

    getResult(){
      return (observer) => {
        const subscription = this.bsModelaRef.onHidden.subscribe(() => {
          observer.next(this.bsModelaRef.content.result)
          observer.complete()
        })
        return {
          unsubscribe() {
            subscription.unsubscribe()
          }
        }
      }
    }
}

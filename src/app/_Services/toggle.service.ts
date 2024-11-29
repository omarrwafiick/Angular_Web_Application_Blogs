import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService{
  toggle=new BehaviorSubject<boolean>(false);
  loader=new BehaviorSubject<boolean>(false);
}
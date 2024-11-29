import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
@Injectable({
    providedIn: 'root'
  })
export class TitleService{
    constructor(public title:Title,public meta:Meta){}
    TitleAndDesc(pageTitle:string,contentTxt?:string){
        this.title.setTitle(pageTitle);
        this.meta.updateTag({name:'description',content:contentTxt});
    }
}
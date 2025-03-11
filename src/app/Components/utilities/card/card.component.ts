import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../_models/Blog';
import { Category } from '../../../_models/Category';
import { BlogService } from '../../../_services/blog.service';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgStyle } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";
import { Store } from '@ngrx/store';
import { MainBlurb } from '../../../_models/MainBlurb';
import { selectAppUser, selectCategoryById, SelectIsLikedProp, SelectIsSharedProp } from '../../../store/blurb.selector';
import { AddLikeAction, AddShareAction, IsLikedByUserAction, IsSharedByUserAction, RemoveLikeAction, RemoveShareAction } from '../../../store/blurb.action';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, NgStyle, AvatarComponent],
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
  category:Category;
  requests = inject(BlogService);
  userrequests = inject(AuthenticationService);
  toaster = inject(ToastrService);
  store = inject(Store<MainBlurb>);
  @Input()
  isPost:boolean=false; 
  @Input()
  blog:Blog;
  @Input()
  userpost:boolean=false;
  username:string="";
  email:string;
  userid:string;
  liked:boolean=false;
  shared:boolean=false;
  otherusername:string="";
  temp:string="assets/male.png";
  //////////////////////loader after each dispatch with request
  ngOnInit(): void {
    this.store.select(selectCategoryById(this.blog.categoryId)).subscribe(c=>this.category=c);
    
    if(this.isPost||this.userpost){

      this.store.select(selectAppUser).subscribe(d=>this.userid=d.AppData.id);
      this.store.select(selectAppUser).subscribe(d=>this.email=d.AppData.id);
      
      this.store.dispatch(IsLikedByUserAction({blogid:this.blog.id,userid:this.userid}));
      this.store.dispatch(IsSharedByUserAction({blogid:this.blog.id,userid:this.userid}));

      this.store.select(SelectIsLikedProp).subscribe(l=>this.liked=l);
      this.store.select(SelectIsSharedProp).subscribe(s=>this.shared=s);
    }

    if(!this.userpost){
        this.store.select(selectAppUser).subscribe(d=>this.username=d.AppData.userName);
    } 
  }

  Like(blogid:number){
    if(!this.liked){
      this.store.dispatch(AddLikeAction({blogid:blogid,userid:this.userid}));
    }
    else{
      this.store.dispatch(RemoveLikeAction({blogid:blogid,userid:this.userid}));
    }
  }

  Share(blogid:number){
    if(!this.shared){
      this.store.dispatch(AddShareAction({blogid:blogid,userid:this.userid}));
    }
    else{
      this.store.dispatch(RemoveShareAction({blogid:blogid,userid:this.userid}));
    }
  }

  private secretKey = '12fdfpl1pl323233rvdfsdqwqedw';
  Encrypt(id:string):string{
    return CryptoJS.AES.encrypt(id, this.secretKey).toString();
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Blog, CreateBlogObj, UpdateBlogObj } from '../_models/Blog';
import { Category } from '../_models/Category';
import { Store } from '@ngrx/store';
import { MainBlurb } from '../_models/MainBlurb';
import { GetBlogsByACategoryId, SelectABlogById, SelectABlogPage, SelectACategoryById, SelectFeaturedBlogs, SelectUserBlogs } from '../store/blurb.selector';

@Injectable({
  providedIn: 'root'
}) 
export class BlogService {
  http = inject(HttpClient);
  store = inject(Store<MainBlurb>);
  baseUrl=environment.BaseUrl;

  //selectors

  public GetfeaturedBlogs(){
    let output;
    this.store.select(SelectFeaturedBlogs).subscribe(d=>output=d);
    return output;
  } 
/* 
  public GetBlogs_Pagination(skip:number){
    let output;
    if(skip==1){
      this.store.select(SelectABlogPage(0,9)).subscribe(d=>output=d);
    }
    this.store.select(SelectABlogPage(skip+8*2,9)).subscribe(d=>output=d);
    return output;
  } */

  public GetUserBlogs(){
    let output;
    this.store.select(SelectUserBlogs).subscribe(d=>output=d)
    return output;
  }

  public GetBlogById(Id:number){
    let output;
    this.store.select(SelectABlogById(Id)).subscribe(d=>output=d)
    return output;
  }
  
  public GetCategoryById(Id:number){
    let output;
    this.store.select(SelectACategoryById(Id)).subscribe(d=>output=d)
    return output;
  }

  public GetBlogsByCategoryId(Id:number){
    let output;
    this.store.select(GetBlogsByACategoryId(Id)).subscribe(d=>output=d)
    return output;
  }

  //requests
  
  public GetAllBlogs(){
    return this.GetAllBlogsAsync();
  }

  private GetAllBlogsAsync(){
    return this.http.get<Blog[]>(this.baseUrl+"/blogs/getallblogs");
  }

  public GetBlogsPage(take:number,skip:number){
    return this.GetBlogsPageAsync(take,skip);
  }

  private GetBlogsPageAsync(take:number,skip:number){
    return this.http.get<Blog[]>(this.baseUrl+`/blogs/getblogspage?skip=${skip}&take=${take}`);
  }

  public DeleteBlog(Id:number){
    return this.DeleteBlogAsync(Id);
  }

  private DeleteBlogAsync(Id:number){
    return this.http.delete(this.baseUrl+"/blogs/deleteblog?Id="+Id);
  }

  public CreateBlog(blog:CreateBlogObj){
    return this.CreateBlogAsync(blog);
  }

  private CreateBlogAsync(blog:CreateBlogObj){
    return this.http.post(this.baseUrl+"/blogs/createblog",blog);
  }

  public EditBlog(Id:number,blog:UpdateBlogObj){
    return this.EditBlogAsync(Id,blog);
  }

  private EditBlogAsync(Id:number,blog:UpdateBlogObj){
    return this.http.put(this.baseUrl+"/blogs/updateblog?Id="+Id,blog);
  }

  public GetAllCategories(){
    return this.GetAllCategoriesAsync();
  }

  private GetAllCategoriesAsync(){
    return this.http.get<Category[]>(this.baseUrl+"/blogs/getallcategories");
  }

  public AddLike(blogid:number,userid:string){
    return this.AddLikeAsync(blogid,userid);
  }

  private AddLikeAsync(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/blogs/addlike?blogid="+blogid,userid);
  }

  public AddShare(blogid:number,userid:string){
    return this.AddShareAsync(blogid,userid);
  }

  private AddShareAsync(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/blogs/addshare?blogid="+blogid,userid);
  }

  public RemoveLike(blogid:number,userid:string){
    return this.RemoveLikeAsync(blogid,userid);
  } 

  private RemoveLikeAsync(blogid:number,userid:string){
    return this.http.delete(this.baseUrl+"/blogs/removelike?blogid="+blogid+"&userid="+userid);
  } 

  public RemoveShare(blogid:number,userid:string){
    return this.RemoveShareAsync(blogid,userid);
  }

  private RemoveShareAsync(blogid:number,userid:string){
    return this.http.delete(this.baseUrl+"/blogs/removeshare?blogid="+blogid+"&userid="+userid);
  }

  public IsLikedByUser(blogid:number,userid:string){
    return this.IsLikedByUserAsync(blogid,userid);
  }

  private IsLikedByUserAsync(blogid:number,userid:string){
    return this.http.get(this.baseUrl+`/blogs/islikedbyuser?blogid=${blogid}&userid=${userid}`);
  }

  public IsSharedByUser(blogid:number,userid:string){
    return this.IsSharedByUserAsync(blogid,userid);
  }

  private IsSharedByUserAsync(blogid:number,userid:string){
    return this.http.get(this.baseUrl+`/blogs/issharedbyuser?blogid=${blogid}&userid=${userid}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Blog } from '../_Models/Blog';
import { Category } from '../_Models/Category';

@Injectable({
  providedIn: 'root'
}) 
export class BlogService {
  http = inject(HttpClient);
  baseUrl=environment.BaseUrl;
  
  public GetAllBlogs(){
    return this.http.get<Blog[]>(this.baseUrl+"/Blogs/getallblogs");
  }

  public GetfeaturedBlogs(){
    return this.http.get<Blog[]>(this.baseUrl+"/Blogs/getfeaturedblogs");
  } 

  public GetBlogs_Pagination(skip:number){
    return this.http.get<Blog[]>(this.baseUrl+"/Blogs/getblogsPage?skip="+skip+"&take="+9);
  }

  public GetUserBlogs(email:string){
    return this.http.get<Blog[]>(this.baseUrl+"/Blogs/getuserblogs?email="+email);
  }

  public GetBlogById(Id:number){
    return this.http.get<Blog>(this.baseUrl+"/Blogs/getblogbyid?Id="+Id);
  }

  public DeleteBlog(Id:number){
    return this.http.delete(this.baseUrl+"/Blogs/deleteblog?Id="+Id);
  }

  public CreateBlog(blog:Blog){
    return this.http.post(this.baseUrl+"/Blogs/createblog",blog);
  }

  public EditBlog(Id:number,blog:Blog){
    return this.http.put(this.baseUrl+"/Blogs/updateblog?Id="+Id,blog);
  }

  public GetCategoryById(Id:number){
    return this.http.get<Category>(this.baseUrl+"/Blogs/getcategorybyid?Id="+Id);
  }

  public GetAllCategories(){
    return this.http.get<Category[]>(this.baseUrl+"/Blogs/getallcategories");
  }

  public AddLike(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/Blogs/addlike?blogid="+blogid,userid);
  }

  public AddShare(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/Blogs/addshare?blogid="+blogid,userid);
  }

  public RemoveLike(blogid:number,userid:string){
    return this.http.delete(this.baseUrl+"/Blogs/removelike?blogid="+blogid+"&userid="+userid);
  }

  public RemoveShare(blogid:number,userid:string){
    return this.http.delete(this.baseUrl+"/Blogs/removeshare?blogid="+blogid+"&userid="+userid);
  }

  public IsLikedByUser(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/Blogs/islikedbyuser?blogid="+blogid,userid);
  }

  public IsSharedByUser(blogid:number,userid:string){
    return this.http.post(this.baseUrl+"/Blogs/issharedbyuser?blogid="+blogid,userid);
  }

}

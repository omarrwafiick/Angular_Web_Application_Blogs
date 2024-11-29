import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AIBlog, Blog } from '../_Models/Blog';
@Injectable({
  providedIn: 'root'
})  
export class GenerateBlogService {
  http = inject(HttpClient);
  baseUrl=environment.BaseUrl;

  public GenerateBlogByAi(query:string){
    return this.http.post<AIBlog>(this.baseUrl+"/AI/UseChatGPT",query);
  }
  
}

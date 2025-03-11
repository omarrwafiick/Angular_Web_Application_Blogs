import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { catchError, concatMap, exhaustMap, of, switchMap, tap} from "rxjs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services/Authentication.service";
import { BlogService } from "../_services/blog.service";
import { GenerateBlogService } from "../_services/AI.service";
import { AddLikeAction, AddLikeSuccessAction, AddShareAction, AddShareSuccessAction, ChangeLoaderStatus, ChangeUsernameAction, ChangeUsernameSuccessAction, ConfirmEmailAction, ConfirmEmailSuccessAction, ContactAction, ContactSuccessAction, CreateBlogAction, CreateBlogSuccessAction, DeleteBlogAction, DeleteBlogSuccessAction, DeleteUserByIdAction, DeleteUserByIdSuccessAction, EditBlogAction, EditBlogSuccessAction, FailureAction, GenerateBlogByAiAction, GenerateBlogByAiSuccessAction, GetAllBlogsAction, GetAllBlogsSuccessAction, GetAllCategoriesAction, GetAllCategoriesSuccessAction, GetAllUsersAction, GetAllUsersSuccessAction, GetBlogsPageAction, GetBlogsPageSuccessAction, GetUserByIdAction, GetUserByIdSuccessAction, GetUsernameAction, GetUsernameSuccessAction, IsLikedByUserAction, IsLikedByUserSuccessAction, IsSharedByUserAction, IsSharedByUserSuccessAction, loginAction, logOutAction, NotifiedSuccessAction, NotifyUserAction, RemoveLikeAction, RemoveLikeSuccessAction, RemoveShareAction, RemoveShareSuccessAction, SignUpAction, UpdateCredentialsSuccess, UpdatePasswordAction, UpdatePasswordSuccessAction } from "./blurb.action";
import { Blog } from "../_models/Blog";
@Injectable()
export class BlurbEffect{ 
    blogsrequests=inject(BlogService);
    airequests=inject(GenerateBlogService);
    userrequests=inject(AuthenticationService);
    actions$=inject(Actions);
    router=inject(Router);

    LoginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            exhaustMap(actionData =>
              this.userrequests.Login(actionData.data).pipe(
                switchMap((data: any) => {
                  this.userrequests.ToasterSuccess('Logged in successfully', 'Success');
                  this.router.navigate(['/home']);
                  
                  return [
                    UpdateCredentialsSuccess(data),
                    ChangeLoaderStatus({bool:false}),
                    GetAllBlogsAction(),
                    GetAllCategoriesAction()
                  ]
                }),
                catchError(error => {
                  this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                  return of(ChangeLoaderStatus({bool:false}), FailureAction());
                })
              )
            )
          )
        );

    SignUpEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(SignUpAction),
          exhaustMap(actionData =>
            this.userrequests.SignUp(actionData.data).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('registered successfully', 'Success');
                this.router.navigate(['/home']);
                
                return [
                  UpdateCredentialsSuccess(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );   

      ContactEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContactAction),
            exhaustMap(actionData =>
              this.userrequests.Contact(actionData.data).pipe(
                switchMap((data: any) => {
                  this.userrequests.ToasterSuccess('message was sent successfully', 'Success');
                  this.router.navigate(['/home']);
                  
                  return [
                    ContactSuccessAction(),
                    ChangeLoaderStatus({bool:false})
                  ]
                }),
                catchError(error => {
                  this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                  return of(ChangeLoaderStatus({bool:false}), FailureAction());
                })
              )
            )
          )
        );

      ConfirmEmailEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ConfirmEmailAction),
          exhaustMap(actionData =>
            this.userrequests.ConfirmEmail(actionData.email).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('email was confirmed successfully', 'Success');
                this.router.navigate(['/otpconfirm']);
                //open otp route 
                
                return [
                  ConfirmEmailSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      UpdatePasswordEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UpdatePasswordAction),
          exhaustMap(actionData =>
            this.userrequests.UpdatePassword(actionData.email,actionData.password).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('password was reseted successfully', 'Success');
                this.router.navigate(['/login']);
                //close otp route
                
                return [
                  UpdatePasswordSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  logOutAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetUsersEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetAllUsersAction),
          exhaustMap(actionData =>
            this.userrequests.GetAllUsers().pipe(
              switchMap((data: any) => {
              
                return [
                  GetAllUsersSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

    DeleteUserEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(DeleteUserByIdAction),
          concatMap(actionData =>
            this.userrequests.DeleteUserById(actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('user was deleted successfully', 'Success');
                
                return [
                  DeleteUserByIdSuccessAction({id:actionData.userid}),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetUsernameEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetUsernameAction),
          exhaustMap(actionData =>
            this.userrequests.GetUserName(actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('username was returned successfully', 'Success');
              
                return [
                  GetUsernameSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetBlogUserEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetUserByIdAction),
          exhaustMap(actionData =>
            this.userrequests.GetUserById(actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('user\'s data was returned successfully', 'Success');
              
                return [
                  GetUserByIdSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      ChangeUsernameEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(ChangeUsernameAction),
          exhaustMap(actionData =>
            this.userrequests.ChangeUsername(actionData.email,actionData.newusername).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('username was reseted successfully', 'Success');
              
                return [
                  ChangeUsernameSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GenerateAiBlogEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GenerateBlogByAiAction),
          exhaustMap(actionData =>
            this.airequests.GenerateBlogByAi(actionData.query).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('an ai blog has been generated successfully', 'Success');
              
                return [
                  GenerateBlogByAiSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetAllBlogsEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetAllBlogsAction),
          exhaustMap(actionData =>
            this.blogsrequests.GetAllBlogs().pipe(
              switchMap((data: any) => {
              
                return [
                  GetAllBlogsSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetBlogsPageEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetBlogsPageAction),
          exhaustMap(actionData =>
            this.blogsrequests.GetBlogsPage(actionData.skip,actionData.take).pipe(
              switchMap((data: Blog[]) => {
              
                return [
                  GetBlogsPageSuccessAction({blogs:data}),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      DeleteBlogEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(DeleteBlogAction),
          exhaustMap(actionData =>
            this.blogsrequests.DeleteBlog(actionData.id).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('blog was deleted successfully', 'Success');
              
                return [
                  DeleteBlogSuccessAction(actionData),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      CreateBlogEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(CreateBlogAction),
          exhaustMap(actionData =>
            this.blogsrequests.CreateBlog(actionData.blog).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('a new blog is created successfully', 'Success');
              
                return [
                  CreateBlogSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

                //instead in delete and edit of new request update store and in like or share actions

      EditBlogEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(EditBlogAction),
          exhaustMap(actionData =>
            this.blogsrequests.EditBlog(actionData.blogid,actionData.blog).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('blog is updated successfully', 'Success');
                return [
                  EditBlogSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      GetAllCategoriesEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(GetAllCategoriesAction),
          exhaustMap(actionData =>
            this.blogsrequests.GetAllCategories().pipe(
              switchMap((data: any) => {
              
                return [
                  GetAllCategoriesSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      AddLikeActionEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AddLikeAction),
          exhaustMap(actionData =>
            this.blogsrequests.AddLike(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('like is added successfully', 'Success');

                return [
                  AddLikeSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      RemoveLikeActionEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(RemoveLikeAction),
          exhaustMap(actionData =>
            this.blogsrequests.RemoveLike(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('like is removed successfully', 'Success');
              
                return [
                  RemoveLikeSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      AddShareActionEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(AddShareAction),
          exhaustMap(actionData =>
            this.blogsrequests.AddShare(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
                this.userrequests.ToasterSuccess('share is added successfully', 'Success');
              
                return [
                  AddShareSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      RemoveShareActionEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(RemoveShareAction),
          exhaustMap(actionData =>
            this.blogsrequests.RemoveShare(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
                tap(()=>{
                    of();
                    this.userrequests.ToasterSuccess('share is removed successfully', 'Success');
                    of();
                })
              
                return [
                  RemoveShareSuccessAction(),
                  ChangeLoaderStatus({bool:false}),
                  GetAllBlogsAction()
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      IsLikedByUserEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(IsLikedByUserAction),
          exhaustMap(actionData =>
            this.blogsrequests.IsLikedByUser(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
              
                return [
                  IsLikedByUserSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      IsSharedByUserEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(IsSharedByUserAction),
          exhaustMap(actionData =>
            this.blogsrequests.IsSharedByUser(actionData.blogid,actionData.userid).pipe(
              switchMap((data: any) => {
                
                return [
                  IsSharedByUserSuccessAction(data),
                  ChangeLoaderStatus({bool:false})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );

      NotifyUserEffect$ = createEffect(() =>
        this.actions$.pipe(
          ofType(NotifyUserAction),
          exhaustMap(actionData =>
            this.userrequests.NotifiyUser().pipe(
              switchMap((data: any) => {
                
                return [
                  ChangeLoaderStatus({bool:false}),
                  NotifiedSuccessAction({bool:true})
                ]
              }),
              catchError(error => {
                this.userrequests.ToasterFailed('Operation Failed, Try Again', 'Error');
                return of(ChangeLoaderStatus({bool:false}), FailureAction());
              })
            )
          )
        )
      );
}


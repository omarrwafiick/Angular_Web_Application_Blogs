import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { MainBlurb } from '../_models/MainBlurb';
import { inject } from '@angular/core';
import { Category } from '../_models/Category';
import { Blog } from '../_models/Blog';


export const store = (state: MainBlurb) => state;

export const SelectUserBlogs= createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.blogs.filter(b=>b.userId==State.userdata.AppData.id)
);  

SelectUserBlogs.release();

export const selectMainBlurb = (state: MainBlurb) => state;

export const selectAppUser = createSelector(
  selectMainBlurb,
  SelectUserBlogs,
  (mainState: MainBlurb, userBlogs) => ({
    ...mainState.userdata,
    blogs: userBlogs
  })
);

selectAppUser.release();

export const selectNoftificationStatus = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.userdata.AppData.Notified
);

selectNoftificationStatus.release();

export const selectEmail = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.userdata.AppData.email
);

selectEmail.release();

export const LoaderStateSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.isLoading
);  

LoaderStateSelector.release();

export const SideBarStateSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.isSideBar
);  

SideBarStateSelector.release();

export const PopUpStateSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.PopupState
);  

PopUpStateSelector.release();

export const IsAdminSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.isAdmin
);  

IsAdminSelector.release();

export const CanEmailSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.canOtp
);  

CanEmailSelector.release();

export const CanEditPasswordSelector = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.componentsStatus.canEditPassword
);  

CanEditPasswordSelector.release();

export const SelectAllUsers = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.users
);  

SelectAllUsers.release();

export const SelectIsLikedProp = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.IsLikedByUser
);  

SelectIsLikedProp.release();

export const SelectIsSharedProp = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.IsSharedByUser
);  

SelectIsSharedProp.release();

export const SelectOtp = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.Otp
);  

SelectOtp.release();

export class ChooseCat{
  id:number
}

export const SelectCategory = createFeatureSelector<MainBlurb>('data');

export const selectCategoryById = (id: number) =>
  createSelector(SelectCategory, (data) => data.categories.find(c=>c.id==id));


export const SelectFeaturedBlogs = createSelector(
  (state:MainBlurb)=>state,
  (State: MainBlurb) => State.blogs.filter(b=>b.isFeatured==true)
);  

SelectFeaturedBlogs.release();

export const SelectBlogPage = createFeatureSelector<MainBlurb>('data');

export const SelectABlogPage = (skip:number,take:number) =>
  createSelector(SelectBlogPage, (data) => data.blogs.slice(skip,take));


export const SelectBlogById= createFeatureSelector<MainBlurb>('data');

export const SelectABlogById = (id:number) =>
  createSelector(SelectBlogById, (data) => (data.blogs.filter(d=>d.id==id) as unknown)as Blog);


export const SelectCategoryById= createFeatureSelector<MainBlurb>('data');

export const SelectACategoryById = (id:number) =>
  createSelector(SelectCategoryById, (data) => (data.categories.filter(d=>d.id==id) as unknown)as Category);

export const GetBlogsByCategoryId= createFeatureSelector<MainBlurb>('data');

export const GetBlogsByACategoryId = (id:number) =>
  createSelector(GetBlogsByCategoryId, (data) => (data.blogs.filter(d=>d.categoryId==id).sort(a=>a.likes).slice(0,3) as unknown)as Blog);


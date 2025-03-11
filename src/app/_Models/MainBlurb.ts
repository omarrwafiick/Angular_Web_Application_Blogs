import { Blog } from "./Blog";
import { Category } from "./Category";
import { User } from "./User";

export interface UserData{
    AppData:AppData;
    likes?:number;
    shares?:number;
    blogs?:ReadonlyArray<Blog>;
} 
 
export interface AppData{
    id:string;
    token:string;
    fullName:string;
    email:string;
    gender:string;
    userName:string;
    Notified?:boolean;
}

export interface ComponentsStatus{
    isLoading:boolean;
    isSideBar:boolean;
    isAdmin:boolean;
    PopupState:boolean;
    canOtp:boolean; 
    canEditPassword:boolean;
}

export interface MainBlurb{
    userdata:UserData;
    componentsStatus:ComponentsStatus;
    users:ReadonlyArray<User>;
    blogs:ReadonlyArray<Blog>;
    categories:ReadonlyArray<Category>;
    blogUserData:User;
    IsLikedByUser:boolean;
    IsSharedByUser:boolean;
    blogUserUsername:string;
    Aiblog:Blog;
    Otp:number;
}
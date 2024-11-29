import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AboutComponent } from './Components/about/about.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { ManageBlogsComponent } from './Components/Admin/manage-blogs/manage-blogs.component'; 
import { authGuard } from './_Services/auth.guard';
import { AddblogComponent } from './Components/addblog/addblog.component';
import { ConfirmOtpComponent } from './Components/UserAuthentication/confirm-otp/confirm-otp.component';
import { ConfirmEmailComponent } from './Components/UserAuthentication/confirm-email/confirm-email.component';
import { ChangeUsernameComponent } from './Components/UserAuthentication/change-username/change-username.component';
import { UpdatePasswordComponent } from './Components/UserAuthentication/update-password/update-password.component';
import { NotfoundComponent } from './Components/utilities/notfound/notfound.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomeComponent
    }
    ,
    ,
    {
        path:'',redirectTo:"home",pathMatch:'full'
    }
    ,
    {
        path:"login",
        component:LoginComponent
    }
    ,
    {
        path:"signup",
        component:SignupComponent
    }
    ,
    {
        path:"about",
        component:AboutComponent
    }
    ,
    {
        path:"contactus",
        component:ContactusComponent
    }
    ,
    {
        path:"profile",
        component:ProfileComponent,
    }
    ,
    {
        path:"blogs",
        component:BlogsComponent
    }
    ,
    {
        path:"blogdetails/:id",
        component:BlogDetailsComponent
    }
    ,
    {
        path:"addblog",
        component:AddblogComponent
    }
    ,
    {
        path:"admin/manageblogs",
        component:ManageBlogsComponent
        //make guard see from token if user is admin
    }
    ,
    {
        path:"emailconfirm",
        component:ConfirmEmailComponent
    }
    ,
    {
        path:"otpconfirm",
        component:ConfirmOtpComponent
    }
    ,
    {
        path:"changeusername",
        component:ChangeUsernameComponent
    }
    ,
    {
        path:"updatepassword",
        component:UpdatePasswordComponent
    }
    ,
    {
        path:"**",
        component:NotfoundComponent
    }
]
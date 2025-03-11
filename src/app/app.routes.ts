import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AboutComponent } from './Components/about/about.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { ManageBlogsComponent } from './Components/admin/manage-blogs/manage-blogs.component';
import { AddblogComponent } from './Components/addblog/addblog.component';
import { ConfirmOtpComponent } from './Components/UserAuthentication/confirm-otp/confirm-otp.component';
import { ConfirmEmailComponent } from './Components/UserAuthentication/confirm-email/confirm-email.component';
import { ChangeUsernameComponent } from './Components/UserAuthentication/change-username/change-username.component';
import { UpdatePasswordComponent } from './Components/UserAuthentication/update-password/update-password.component';
import { NotfoundComponent } from './Components/utilities/notfound/notfound.component';
import { BlogGeneratorComponent } from './Components/blog-generator/blog-generator.component';
import { AuthGuard } from './_services/auth.guard';
import { ManageUsersComponent } from './Components/admin/manage-users/manage-users.component';
import { AdminOptionsComponent } from './Components/admin/admin-options/admin-options.component';

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
        component:LoginComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"signup",
        component:SignupComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"about",
        component:AboutComponent
    }
    ,
    {
        path:"contactus",
        component:ContactusComponent,
        canDeactivate:[AuthGuard]
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
        path:"generateblogs",
        component:BlogGeneratorComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"blogdetails/:id",
        component:BlogDetailsComponent
    }
    ,
    {
        path:"addblog",
        component:AddblogComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"admin",
        component:AdminOptionsComponent,
        /* canActivate:[AuthGuard],
        data:{claimRequest: (c:any)=>c.role==="Admin"} */
    }  
    ,
    {
        path:"admin/manageblogs",
        component:ManageBlogsComponent,
        /* canActivate:[AuthGuard],
        data:{claimRequest: (c:any)=>c.role==="Admin"} */
    }
    ,
    {
        path:"admin/manageusers",
        component:ManageUsersComponent,
        /* canActivate:[AuthGuard],
        data:{claimRequest: (c:any)=>c.role==="Admin"} */
    }
    ,
    {
        path:"emailconfirm",
        component:ConfirmEmailComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"otpconfirm",
        component:ConfirmOtpComponent,
    }
    ,
    {
        path:"changeusername",
        component:ChangeUsernameComponent,
        canDeactivate:[AuthGuard]
    }
    ,
    {
        path:"updatepassword",
        component:UpdatePasswordComponent,
        canDeactivate:[AuthGuard]
    } 
    ,
    {
        path:"**",
        component:NotfoundComponent
    }
]
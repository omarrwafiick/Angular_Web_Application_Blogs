import {createAction, props } from '@ngrx/store';
import { Login } from '../_models/Login';
import { SignUp } from '../_models/Signup';
import { ContactData } from '../_models/ContactData';
import { AppData, UserData } from '../_models/MainBlurb';
import { User } from '../_models/User';
import { Blog } from '../_models/Blog';
import { Category } from '../_models/Category';

//ordinal actions

export const AddUser = createAction('[add] user action',props<{ data:UserData }>());

export const ChangeLoaderStatus = createAction('[trigger] loader action',props<{ bool:boolean}>());

export const ChangeSideBarStatus = createAction('[trigger] sidebar action',props<{ bool:boolean}>());

export const GetUser= createAction('[get] user action');

export const ChangePopupStatus= createAction('[change] popup status action',props<{ bool:boolean}>());

///////////////////////////////////////////////////////////////////////////////

//for effect

export const loginAction = createAction('[login] user action',props<{ data:Login }>());

export const SignUpAction = createAction('[signup] user action',props<{ data:SignUp }>());

export const ContactAction = createAction('[contact] user action',props<{ data:ContactData }>());

export const ConfirmEmailAction = createAction('[confirm email] user action',props<{ email:string}>());

export const UpdatePasswordAction = createAction('[update password] user action',props<{ email:string,password:string}>());

export const GetAllUsersAction = createAction('[get all] users action'); 

export const DeleteUserByIdAction = createAction('[delete] user action',props<{ userid:string }>());

export const GetUsernameAction = createAction('[get] user username action',props<{ userid:string }>());

export const GetUserByIdAction = createAction('[get] user by id action',props<{ userid:string }>());

export const ChangeUsernameAction = createAction('[change] username action',props<{ email:string,newusername:string}>());

export const GenerateBlogByAiAction = createAction('[Generate] blog by AI action',props<{ query:string }>());

export const GetAllBlogsAction = createAction('[get all] blogs action');

export const GetBlogsPageAction = createAction('[get] blogs page action',props<{ skip:number,take:number}>());

export const DeleteBlogAction = createAction('[delete] blog action',props<{ id:number}>());

export const CreateBlogAction = createAction('[create] blog action',props<{ blog:Blog }>());

export const EditBlogAction = createAction('[edit] blog action',props<{ blogid:number ,blog:Blog }>());

export const GetAllCategoriesAction = createAction('[get] all categories action');

export const AddLikeAction = createAction('[add] like action',props<{ blogid:number,userid:string }>());

export const AddShareAction = createAction('[add] share action',props<{ blogid:number,userid:string }>());

export const RemoveLikeAction = createAction('[remove] like action',props<{ blogid:number,userid:string }>());

export const RemoveShareAction = createAction('[remove] share action',props<{ blogid:number,userid:string }>());

export const IsLikedByUserAction = createAction('[is liked] blog action',props<{ blogid:number,userid:string }>());

export const IsSharedByUserAction = createAction('[is shared] blog action',props<{ blogid:number,userid:string }>());

export const NotifyUserAction = createAction('[notify] user action',props<{ email:string }>());

/////////////////////////////////////////////////////////////////////////////////

//for reducer

export const FailureAction = createAction('failed action');

export const logOutAction = createAction('[logout] user action');

export const CanOtpAction = createAction('[Otp] email action',props<{ bool:boolean}>());

export const CanEDitPasswordAction = createAction('[password] edit action',props<{ bool:boolean}>());

export const UpdateCredentialsSuccess= createAction('[update credentials] user success action',props<{ data:AppData }>());

export const ContactSuccessAction = createAction('[contact] user success action');

export const ConfirmEmailSuccessAction = createAction('[confirm email] user success action',props<{ otp:number }>());

export const UpdatePasswordSuccessAction = createAction('[update password] user success action');

export const GetAllUsersSuccessAction = createAction('[get] all users success action',props<{ users:User[]}>());

export const DeleteUserByIdSuccessAction = createAction('[delete] user success action',props<{ id:string }>());
    
export const GetUsernameSuccessAction = createAction('[get] username success action',props<{ username:string }>());

export const GetUserByIdSuccessAction = createAction('[get] by id success action',props<{ user:User }>());

export const ChangeUsernameSuccessAction = createAction('[change] username success action',props<{ username:string }>());

export const GenerateBlogByAiSuccessAction = createAction('[get] ai blog success action',props<{ blog:Blog }>());

export const GetAllBlogsSuccessAction = createAction('[get all] blogs success action',props<{ blogs:Blog[] }>());

export const GetBlogsPageSuccessAction = createAction('[get] blogs page success action',props<{ blogs:Blog[] }>());

export const DeleteBlogSuccessAction = createAction('[delete] blog success action',props<{ id:number }>());

export const CreateBlogSuccessAction = createAction('[create] blog success action'); 

export const EditBlogSuccessAction = createAction('[edit] blog success action'); 

export const GetAllCategoriesSuccessAction = createAction('[get] all categories success action',props<{categories:Category[]}>());

export const AddLikeSuccessAction = createAction('[add] like success action'); 

export const AddShareSuccessAction = createAction('[add] share success action'); 

export const RemoveLikeSuccessAction = createAction('[remove] like success action'); 

export const RemoveShareSuccessAction = createAction('[remove] share success action'); 

export const IsLikedByUserSuccessAction = createAction('[is liked] success action',props<{ bool:boolean}>());

export const IsSharedByUserSuccessAction = createAction('[is shared] success action',props<{ bool:boolean}>());

export const NotifiedSuccessAction = createAction('[notified] success action',props<{ bool:boolean}>());


import { createReducer, on } from '@ngrx/store';
import { AddUser , CanEDitPasswordAction, ChangeLoaderStatus, ChangePopupStatus, ChangeSideBarStatus, ChangeUsernameSuccessAction, ConfirmEmailSuccessAction, GenerateBlogByAiSuccessAction, GetAllBlogsSuccessAction, GetAllCategoriesSuccessAction, GetAllUsersSuccessAction, GetBlogsPageAction, GetBlogsPageSuccessAction, GetUser,GetUserByIdSuccessAction,GetUsernameSuccessAction,IsLikedByUserSuccessAction,IsSharedByUserSuccessAction, logOutAction, NotifiedSuccessAction, UpdateCredentialsSuccess } from './blurb.action';
import { MainBlurb } from '../_models/MainBlurb';
import { CanOtpAction } from './blurb.action';

export interface State{ 
    ApplicationData : MainBlurb
}

const intialState : MainBlurb = {} as MainBlurb;

export const BlurbReducer = createReducer(
    intialState,

    on(GetUser,(state)=> state),

    on(AddUser,(state,{data})=> ({ ...state , userdata : data })),

    on(logOutAction,(state)=> ({...state,
        userdata:null,
        componentsStatus:null,
        users:null,
        blogs:null,
        categories:null,
        blogUserData:null,
        IsLikedByUser:null,
        IsSharedByUser:null,
        blogUserUsername:null,
        Aiblog:null,
        Otp:null,
    })),

    on(ChangeLoaderStatus,(state,{bool})=> ({
        ...state,
        componentsStatus: {
            ...state.componentsStatus, 
            isLoading: bool,            
        },
    })),

    on(ChangePopupStatus,(state,{bool})=> ({
        ...state,
        componentsStatus: {
            ...state.componentsStatus, 
            PopupState: bool,            
        },
    })),

    on(ChangeSideBarStatus,(state,{bool})=> ({
        ...state,
        componentsStatus: {
            ...state.componentsStatus, 
            isSideBar: bool,            
        },
    })),

    on(CanOtpAction,(state,{bool})=> ({
        ...state,
        componentsStatus: {
            ...state.componentsStatus, 
            canOtp: bool,            
        },
    })),

    on(CanEDitPasswordAction,(state,{bool})=> ({
        ...state,
        componentsStatus: {
            ...state.componentsStatus, 
            canEditPassword: bool,            
        },
    })),

    on(UpdateCredentialsSuccess,(state,{data})=> ({
        ...state,
        userdata: {
          ...state.userdata, 
          AppData: {
            ...state.userdata.AppData, 
            id:data.id,
            token:data.token,
            fullName:data.fullName,
            userName:data.userName,
            email:data.email,
            gender:data.gender,
            Notified:data.Notified
          }
        }
      })),

    on(GetAllUsersSuccessAction,(state,{users})=> ({...state,users:users})),

    on(GetUsernameSuccessAction,(state,{username})=> ({...state,blogUserUsername:username})),
    
    on(GetUserByIdSuccessAction,(state,{user})=> ({...state,blogUserData:user})),
    
    on(ChangeUsernameSuccessAction,(state,{username})=> ({...state,userdata: {
        ...state.userdata, 
        userName: username,            
    },})),
    
    on(GenerateBlogByAiSuccessAction,(state,{blog})=> ({...state,Aiblog:blog})),

    on(GetAllBlogsSuccessAction,(state,{blogs})=> ({...state,blogs:blogs})),

    on(GetBlogsPageSuccessAction,(state,{blogs})=> ({...state,blogs:blogs})),

    on(GetAllCategoriesSuccessAction,(state,{categories})=> ({...state,categories:categories})),

    on(ConfirmEmailSuccessAction,(state,{otp})=> ({...state,Otp:otp})),

    on(IsLikedByUserSuccessAction,(state,{bool})=> ({...state,IsLikedByUser:bool})),

    on(IsSharedByUserSuccessAction,(state,{bool})=> ({...state,IsSharedByUser:bool})),

    on(NotifiedSuccessAction,(state,{bool})=> ({...state,userdata: {
        ...state.userdata, 
        Notified:bool          
    },})),
    
)



export interface Blog{
    id:number;
    title:string;
    description:string;
    content:string;
    image:File;
    isFeatured:boolean;
    categoryId:number;
    userId:string;
    userName:string;
    gender:boolean;
    likes:number;
    shares:number;
    liked?:boolean;
    shared?:boolean;
    createdAt:Date;
}
export class AIBlog{
    title: string;
    description: string;
    content: string;
    image:File;
}
export class CreateBlogObj extends AIBlog {
    isFeatured: boolean;
    likes: number;
    shares: number;
    categoryId: number;
    userId: string;
}
export class UpdateBlogObj extends CreateBlogObj{
    id:number;
}
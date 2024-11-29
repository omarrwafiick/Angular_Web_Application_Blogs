export interface Blog{
    id:number
    title:string
    description:string
    content:string
    image:string
    isFeatured:boolean
    likes:number
    shares:number
    categoryId:number
    userId:string
    liked?:boolean
    shared?:boolean
}
export class CreateBlogObj {
    title: string
    description: string
    content: string
    image: string
    isFeatured: boolean
    likes: number
    shares: number
    categoryId: number
    userId: string
}
export class UpdateBlogObj {
    id:number
    title: string
    description: string
    content: string
    image: string
    isFeatured: boolean
    likes: number
    shares: number
    categoryId: number
    userId: string
}
export class AIBlog{
    title: string
    description: string
    content: string
    image: string
}
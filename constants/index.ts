export interface PropsAuth{
        name: string,
        email: string,
        image: string,
        id: number,
        role: string,
        city?: string,
}
export interface AccessType{
        status: number
        success?: boolean
}
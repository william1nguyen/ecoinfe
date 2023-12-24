export type UserLoginInfo = {
    email: string,
    password: string
}

export type UserSignupInfo = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface Product {
    id: number;
    name: string;
    image?: File;
    imageUploadURL: string;
    price: number;
}


export interface Order {
    id: number;
    products: Product[];
}
import { User_Document } from "../contracts/users/user-document";

export class Advert{
    id:string;
    userName:string;
    lastname:string;
    name:string;
    email:string;
    gender:string;
    personelDescription:string;
    jobName:string;
    phoneNumber:string;
    profileImagesPaths:string[];
    userDocuments:User_Document[];
    
}
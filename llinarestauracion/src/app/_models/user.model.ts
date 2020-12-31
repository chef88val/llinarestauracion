import { Role } from "./role.model";
import { Company } from "./company.model";
export class User {
    uid: string;
    l: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    refreshToken: string;
    role: Role;
    token?: string;
    company: Company;
    constructor(){
        
    }
}

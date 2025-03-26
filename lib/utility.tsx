import User from "@/components/user/user";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default class Utility{
    static decryptJWT(token: string){
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()) as User;
    }
    
    static jwtExpired(expireDate: number){
        return Date.now() >= expireDate * 1000;
    }

    static getSessionResponseCookie(){
        return  {
            name: "session",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        } as ResponseCookie;
    }
}
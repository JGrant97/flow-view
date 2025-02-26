import Bearer from "@/types/bearer";
import RegisterFeedback from "@/types/registerFeedback";

export default class AuthAPI {
    static async Login(email: string, password: string) {

        try {
            const res = await fetch("https://localhost:7260/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            })

            if (!res.ok){
                switch (res.status) {
                    case 401:
                        return new Error("Failed to login. Please ensure your email has be confirmed.")
                    default:
                        return new Error(res.statusText)
                }
            }
            return await res.json() as Bearer;
        }
        catch (error) {
            return error as Error
        }
    }

    static async Refresh(bearer:Bearer){
        try {
            const res = await fetch("https://localhost:7260/auth/refresh", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({Token: bearer.token, RefreshToken: bearer.refreshToken})  
            })

            if (!res.ok){
                switch (res.status) {
                    default:
                        return new Error(res.statusText)
                }
            }

            return await res.json() as Bearer;
        }
        catch (error) {
            throw error
        }
    }

    static async Logout(bearer:Bearer){

        try {
            const res = await fetch("https://localhost:7260/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer.token}`  
                },
            })

            if (!res.ok){
                switch (res.status) {
                    default:
                        return new Error(res.statusText)
                }
            }

            return await res;
        }
        catch (error) {
            throw error
        }
    }

    static async Register(displayname: string, email: string, password: string, callbackURL: string) {
        console.log(callbackURL);
        try {
            const res = await fetch("https://localhost:7260/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName: displayname, 
                    email: email, password: password, 
                    emailCallbackUrl: callbackURL 
                })
            })

            if (!res.ok){
                
                switch (res.status) {
                    case 400:
                        return await res.json() as RegisterFeedback
                    default:
                        return new Error(res.statusText)
                }
            }
        }
        catch (error) {
            throw error
        }
    }

    static async ConfirmEmail(userId: string, token: string,) {
        try {
            const res = await fetch("https://localhost:7260/auth/confirmEmail", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({UserId: userId, Token: token})
            })

            if (!res.ok){
                
                switch (res.status) {
                    default:
                        return new Error(res.statusText)
                }
            }
        }
        catch (error) {
            throw error
        }
    }
}
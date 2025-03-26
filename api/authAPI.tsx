"use server"

import { verifySession } from "@/components/session";
import Bearer from "@/types/bearer";
import RegisterFeedback from "@/components/user/registerFeedback";

export async function Login(email: string, password: string) {

    try {
        const res = await fetch("https://localhost:7260/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })

        if (!res.ok) {
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

export async function Refresh() {
    try {
        const session = await verifySession();

        if (session == undefined)
            return new Error("Unauthorised");

        const res = await fetch("https://localhost:7260/auth/refresh", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Token: session.token, RefreshToken: session.refreshToken })
        })

        if (!res.ok) {
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

export async function Logout() {

    try {
        const session = await verifySession();

        if (session == undefined)
            return new Error("Unauthorised");

        const res = await fetch("https://localhost:7260/auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
        })

        if (!res.ok) {
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

export async function Register(displayname: string, email: string, password: string, callbackURL: string) {
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

        if (!res.ok) {

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

export async function ConfirmEmail(userId: string, token: string,) {
    try {
        const res = await fetch("https://localhost:7260/auth/confirmEmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserId: userId, Token: token })
        })

        if (!res.ok) {

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
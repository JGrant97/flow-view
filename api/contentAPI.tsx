"use server"
import Content from "@/components/content/content"
import { verifySession } from "@/components/session"

export async function GetListContent() {
    const res = await fetch(`https://localhost:7260/content/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Content
}

export async function GetContent(id: string) {
    const res = await fetch(`https://localhost:7260/content/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Content
}

export async function CreateContent(contentFormData: FormData,) {
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");

    const res = await fetch(`https://localhost:7260/content/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        },
        body: contentFormData
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Content
}

export async function UpdateContent(contentFormData: FormData,) {
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");

    const res = await fetch(`https://localhost:7260/content/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        },
        body: contentFormData
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Content
}

export async function DeleteContent(id: string) {
    const session = await verifySession();

    if (session == undefined)
        return new Error("Unauthorised");

    const res = await fetch(`https://localhost:7260/content/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
    })

    if (!res.ok) {
        switch (res.status) {
            default:
                return new Error(res.statusText)
        }
    }

    return await res.json() as Content
}
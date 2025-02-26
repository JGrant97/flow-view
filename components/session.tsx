import "server-only"
import Bearer  from "@/types/bearer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Utility from "@/lib/utility";

const cookieObj = Utility.getSessionResponseCookie();

export async function createSession(bearer: Bearer) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const cookieList =  await cookies();
    cookieList.set(cookieObj.name, JSON.stringify(bearer), { ...cookieObj, expires });
    redirect("/");
}

export async function verifySession() {
    const cookieList =  await cookies();
    const cookie = cookieList.get(cookieObj.name)?.value;

    if (cookie) {
        return JSON.parse(cookie) as Bearer;
    }
}

export async function deleteSession() {
    const cookieList =  await cookies();
    cookieList.delete(cookieObj.name);
    redirect("/login");
}

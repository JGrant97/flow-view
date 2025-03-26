import { verifySession } from "@/components/session";
import { UserContext } from "@/components/userContextProvider";
import Utility from "@/lib/utility";
import { useContext } from "react";

export default async function AccountPage({ params }: {
    params: {
        id: string
    }
}) {
    const {id} = await params;
    const selectedAccountUsername = decodeURIComponent(id).replace("@", "");
    const session = await verifySession();

    var currentUser = session ? Utility.decryptJWT(session.token) : undefined;
    var isCurrentUser = selectedAccountUsername === currentUser?.userName;

    return (
        <section style={{ display: "grid", width: "50%", margin: "1rem auto", gap:"1rem"}}>
            <h1 style={{margin: 0}}>{selectedAccountUsername}</h1>
        </section>
    )
}
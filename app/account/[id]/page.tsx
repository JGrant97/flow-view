
export default async function AccountPage({params}: {
    params: {
        id: string
    }
  })  {
    const username = decodeURIComponent(params.id).replace("@", "");

    console.log(username);

    return (
        <section style={{display: "grid"}}>
          
            <h1>{username}</h1>
        </section>
    )
}
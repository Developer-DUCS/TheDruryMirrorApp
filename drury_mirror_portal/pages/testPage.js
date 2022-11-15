



import { useSession, signOut } from 'next-auth/react'
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

//import { signOut } from "next-auth/react"


export default function test() {
    const router = useRouter()
    const {status, data} = useSession()

    const myRedirect = () => {
        setTimeout(() => {  console.log("Redirecting!"); }, 5000);
        useEffect(() => {
            router.replace("/")
        })
        
    
    }
    console.log("status: ", status)
    console.log("data: ", data)
    // session.user.email
    if (status === "authenticated") {
        return (
            <>
                <div>
                    <p>Welcome {data.user.email}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Role: {data.user.role}</p>
                    <p>Expires: {data.expires}</p>
                    <button onClick={() => signOut()}>Sign out</button>

                </div>
            </>
        );
    }
    else {
        //myRedirect()

        return (
            <>
                <div>
                    <p>You are not signed in</p>
                </div>
            </>
        )
        
    }
}
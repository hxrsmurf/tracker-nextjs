import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function spotify() {
    const { data: session } = useSession();
    const router = useRouter();
    const [accessToken, setAccessToken] = useState()
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (session.user) {
            const user_id = session.id

            fetch('/api/db/AuthDb?id=' + user_id)
                .then((res) => res.json())
                .then((data) => {
                    setAccessToken(data.accessToken.S);
                    setLoading(false);
                });
        }
    }, [session]);


    if (!session) {
        router.push("/");
        return <>Loading...</>;
    }
    if (!session.user) {
        return <>Loading...</>;
    }


    if (isLoading) return <p>Loading...</p>;
    if (!accessToken) return <p>No access token</p>;

    return (
        <>
            <div className="content">
                Cats
            </div>
        </>
    );
}
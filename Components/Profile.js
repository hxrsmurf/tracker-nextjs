import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  if (!session) return <>Loading...</>;

  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
        const req = await fetch('/api/db/DBUserProfile?user=' + session.user.email)
        const res = await req.json()
        setData(res)
        console.log(res)
    }
    fetchData()
  }, []);

  if (!data) return <>Loading...</>;

  return (
    <>
        Profile page...
    </>
  )
}
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ marginTop: "2rem" }}>Hello! Welcome to the website.</div>
    );
  }

  if (session.user) {
    return <div style={{ marginTop: "2rem" }}>Hello {session.user.name}</div>;
  }
}
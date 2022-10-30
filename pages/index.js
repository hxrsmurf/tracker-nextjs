import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div style={{ marginTop: "2rem" }}>
          <div>
            <h1>Why?</h1>
            <p>
              I record various categories in my life like:
              <ul>
                <li>What movies and tv I watch</li>
                <li>What video games I&apos;ve been playing</li>
                <li>What weird dreams I have</li>
                <li>What music I listen to via Spotify</li>
              </ul>
            </p>
            <p>
              I thought it&apos;d be a good idea to have a central &apos;portal&apos; for this.
              I&apos;ve been trying to learn more about programming/coding. I found
              that NextJS is easier for me to understand.
            </p>
          </div>

          <hr></hr>

          <div>
            <h1>How do I use this?</h1>
            <p>It&apos;s simple! Just click Login in the top-right. Then, select your Google account. You should be redirected back to this page.</p>
          </div>

          <hr></hr>

          <div>
            <h1>Data Collected</h1>
            <p>
            If you sign-in with Google, the below information will be stored in the database.
            <ul>
              <li>Email</li>
              <li>First and Last Name</li>
              <li>Profile Picture</li>
            </ul>

            Apart from the third-party that hosts the database, your data will not be transferred to any other third-parties.
            </p>
          </div>


        </div>
      </>
    );
  }

  if (session.user) {
    return <div style={{ marginTop: "2rem" }}>Hello {session.user.name}</div>;
  }
}
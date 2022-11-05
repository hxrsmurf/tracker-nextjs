import Announcement from "../Components/Modals/Announcement";

export default function Home() {
  return (
    <>
      <Announcement/>
      <div className="content" style={{ marginTop: "2rem" }} >
        <div>
          <h1>Why?</h1>
          <div>
            I record various categories in my life like:
            <ul>
              <li>What movies and tv I watch</li>
              <li>What video games I&apos;ve been playing</li>
              <li>What weird dreams I have</li>
              <li>What music I listen to via Spotify</li>
            </ul>
          </div>
          <div>
            I thought it&apos;d be a good idea to have a central
            &apos;portal&apos; for this. I&apos;ve been trying to learn more
            about programming/coding. I found that NextJS is easier for me to
            understand.
          </div>
        </div>

        <hr style={{ marginTop: "2rem" }}></hr>

        <div>
          <h1>How do I use this?</h1>
          <div>
            It&apos;s simple! Just click Login in the top-right. Then, select
            your Google account. You should be redirected back to this page.
          </div>
        </div>
      </div>
    </>
  );
}
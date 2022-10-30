export default function Footer() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        width: "50%",
        textAlign: "center",
      }}
    >
      <hr style={{ width: "25%" }}></hr>
      <div style={{marginTop: "1rem", marginBottom: "1rem"}}>YouTube | Twitter | GitHub | Discord</div>
      <div>Privacy | Terms</div>
    </div>
  );
}
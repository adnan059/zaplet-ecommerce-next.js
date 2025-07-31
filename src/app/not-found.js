import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className="sectionContainer">
        <div className="not-found">
          <h1>Error 404: Page Not Found</h1>
          <Link className="go-home" href={"/"}>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

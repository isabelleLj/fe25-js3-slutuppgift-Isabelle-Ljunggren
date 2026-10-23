import { Link } from "react-router";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Fel 404
      </p>

      <h1 className="text-4xl font-bold">Sidan hittades inte</h1>

      <p className="max-w-md text-muted-foreground">
        Sidan du försöker besöka finns inte eller har flyttats.
      </p>

      <Link
        to="/"
        className="rounded-md border px-4 py-2 transition-colors hover:bg-muted"
      >
        Tillbaka till startsidan
      </Link>
    </main>
  );
}

export default NotFound;

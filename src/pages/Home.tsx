import Countries from "@/views/Countries";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
      <Countries />
    </main>
  );
}

export default Home;

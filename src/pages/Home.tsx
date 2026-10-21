import Countries from "@/views/Countries";

function Home() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-slate-950 px-3 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <Countries />
      </div>
    </main>
  );
}

export default Home;

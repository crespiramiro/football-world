function Home() {
  return (
    <section
      className=" scroll-smooth h-screen text-white sm:w-full py-12 px-12 sm:px-8  bg-cover flex flex-col gap-y-10 justify-start items-start bg-center "
      style={{ backgroundImage: "url('stadium.avif')" }}
    >
      <h1 className="text-8xl font-bold mb-2 sm:text-4xl md:text-6xl lg:text-6xl">
        Premier League <br />
        World
      </h1>
      <p className="text-xl max-w-xl font-medium mb-6 sm:text-base md:text-lg lg:text-xl">
        Welcome to PremierWorld, the perfect place to get info about your
        favorite Premier League team
      </p>
      <button className="py-2 px-6 border-white border-2 font-bold hover:bg-slate-600/25 ">
        <a href="#teams">Explore</a>
      </button>
    </section>
  );
}

export default Home;

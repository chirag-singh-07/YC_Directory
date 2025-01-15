import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name:"Chirag"
      },
      _id: 1,
      desciption: "This is a description",
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-robot-white-cute-robot-blue-light-background-image_2199825.jpg",
      title: " We Robots",
      category: "Robots",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect with Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Comprtitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : `All Startups`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (posts.map((post:StartupCardType)=>(
            <>  
              <StartupCard key={post?._id} post={post}/>
            </>
          ))):(<>
            <p className="no-results">No startups found</p>
          </>)}
        </ul>
      </section>
    </>
  );
}

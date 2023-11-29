import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import * as PokeAPI from "@/lib/pokeapi";

import { Pagination } from "./components/pagination";
import { PokemonCard } from "./components/pokemon-card";

type PageProps = {
  searchParams?: {
    limit?: string;
    page?: string;
    query?: string;
  };
};

export default async function Home(props: PageProps) {
  const { searchParams } = props;

  const currentPage = parseInt(searchParams?.page ?? "1");

  const limit = parseInt(searchParams?.limit ?? "30");
  const offset = (currentPage - 1) * limit;

  // const query = searchParams?.query || "";

  const data = await PokeAPI.get("pokemon/", { limit, offset });
  const totalPages = Math.ceil(data.count / limit);

  return (
    <section
      className="grid h-max justify-center gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, 200px)" }}
    >
      {data.results.map((d) => (
        <Suspense
          key={d.name}
          fallback={<Skeleton className="h-[200px] rounded-md border p-2" />}
        >
          <PokemonCard key={d.name} {...d} />
        </Suspense>
      ))}
      <Pagination totalPages={totalPages} />
    </section>
  );
}

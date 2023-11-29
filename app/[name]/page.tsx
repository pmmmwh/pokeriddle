import { ChevronsUpDown } from "lucide-react";
import { unstable_cache } from "next/cache";

import { PokemonSprite } from "@/components/app/pokemon-sprite";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { getCommentsForPokemon } from "@/lib/drizzle";
import * as PokeAPI from "@/lib/pokeapi";

import { AbilityBadge, TypeBadge } from "./components/badges";
import { BaseStat } from "./components/base-stat";
import { BasicInfo } from "./components/basic-info";
import { CommentBoard } from "./components/comment-board";
import { MovesTable } from "./components/moves-table";

type PageProps = {
  params: {
    name: string;
  };
};

const getCachedComments = unstable_cache(
  (name: string) => getCommentsForPokemon(name),
  ["comments"],
  { tags: ["comments"] },
);

export default async function Details({ params }: PageProps) {
  const [data, comments] = await Promise.all([
    PokeAPI.get(`pokemon/${params.name}`),
    getCachedComments(params.name),
  ]);

  return (
    <div className="space-y-4">
      <section className="flex flex-col items-center space-y-4 py-4 text-sm lg:h-[400px] lg:flex-row lg:space-x-8">
        <div className="flex flex-grow justify-center">
          <PokemonSprite pokemon={data} size={280} type="official" />
        </div>
        <Separator className="lg:hidden" />
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="flex h-full w-full flex-col gap-4 lg:w-80">
          <BasicInfo label="ID">#{data.id}</BasicInfo>
          <BasicInfo label="Types">
            {data.types.map((t) => (
              <TypeBadge key={t.type.name} name={t.type.name} />
            ))}
          </BasicInfo>
          <BasicInfo label="Abilities">
            {data.abilities.map((t) => (
              <AbilityBadge
                key={t.ability.name}
                isHidden={t.is_hidden}
                name={t.ability.name}
              />
            ))}
          </BasicInfo>
          <BasicInfo label="Height">{(data.height / 10).toFixed(1)}m</BasicInfo>
          <BasicInfo label="Weight">
            {(data.weight / 10).toFixed(1)}kg
          </BasicInfo>
        </div>
        <Separator className="lg:hidden" />
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="flex h-full w-full flex-col gap-4 lg:w-80">
          {data.stats.map((s) => (
            <BaseStat
              key={s.stat.name}
              name={s.stat.name}
              value={s.base_stat}
            />
          ))}
        </div>
      </section>
      <Separator />
      <section>
        <Collapsible className="w-full">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-semibold">Available Moves</h2>
            <CollapsibleTrigger asChild>
              <Button className="w-9 p-0" size="sm" variant="ghost">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <MovesTable className="mt-2" moves={data.moves} />
          </CollapsibleContent>
        </Collapsible>
      </section>
      <Separator />
      <section>
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
        <CommentBoard comments={comments} />
      </section>
    </div>
  );
}

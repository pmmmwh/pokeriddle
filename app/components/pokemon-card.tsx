import Link from "next/link";

import { PokemonSprite } from "@/components/app/pokemon-sprite";
import * as PokeAPI from "@/lib/pokeapi";

export type PokemonCardProps = PokeAPI.NamedResource;

export async function PokemonCard(props: PokemonCardProps) {
  const { name } = props;

  const data = await PokeAPI.get(`pokemon/${name}`);

  return (
    <Link className="rounded-md border p-2" href={`/${data.name}`}>
      <figure className="flex h-[182px] w-[182px] flex-col items-center justify-center">
        <PokemonSprite pokemon={data} size={96} />
        <figcaption className="pt-3 text-center text-muted-foreground">
          #{data.id}
          <br />
          <span className="whitespace-pre-line font-semibold text-foreground">
            {PokeAPI.beautifyName(data.name)}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
}

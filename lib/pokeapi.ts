import { capitalCase } from "change-case";

export const BASE_URL = "https://pokeapi.co/api/v2/";

export type NamedResource = { name: string; url: string };

export type NamedResourceList = {
  count: number;
  next?: string;
  previous?: string;
  results: NamedResource[];
};

export type VersionGameIndex = {
  game_index: number;
  version: NamedResource;
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedResource;
};

export type PokemonFormType = {
  slot: number;
  type: NamedResource;
};

export type PokemonHeldItemVersion = {
  version: NamedResource;
  rarity: number;
};

export type PokemonHeldItem = {
  item: NamedResource;
  version_details: PokemonHeldItemVersion[];
};

export type PokemonMoveVersion = {
  move_learn_method: NamedResource;
  version_group: NamedResource;
  level_learned_at: number;
};

export type PokemonMove = {
  move: NamedResource;
  version_group_details: PokemonMoveVersion[];
};

export type PokemonStat = {
  stat: NamedResource;
  effort: number;
  base_stat: number;
};

export type PokemonSprites = {
  front_default?: string;
  front_shiny?: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default?: string;
  back_shiny?: string;
  back_female?: string;
  back_shiny_female?: string;
  other?: {
    "official-artwork"?: {
      front_default?: string;
      front_shiny?: string;
    };
  };
};

export type PokemonType = {
  slot: number;
  type: NamedResource;
};

export type PokemonTypePast = {
  generation: NamedResource;
  types: PokemonType[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  species: NamedResource;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type Move = {
  id: number;
  name: string;
  accuracy?: number;
  effect_chance?: number;
  pp: number;
  priority: number;
  power?: number;
  damage_class: NamedResource;
  type: NamedResource;
};

type PokeAPIGet = {
  <T extends string | number>(
    url: `move/${T}`,
    params?: Record<string, any>,
  ): Promise<Move>;
  <T extends string | number>(
    url: `pokemon/${T}`,
    params?: Record<string, any>,
  ): Promise<Pokemon>;
  (url: "pokemon/", params?: Record<string, any>): Promise<NamedResourceList>;
};

export const get: PokeAPIGet = async (
  url: string,
  params?: Record<string, any>,
) => {
  const reqUrl = new URL(url, BASE_URL);
  if (params != null) {
    for (const [k, v] of Object.entries(params)) {
      reqUrl.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(reqUrl);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const namesWithSpaces = {
  "mr-mime": "Mr. Mime",
  "mimr-jr": "Mime Jr.",
  "type-null": "Type: Null",
  "tapu-koko": "Tapu Koko",
  "tapu-lele": "Tapu Lele",
  "tapu-bulu": "Tapu Bulu",
  "tapu-fini": "Tapu Fini",
  "mr-rime": "Mr. Rime",
  "great-tusk": "Great Tusk",
  "scream-tail": "Scream Tail",
  "brute-bonnet": "Brute Bonnet",
  "flutter-mane": "Flutter Mane",
  "slither-wing": "Slither Wing",
  "sandy-shocks": "Sandy Shocks",
  "iron-treads": "Iron Treads",
  "iron-bundle": "Iron Bundle",
  "iron-hands": "Iron Hands",
  "iron-jugulis": "Iron Jugulis",
  "iron-moth": "Iron Moth",
  "iron-thorns": "Iron Thorns",
  "roaring-moon": "Roaring Moon",
  "iron-valiant": "Iron Valiant",
  "walking-wake": "Walking Wake",
  "iron-leaves": "Iron Leaves",
  "raging-bolt": "Raging Bolt",
  "iron-crown": "Iron Crown",
  "ho-oh": "Ho-Oh",
  "porygon-z": "Porygon-Z",
  "jangmo-o": "Jangmo-o",
  "hakamo-o": "Hakamo-o",
  "kommo-o": "Kommo-o",
  "ting-lu": "Ting-Lu",
  "chien-pao": "Chien-Pao",
  "wo-chien": "Wo-Chien",
  "chi-yu": "Chi-Yu",
  "nidoran-f": "Nidoran♀",
  "nidoran-m": "Nidoran♂",
  farfetchd: "Farfetch'd",
  sirfetchd: "Sirfetch'd",
  flabebe: "Flabébé",
  "zygarde-10": "Zygarde\n(10% Forme)",
  "zygarde-10-power-construct": "Zygarde\n(10% Forme)",
  "zygarde-50": "Zygarde\n(50% Forme)",
  "zygarde-50-power-construct": "Zygarde\n(50% Forme)",
  "zygarde-complete": "Zygarde\n(Complete Forme)",
};

export function beautifyName(name: string): string {
  if (name in namesWithSpaces) {
    return namesWithSpaces[name as keyof typeof namesWithSpaces];
  }

  const nameParts = name.split("-");
  const main = nameParts.splice(0, 1).at(0)!;
  const rest = nameParts.length
    ? `\n(${nameParts.map((p) => capitalCase(p)).join(" ")})`
    : "";

  return `${capitalCase(main)}${rest}`;
}

export function beautifyStat(name: string): string {
  if (name === "hp") return "HP";
  return capitalCase(name);
}

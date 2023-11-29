"use client";

import Image from "next/image";
import { useState } from "react";

import type * as PokeAPI from "@/lib/pokeapi";
import { cn } from "@/lib/utils";

export type PokemonSpriteType = "default" | "official";
export type PokemonSpriteProps = {
  className?: string;
  pokemon: PokeAPI.Pokemon;
  size?: number;
  type?: PokemonSpriteType;
};

export function PokemonSprite(props: PokemonSpriteProps) {
  const {
    className,
    pokemon: { name, sprites },
    type = "default",
    size = type === "official" ? 475 : 96,
  } = props;

  const [showFallback, setShowFallback] = useState(false);

  const src =
    type === "official"
      ? sprites.other?.["official-artwork"]?.front_default
      : sprites.front_default;

  if (!src || showFallback) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md bg-black/10",
          className,
        )}
        style={{ height: size, width: size }}
      >
        {name[0].toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      alt={name}
      className={cn("shrink-0 object-cover", className)}
      height={size}
      src={src}
      width={size}
      onError={() => {
        setShowFallback(true);
      }}
    />
  );
}

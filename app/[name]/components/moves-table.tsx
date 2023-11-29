import { capitalCase } from "change-case";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as PokeAPI from "@/lib/pokeapi";
import { cn } from "@/lib/utils";

import { TypeBadge } from "./badges";

function MoveRow(props: PokeAPI.Move) {
  const { accuracy, damage_class, name, power, pp, type } = props;

  return (
    <TableRow>
      <TableCell className="font-medium">{capitalCase(name)}</TableCell>
      <TableCell>
        <TypeBadge name={type.name} />
      </TableCell>
      <TableCell>{capitalCase(damage_class.name)}</TableCell>
      <TableCell className="text-right">{pp}</TableCell>
      <TableCell className="text-right">{power ?? "-"}</TableCell>
      <TableCell className="text-right">{accuracy ?? "-"}</TableCell>
    </TableRow>
  );
}

export type MovesTableProps = {
  className?: string;
  moves: PokeAPI.Pokemon["moves"];
};

export async function MovesTable(props: MovesTableProps) {
  const { className, moves } = props;

  const movesData = await Promise.all(
    moves
      .sort((a, b) => a.move.name.localeCompare(b.move.name))
      .map((m) => PokeAPI.get(`move/${m.move.name}`)),
  );

  return (
    <Table className={cn("table-auto", className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Power</TableHead>
          <TableHead className="text-right">Accuracy</TableHead>
          <TableHead className="text-right">PP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movesData.map((m) => (
          <MoveRow key={m.name} {...m} />
        ))}
      </TableBody>
    </Table>
  );
}

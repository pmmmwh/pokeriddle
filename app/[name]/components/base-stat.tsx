import { Progress } from "@/components/ui/progress";
import * as PokeAPI from "@/lib/pokeapi";

export type BaseStatProps = {
  name: string;
  value: number;
};

export function BaseStat(props: BaseStatProps) {
  const { name, value } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between space-x-2">
        <span className="font-semibold">{PokeAPI.beautifyStat(name)}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Progress value={Math.ceil((value / 255) * 100)} />
    </div>
  );
}

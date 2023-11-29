import { capitalCase } from "change-case";

import { Badge } from "@/components/ui/badge";

export type AbilityBadgeProps = {
  name: string;
  isHidden?: boolean;
};

export function AbilityBadge(props: AbilityBadgeProps) {
  const { isHidden = false, name } = props;
  return (
    <Badge variant={isHidden ? "secondary" : "default"}>
      {capitalCase(name)}
    </Badge>
  );
}

export type TypeBadgeProps = {
  name: string;
};

export function TypeBadge(props: TypeBadgeProps) {
  const { name } = props;

  return (
    <Badge style={{ backgroundColor: `var(--type-${name})` }}>
      {capitalCase(name)}
    </Badge>
  );
}

import type { ReactNode } from "react";

export type BasicInfoRowProps = {
  children: ReactNode;
  label: string;
};

export function BasicInfo(props: BasicInfoRowProps) {
  const { children, label } = props;

  return (
    <div className="flex justify-between space-x-2">
      <span className="font-semibold">{label}</span>
      <div className="inline-flex gap-2 text-muted-foreground">{children}</div>
    </div>
  );
}

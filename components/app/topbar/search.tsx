"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function Search() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <Input
        className="md:w-[100px] lg:w-[300px]"
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Search for an ID ..."
        type="search"
        onChange={(e) => {
          const params = new URLSearchParams(searchParams);
          const query = e.currentTarget.value;

          if (query) params.set("query", query);
          else params.delete("query");

          router.replace(`${pathname}?${params.toString()}`);
        }}
      />
    </div>
  );
}

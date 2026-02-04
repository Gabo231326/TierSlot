"use client";

import * as React from "react";

export type TabItem<T extends string> = {
  key: T;
  label: string;
};

export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={
              "rounded-xl px-3 py-2 text-sm transition " +
              (active
                ? "bg-white text-black"
                : "text-white/80 hover:text-white hover:bg-white/10")
            }
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

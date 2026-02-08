"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import type { Category, Nominee } from "@/lib/ballot/types";

interface CategoryCardProps {
  category: Category;
  nominees: Nominee[];
  selectedNomineeId: string | null;
  onSelect: (nomineeId: string) => void;
}

export function CategoryCard({
  category,
  nominees,
  selectedNomineeId,
  onSelect,
}: CategoryCardProps) {
  const options = nominees.map((n) => ({
    value: n.id,
    label: n.name,
    sublabel: n.movie,
  }));

  return (
    <Card variant="dark" className="w-full h-full flex flex-col rounded-3xl px-6 py-6 min-h-0">
      <CardHeader className="px-0 pt-0 shrink-0">
        <CardTitle className="text-lg font-display">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0 flex-1 min-h-0 flex flex-col min-w-0 overflow-y-auto">
        <RadioGroup
          name={`category-${category.id}`}
          value={selectedNomineeId}
          options={options}
          onChange={onSelect}
        />
      </CardContent>
    </Card>
  );
}

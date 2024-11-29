"use client";

import { ScrollArea } from "../../components/ui/scroll-area";

interface Portal {
  portal: string;
  infoName: string;
  price: number;
}

interface SearchResultsProps {
  results: Portal[] | any;
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      {results.length > 0 ? (
        <div className="space-y-2">
        {results.map((result: Portal | any, index: any) => (
          result.portal ? (
            <div key={index} className="p-2 rounded-lg bg-secondary">
              <p className="text-sm">{result.portal}</p>
              <p className="text-sm">DA {result.DA}</p>
              <p className="text-sm">{result.price}</p>
            </div>
          ) : (
            <p key={index} className="text-sm">Valor Final: R${result.totalPrice}</p>
          )
        ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">Aguardando...</p>
      )}
    </ScrollArea>
  );
}

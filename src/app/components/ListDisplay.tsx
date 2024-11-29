"use client";

import { Button } from "../../components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { List } from "../types/list";

interface ListDisplayProps {
  lists: List[];
  onRemoveList: (id: string) => void;
}

export function ListDisplay({ lists, onRemoveList }: ListDisplayProps) {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {lists.map((list) => (
          <div key={list.id} className="flex flex-col gap-2 p-4 rounded-lg bg-secondary">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{list.name}</h3>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemoveList(list.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{list.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
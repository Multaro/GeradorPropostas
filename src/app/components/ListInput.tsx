"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListInputProps {
  onAddList: (name: string, content: string) => void;
}

export function ListInput({ onAddList }: ListInputProps) {
  const [listName, setListName] = useState('');
  const [listContent, setListContent] = useState('');

  const handleSubmit = () => {
    if (listContent.trim() && listName.trim()) {
      onAddList(listName, listContent);
      setListName('');
      setListContent('');
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Nome da lista..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="p-4">
          <textarea
            placeholder="Digite sua lista aqui..."
            value={listContent}
            onChange={(e) => setListContent(e.target.value)}
            className="w-full min-h-[250px] bg-transparent border-none outline-none resize-none overflow-visible whitespace-pre font-mono text-sm"
            style={{ 
              minWidth: '100%',
              overflowWrap: 'normal'
            }}
          />
        </div>
      </ScrollArea>
      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={!listName.trim() || !listContent.trim()}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Lista
      </Button>
    </div>
  );
}
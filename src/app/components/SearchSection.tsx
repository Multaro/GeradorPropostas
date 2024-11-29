"use client";

import { useState } from 'react';
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search } from "lucide-react";
import { List } from "../types/list";

interface SearchSectionProps {
  lists: List[];
  onSearch: (listId: string, searchTerm: string) => void;
}

export function SearchSection({ lists, onSearch }: SearchSectionProps) {
  const [selectedList, setSelectedList] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (selectedList && searchTerm.trim()) {
      onSearch(selectedList, searchTerm);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <Select value={selectedList} onValueChange={setSelectedList}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma lista" />
          </SelectTrigger>
          <SelectContent>
            {lists.map((list) => (
              <SelectItem key={list.id} value={list.id}>
                {list.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Input
            placeholder="Digite os domínios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Gerar
          </Button>
        </div>
      </div>
    </div>
  );
}
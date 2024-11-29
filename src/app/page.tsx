"use client";

import { useState, useContext } from 'react';
import { ListInput } from './components/ListInput';
import { ListDisplay } from './components/ListDisplay';
import { SearchSection } from './components/SearchSection';
import { SearchResults } from './components/SearchResults';
import { GlobalListContext } from './context/global-list';
import { List } from './types/list';
import { Portal } from './types/portal';

export default function Home() {
  const { portals, addPortal, removePortal } = useContext(GlobalListContext);
  const [lists, setLists] = useState<List[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleAddList = (name: string, content: string) => {
    let portalList: Portal[] = [];

    const contents = content
      .split('\n')
      .filter(content => content.trim() !== '')
      .map(content => content.replace(/\s+/g, ''));
    
    contents.forEach(portal => {
      const infos = portal.split('|');

      const portalName = infos[0] ?? '';
      const DA = (infos[1]?.replace('DA', '')) ?? '';
      const price = parseFloat(infos[2].replace(/[^\d,]+/g, '').replace(',', '.'));

      const newPortal: Portal = {
        portal: portalName,
        DA,
        price
      };

      portalList.push(newPortal);
    });

    const newList: List = {
      id: crypto.randomUUID(),
      name,
      content,
      portals: portalList
    };

    addPortal(newList)
    setLists([...lists, newList]);
  };

  const handleRemoveList = (id: string) => {
    removePortal(id);
  };

  const handleSearch = (listId: string, searchTerms: string) => {
    setSearchResults([]);
    const selectedList = portals.find(list => list.id === listId);
    if (!selectedList) return;

    const terms = searchTerms.split(/[ ,]+/);

    const results: any[] = selectedList.portals.filter(portal => 
        terms.some(term => portal.portal.toLowerCase().includes(term.toLowerCase()))
    );

    const totalPrice = results.reduce((sum, portal) => sum + portal.price, 0);
    results.push({ totalPrice });

    setSearchResults(results);
  };
  
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Gerador de Propostas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Nova Lista</h2>
          <ListInput onAddList={handleAddList} />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Listas Salvas</h2>
          <ListDisplay lists={portals} onRemoveList={handleRemoveList} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Gerar Proposta</h2>
          <SearchSection lists={portals} onSearch={handleSearch} />
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resultados</h2>
          <SearchResults results={searchResults} />
        </div>
      </div>
    </main>
  );
}

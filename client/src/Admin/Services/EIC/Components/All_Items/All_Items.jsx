import React from 'react';
import Item_Card from './item_card.jsx';

export default function All_Items() {
    const items = Array.from({ length: 10 });

    return (
        <>
            <button
                className="flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium shadow bg-green-500 hover:bg-green-600 text-white transition-all"
                onClick={() => setShowAdd(true)}
            >
                <span className="mr-1 text-lg font-bold">+</span> Add Program
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto p-4 rounded-2xl">
                

              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
      

            </div>
        </>
    );
}

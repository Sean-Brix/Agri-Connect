import React from 'react';
import Item_Card from './Item_Card.jsx';

export default function All_Items() {
    const items = Array.from({ length: 10 });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto p-4 rounded-2xl">

              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>
              <Item_Card item={{}}/>

            </div>
        </>
    );
}

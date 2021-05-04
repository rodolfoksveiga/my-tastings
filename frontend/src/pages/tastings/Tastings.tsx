import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

// Interfaces
export interface ITastingsProps {}

export interface ITasting {
  id: number;
  added: string;
  name: string;
  category: string;
  producer: string;
  rating: number;
  color: string;
  appearance: string;
  aroma: string;
  finish: string;
  price: number;
}

// Component
const Tastings: React.FunctionComponent<ITastingsProps> = (props) => {
  const [tastings, setTastings] = useState<ITasting[]>([]);

  const getTastings = async () => {
    let r = await fetch("http://127.0.0.1/api/tastings/");
    let tastings = await r.json();
    console.log(tastings);
    setTastings(tastings);
  };

  useEffect(() => {
    getTastings();
  }, []);

  return (
    <div>
      <h2>Tastings</h2>
      <ul>
        {tastings.map((tasting) => {
          return (
            <li key={tasting.id}>
              <h3>{tasting.name}</h3>
              <Link to={`/tastings/${tasting.id}/`}>Get Details</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tastings;

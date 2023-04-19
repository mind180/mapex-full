import React, { useState, useEffect } from 'react';
import MapPinBig from '../map-pin-big/MapPinBig';
import { processEntity } from '../../../api/api';
import './Suggestions.css';
import Loader from "../loader/Loader";

export default function Suggestions() {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    let isMounted = true;

    processEntity('GET', '/maps/all')
        .then(response => response.json())
        .then(boards => { 
          if (isMounted) setBoards(boards);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));

    return () => { isMounted = false };
  }, []);

  if (loading) return <Loader/>;

  return(
    <div className="suggestions-container">
			<div className="suggestions">
				{boards.map(board =>
						<MapPinBig
							key={board.id}
							id={board.id}
							title={board.name}
							description={board.description}
						/>
				)}
			</div>
    </div>
  );
}
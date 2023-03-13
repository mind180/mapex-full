import React, { useState, useEffect } from 'react';
import AddBoard from "../add-board/AddBoard";
import BoardPin from '../board-pin/BoardPin';
import { processEntity } from '../../../api/api';
import './Dashboard.css';
import Loader from "../loader/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    let isMounted = true;

    processEntity('GET', '/canvas')
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
    <div className="boards-holder">
      <AddBoard/>
      {boards.map(board =>
        <BoardPin
          key={board.id}
          id={board.id}
          title={board.name}
          description={board.description}
        />
      )}
    </div>
  );
}
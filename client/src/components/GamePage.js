import React from 'react'
// import { useNavigate } from 'react-router-dom';


  
    
    function generateGrid(rows,columns,mapper){
    return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper))
    
    }
    
    const newWarBattleGrid = () =>
     generateGrid(7,5,()=>null)
    
    
  export default function GamePage() {
         const grid = newWarBattleGrid()
         const handleClick = (rowIdx, colIdx) => {
          console.log(`Clicked on cell (${rowIdx}, ${colIdx})`);
          // Perform any desired logic or state updates here
        };
         
         console.log(grid)
         return(
         <div style={{}}>
            <Grid grid={grid} handleClick={handleClick}/>
         </div>
     )}
    
    

function Grid({ grid }) {
    return (
      // Wrapping the grid with a div of inline-block means that the grid
      // takes up only the space defined by the size of the cells, while
      // still allowing us to use fractional values for the grid-template-*
      // properties
      <div style={{ display: 'inline-block' }}>
        <div
          style={{
            // We set a background color to be revealed as the lines
            // of the board with the `grid-gap` property
            backgroundColor: '#000',
            display: 'grid',
            // Our rows are equal to the length of our grid
            gridTemplateRows: `repeat(${grid.length}, 1fr)`,
            // Our columns are equal to the length of a row
            gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
            gridGap: 2,
          }}
        >
          {grid.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              // We put the colIdx first because that is our X-axis value
              // and the rowIdx second because that is our Y-axis value
              // Getting in the habit makes using 2d grids much easier
              <Cell key={`${colIdx}-${rowIdx}`}  key={`${colIdx}-${rowIdx}`}
              cell={cell}
              onClick={() => handleClick(rowIdx, colIdx)}
            />
            ))
          )}
        </div>
      </div>
    )
  }
  
  const cellStyle = {
    backgroundColor: '#fff',
    height: 100,
    width: 150,
  }
  
  function Cell({ cell }) {
    return <div style={cellStyle}>{cell}</div>
  }

// ==================================================================================================================================================  
    

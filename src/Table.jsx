import React, { useEffect, useState } from 'react';

function Table({ selectedTeam }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2023-2024');
        const data = await response.json();
        setTableData(data.table || []);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <section id="table" className="min-h-screen w-full px-4 md:px-24 pb-12 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">2023/2024 Season Table</h2>
      <table className="min-w-full table-auto bg-white text-gray-800">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team) => (
            <tr
              key={team.idTeam}
              className={`text-center ${team.strTeam === selectedTeam ? 'bg-yellow-200' : ''}`} // Resalta la fila si el equipo coincide
            >
              <td>{team.intRank}</td>
              <td className="flex items-center justify-center">
                <img src={team.strTeamBadge} alt={`${team.strTeam} badge`} className="w-10 h-10 mr-2" />
                {team.strTeam}
              </td>
              <td>{team.intPlayed}</td>
              <td>{team.intWin}</td>
              <td>{team.intDraw}</td>
              <td>{team.intLoss}</td>
              <td>{team.intGoalsFor}</td>
              <td>{team.intGoalsAgainst}</td>
              <td>{team.intGoalDifference}</td>
              <td>{team.intPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;

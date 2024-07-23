import React, { useEffect, useState } from 'react';
import TableComponent from './Table';
import Matches from './Matches';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
        const data = await response.json();
        console.log(data)
        setTeams(data.teams || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

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

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <section id="teams" className="flex flex-col bg-[#2D4F39] text-white p-12 min-h-screen justify-start items-center">
      <h2 className="text-3xl font-bold mb-4">Choose a Team</h2>
      <select
        className="p-2 my-6 w-80 font-semibold text-[#2D4f39] bg-white"
        value={selectedTeam}
        onChange={handleTeamChange}
      >
        <option value="" disabled>Choose a Team</option>
        {teams.map((team) => (
          <option key={team.idTeam} value={team.strTeam}>
            {team.strTeam}
          </option>
        ))}
      </select>

      {/* Mostrar los últimos eventos del equipo seleccionado */}
      <Matches selectedTeam={selectedTeam} />

      {/* Pasar selectedTeam y tableData a TableComponent */}
      <TableComponent selectedTeam={selectedTeam} tableData={tableData} />
    </section>
  );
}

export default Teams;

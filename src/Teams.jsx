import { useEffect, useState, lazy, Suspense } from 'react';
import Matches from './Matches';
const TableComponent = lazy(() => import('./Table') )
import { fetchTeams, fetchTableData } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      setLoading(true);
      const teamsData = await fetchTeams();
      setTeams(teamsData);
      setLoading(false);
    };

    const getTableData = async () => {
      setLoading(true);
      const tableDataResponse = await fetchTableData();
      setTableData(tableDataResponse);
      setLoading(false);
    };

    getTeams();
    getTableData();
  }, []);


  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <section id="teams" className="flex flex-col  bg-[#2D4F39] text-white p-12 min-h-screen justify-start items-center">
      <h2 className="text-3xl font-bold mb-4">Choose a Team</h2>
      <Suspense fallback={<>Loading...</>}></Suspense>
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

import { useState, useEffect } from "react";
import Table from "./Table";
import Matches from "./Matches";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
  
    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
          const data = await response.json();
          setTeams(data.teams || []);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };
  
      fetchTeams();
    }, []);
  
    const handleTeamChange = (event) => {
      setSelectedTeam(event.target.value);
    };

  return (
    <section
      id="teams"
      className="flex flex-col min-h-screen justify-start items-center text-white bg-[#2D4F39] "
    >
      <select
        className="p-2 my-4 font-semibold text-[#2D4f39] bg-white"
        value={selectedTeam}
        onChange={handleTeamChange}
      >
        <option value="" disabled>
          Choose a Team
        </option>
        {teams.map((team) => (
          <option key={team.idTeam} value={team.strTeam}>
            {team.strTeam}
          </option>
        ))}
      </select>

        
      <Matches selectedTeam={selectedTeam} />

      <Table selectedTeam={selectedTeam} />
    </section>
  );
}

export default Teams;

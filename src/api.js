
export const fetchTeams = async () => {
    try {
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
      const data = await response.json();
      return data.teams || [];
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  };
  
  export const fetchTableData = async () => {
    try {
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2023-2024');
      const data = await response.json();
      return data.table || [];
    } catch (error) {
      console.error('Error fetching table data:', error);
      return [];
    }
  };

  export const fetchTeamEvents = async (selectedTeam) => {
    if (!selectedTeam) return [];
  
    try {
      // Encuentra la información del equipo seleccionado
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League');
      const data = await response.json();
      const selectedTeamInfo = data.teams.find((teamInfo) => teamInfo.strTeam === selectedTeam);
  
      if (selectedTeamInfo) {
        const teamId = selectedTeamInfo.idTeam || selectedTeamInfo.idTeamAPI;
        const eventsUrl = `https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`;
        const eventsResponse = await fetch(eventsUrl);
        const eventsData = await eventsResponse.json();
        return eventsData.results || [];
      } else {
        console.error('No se encontró información para el equipo seleccionado');
        return [];
      }
    } catch (error) {
      console.error('Error fetching team events:', error);
      return [];
    }
  };
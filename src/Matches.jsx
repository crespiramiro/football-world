import { useState, useEffect } from "react";

function Matches({ selectedTeam }) {
  const [teamEvents, setTeamEvents] = useState([]);

  useEffect(() => {
    const fetchTeamEvents = async () => {
      if (!selectedTeam) return;

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
          setTeamEvents(eventsData.results || []);
        } else {
          console.error('No se encontró información para el equipo seleccionado');
          setTeamEvents([]);
        }
      } catch (error) {
        console.error('Error fetching team events:', error);
        setTeamEvents([]);
      }
    };

    fetchTeamEvents();
  }, [selectedTeam]);

  return (
    <div className="team-events text-center w-screen bg-[#2D4F39] px-6 text-white">
      {selectedTeam && teamEvents.length > 0 && (
        <>
          <h2 className="md:text-3xl">{selectedTeam}'s Last Matches</h2>
          <ul className="flex flex-col my-5 gap-y-2">
            {teamEvents.map((event) => (
              <div className="text-xl flex flex-col gap-y-2 mb-3" key={event.idEvent}>
                <li className="text-white md:text-3xl">{event.strEvent} - {event.dateEvent}</li>
                <li className="flex flex-col justify-center items-center">
                  <img src={event.strThumb} alt="Match Thumbnail" width={200} />
                </li>
                <li className="md:text-3xl">{event.intHomeScore} - {event.intAwayScore}</li>
                <button
                  onClick={() => window.open(event.strVideo, "_blank")}
                  className="p-3 h-fit w-fit self-center rounded-lg shadow-xl bg-[#963484] text-white text-sm"
                >
                  Highlights
                </button>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Matches;

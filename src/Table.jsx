import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'keep-react';

function TableComponent({ selectedTeam, tableData }) {
  return (
    <div className="table-container min-h-screen bg-[#2D4F39] h-screen w-full px-4 md:px-24 pb-12 overflow-x-auto overflow-y-visible">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="w-[60px]">Position</div>
            </TableHead>
            <TableHead>
              <div className="w-[150px]">Team</div>
            </TableHead>
            <TableHead>
              <div className="w-[80px]">Played</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">Won</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">Drawn</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">Lost</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">GF</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">GA</div>
            </TableHead>
            <TableHead>
              <div className="w-[60px]">GD</div>
            </TableHead>
            <TableHead>
              <div className="w-[80px]">Points</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((team) => (
            <TableRow
              key={team.idTeam}
              className={team.strTeam === selectedTeam ? 'bg-gray-200' : ''}
              onClick={() => console.log(team.strTeam)}
            >
              <TableCell>
                <div className="text-center">{team.intRank}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {team.strBadge ? (  // Cambiado a 'strBadge'
                    <img
                      src={team.strBadge}
                      alt={`${team.strTeam} badge`}
                      className="w-8 h-8 mr-2"
                      onError={(e) => e.target.src = '/path/to/default/image.png'} // Asegúrate de que esta ruta es correcta
                    />
                  ) : (
                    <div className="w-8 h-8 mr-2">No Badge</div>
                  )}
                  {team.strTeam}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intPlayed}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intWin}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intDraw}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intLoss}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intGoalsFor}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intGoalsAgainst}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intGoalDifference}</div>
              </TableCell>
              <TableCell>
                <div className="text-center">{team.intPoints}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComponent;

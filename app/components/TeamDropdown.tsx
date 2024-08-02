import { useNavigate } from "@remix-run/react";
import "../../styles/ThemedBarChart.css";
// import CustomEmojiBarChart from "~/components/CustomEmojiBarChart";


// export default function AppDevComplience(data: typeof jsonData) {
//   const [team, setTeam] = useState("")

//   const handleTeamSelect = (event: any) => {
//     setTeam(event.target.value)
//   }

//   return (
//     <TeamDropdown teams={teams} onSelect={handleTeamSelect} />
    
//   );
// }

type MonthData = {
  [key: string]: number;
};

type Team = {
  "team-name": string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  unique: number;
  autofixable: number;
  license: number;
  introduced_by_month: MonthData[];
  resolved_by_month: MonthData[];
};

type TeamDropdownProps = {
  teams: Team[];
}

const TeamDropdown = ({ teams }: TeamDropdownProps) => {
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = event.target.value;
    navigate(teamId);
  };

  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        onChange={handleChange}
        defaultValue={'Postings'}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team["team-name"]} value={team["team-name"]}>
            {team["team-name"]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default TeamDropdown
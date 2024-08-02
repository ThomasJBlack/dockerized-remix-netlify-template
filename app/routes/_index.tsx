import { Link } from "@remix-run/react";
import "../../styles/ThemedBarChart.css";
import PieChartComponent from "~/components/PieChart";
import CustomEmojiBarChart from "~/components/CustomEmojiBarChart";
import { getCriticalData, getTopWorstTeams } from "./teams.$team";
import { testData } from "./teams.$team";

export default function Index() {
  const topWorstTeams = getTopWorstTeams(testData);
  const criticalData = getCriticalData(testData, "");

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1
          className="text-center text-9xl font-bold"
          style={{ color: "var(--tw-color-text)" }}
        >
          Snyky 👀
        </h1>
        <h2 className="text-center text-2xl font-bold p-10">
          <Link to="/teams/Postings" className="hover:underline">Teams Overview Page</Link>
        </h2>

        <div className="text-2xl text-center p-20">The worst offenders are these:</div>
          <CustomEmojiBarChart data={topWorstTeams} />
        </div>
        <div className="text-2xl text-center p-20">If you were feeling alone, you are not...</div>
        <div className="flex items-center justify-center p-4">
          <PieChartComponent data={criticalData.all} />
        </div>
      </>
  );
}


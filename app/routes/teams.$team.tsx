import { json, type MetaFunction } from "@remix-run/node";
import "../../styles/ThemedBarChart.css";
import PieChartComponent from "~/components/PieChart";
import CustomEmojiBarChart from "~/components/CustomEmojiBarChart";
import { useLoaderData, useParams } from "@remix-run/react";
import CustomLineChart from "~/components/CustomLineChart";

export interface ChartData {
  data: { name: any; value: any }[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Snyk Thiefs" },
  ];
};

export const loader = async () => {
  //const response = await fetch("http://backend:3000/")
  const data = testData;
  try {
    //data = await response.json()
  } catch (error) {
    throw new Error("bad data");
  }

  // Return the data as a response
  return json(data);
};

export default function Index() {
  const { team } = useParams();
  const team_name = team || "";
  console.log("team_name: ", team_name);

  const data = useLoaderData<typeof loader>();

  const criticalData = getCriticalData(testData, team_name);
  const highData = getHighData(testData, team_name);
  const licenseData = getLicenseData(testData, team_name);

  return (
    <div>
      <div className="flex space-x-4 p-4">
        <div
          className="flex-1 text-white p-4 rounded text-center"
          style={{ backgroundColor: "var(--tw-color-primary)" }}
        >
          <span className="text-3xl">{criticalData.count} Severe</span>
          <br />
          <span className="text-med">Lightcast Average: {Math.round(criticalData.avg)}</span>
        </div>
        <div
          className="flex-1 text-white p-4 rounded text-center"
          style={{ backgroundColor: "var(--tw-color-tertiary)" }}
        >
          <span className="text-3xl">{highData.count} High</span>
          <br />
          <span className="text-med">Lightcast Average: {Math.round(highData.avg)}</span>
        </div>
        <div
          className="flex-1 text-white p-4 rounded text-center"
          style={{
            backgroundColor: getColorWhereGreaterIsWorse(
              licenseData.comparison
            ),
          }}
        >
          <span className="text-3xl">{licenseData.count} Medium Error</span>
          <br />
          <span className="text-med">Lightcast Average: {Math.round(licenseData.avg)}</span>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
          {/* <CustomLineChart data={criticalData.all} /> */}
        </div>
    </div>
  );
}

const getColorWhereGreaterIsWorse = (
  comparison: "greater" | "equal" | "less"
) => {
  const color_variable =
    comparison == "equal"
      ? "var(--tw-color-equal)"
      : comparison == "greater"
        ? "var(--tw-color-worse)"
        : "var(--tw-color-better)";
  return color_variable;
};

export const getTopWorstTeams = (testData: any) => {
  const topSortedTeams = testData.teams
    .sort((a: any, b: any) => b.critical - a.critical)
    .slice(0, 5);
  return Object.values(topSortedTeams).map((value: any) => {
    return { name: value["team-name"], value: value.critical, Criticals: value.critical };
  });
};

export const getCriticalData = (testData: any, team_name: string) => {
  const all_teams = Object.values(testData?.teams).map((value: any) => {
    return { name: value["team-name"], count: value.critical };
  });

  const avg: number = all_teams
    .map((team) => team.count)
    .reduce((acc: number, curr: number) => acc + curr, 0) / all_teams.length;


  return {
    all: all_teams,
    count: all_teams.filter((team) => team.name == team_name)[0]?.count,
    avg: avg
  };
};

export const getHighData = (testData: any, team_name: string) => {
  const all_teams = Object.values(testData?.teams).map((value: any) => {
    return { name: value["team-name"], count: value.high };
  });

  const avg: number = all_teams
      .map((team) => team.count)
      .reduce((acc: number, curr: number) => acc + curr, 0) / all_teams.length;

  return {
    all: all_teams,
    count: all_teams.filter((team) => team.name == team_name)[0]?.count,
    avg: avg
  };
};

const getLicenseData = (testData: any, team_name: string) => {
  const all_teams = Object.values(testData.teams).map((value: any) => {
    return { name: value["team-name"], count: value.medium };
  });

  const avg: number =
    all_teams
      .map((team) => team.count)
      .reduce((acc: number, curr: number) => acc + curr, 0) / all_teams.length;
  const team_count: number = all_teams.filter(
    (team) => team.name == team_name
  )[0].count;

  return {
    all: all_teams,
    avg: avg,
    count: team_count,
    comparison:
      team_count == avg
        ? "equal"
        : team_count > avg
          ? "greater"
          : ("less" as "equal" | "greater" | "less"),
  };
};


export const testData = {
  "teams": [
      {
          "team-name": "API Dev US",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Legacy Data",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Gazelle Production",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Postings",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Aggregation",
          "total": 356,
          "critical": 0,
          "high": 84,
          "medium": 220,
          "low": 52,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 606
              },
              {
                  "day": "2024-01-02",
                  "count": 604
              },
              {
                  "day": "2024-01-03",
                  "count": 604
              },
              {
                  "day": "2024-01-04",
                  "count": 604
              },
              {
                  "day": "2024-01-05",
                  "count": 608
              },
              {
                  "day": "2024-01-06",
                  "count": 594
              },
              {
                  "day": "2024-01-07",
                  "count": 609
              },
              {
                  "day": "2024-01-08",
                  "count": 609
              },
              {
                  "day": "2024-01-09",
                  "count": 609
              },
              {
                  "day": "2024-01-10",
                  "count": 616
              },
              {
                  "day": "2024-01-11",
                  "count": 626
              },
              {
                  "day": "2024-01-12",
                  "count": 621
              },
              {
                  "day": "2024-01-13",
                  "count": 622
              },
              {
                  "day": "2024-01-14",
                  "count": 622
              },
              {
                  "day": "2024-01-15",
                  "count": 622
              },
              {
                  "day": "2024-01-16",
                  "count": 637
              },
              {
                  "day": "2024-01-17",
                  "count": 639
              },
              {
                  "day": "2024-01-18",
                  "count": 639
              },
              {
                  "day": "2024-01-19",
                  "count": 643
              },
              {
                  "day": "2024-01-20",
                  "count": 643
              },
              {
                  "day": "2024-01-21",
                  "count": 643
              },
              {
                  "day": "2024-01-22",
                  "count": 643
              },
              {
                  "day": "2024-01-23",
                  "count": 645
              },
              {
                  "day": "2024-01-24",
                  "count": 647
              },
              {
                  "day": "2024-01-25",
                  "count": 647
              },
              {
                  "day": "2024-01-26",
                  "count": 647
              },
              {
                  "day": "2024-01-27",
                  "count": 643
              },
              {
                  "day": "2024-01-28",
                  "count": 643
              },
              {
                  "day": "2024-01-29",
                  "count": 628
              },
              {
                  "day": "2024-01-30",
                  "count": 632
              },
              {
                  "day": "2024-01-31",
                  "count": 637
              },
              {
                  "day": "2024-02-01",
                  "count": 638
              },
              {
                  "day": "2024-02-02",
                  "count": 639
              },
              {
                  "day": "2024-02-03",
                  "count": 638
              },
              {
                  "day": "2024-02-04",
                  "count": 639
              },
              {
                  "day": "2024-02-05",
                  "count": 642
              },
              {
                  "day": "2024-02-06",
                  "count": 643
              },
              {
                  "day": "2024-02-07",
                  "count": 648
              },
              {
                  "day": "2024-02-08",
                  "count": 649
              },
              {
                  "day": "2024-02-09",
                  "count": 649
              },
              {
                  "day": "2024-02-10",
                  "count": 650
              },
              {
                  "day": "2024-02-11",
                  "count": 651
              },
              {
                  "day": "2024-02-12",
                  "count": 653
              },
              {
                  "day": "2024-02-13",
                  "count": 654
              },
              {
                  "day": "2024-02-14",
                  "count": 644
              },
              {
                  "day": "2024-02-15",
                  "count": 644
              },
              {
                  "day": "2024-02-16",
                  "count": 647
              },
              {
                  "day": "2024-02-17",
                  "count": 648
              },
              {
                  "day": "2024-02-18",
                  "count": 649
              },
              {
                  "day": "2024-02-19",
                  "count": 649
              },
              {
                  "day": "2024-02-20",
                  "count": 665
              },
              {
                  "day": "2024-02-21",
                  "count": 665
              },
              {
                  "day": "2024-02-22",
                  "count": 667
              },
              {
                  "day": "2024-02-23",
                  "count": 664
              },
              {
                  "day": "2024-02-24",
                  "count": 664
              },
              {
                  "day": "2024-02-25",
                  "count": 664
              },
              {
                  "day": "2024-02-26",
                  "count": 664
              },
              {
                  "day": "2024-02-27",
                  "count": 665
              },
              {
                  "day": "2024-02-28",
                  "count": 670
              },
              {
                  "day": "2024-02-29",
                  "count": 675
              },
              {
                  "day": "2024-03-01",
                  "count": 676
              },
              {
                  "day": "2024-03-02",
                  "count": 676
              },
              {
                  "day": "2024-03-03",
                  "count": 676
              },
              {
                  "day": "2024-03-04",
                  "count": 678
              },
              {
                  "day": "2024-03-05",
                  "count": 678
              },
              {
                  "day": "2024-03-06",
                  "count": 679
              },
              {
                  "day": "2024-03-07",
                  "count": 679
              },
              {
                  "day": "2024-03-08",
                  "count": 678
              },
              {
                  "day": "2024-03-09",
                  "count": 679
              },
              {
                  "day": "2024-03-10",
                  "count": 680
              },
              {
                  "day": "2024-03-11",
                  "count": 680
              },
              {
                  "day": "2024-03-12",
                  "count": 679
              },
              {
                  "day": "2024-03-13",
                  "count": 671
              },
              {
                  "day": "2024-03-14",
                  "count": 485
              },
              {
                  "day": "2024-03-15",
                  "count": 486
              },
              {
                  "day": "2024-03-16",
                  "count": 486
              },
              {
                  "day": "2024-03-17",
                  "count": 508
              },
              {
                  "day": "2024-03-18",
                  "count": 485
              },
              {
                  "day": "2024-03-19",
                  "count": 476
              },
              {
                  "day": "2024-03-20",
                  "count": 476
              },
              {
                  "day": "2024-03-21",
                  "count": 479
              },
              {
                  "day": "2024-03-22",
                  "count": 480
              },
              {
                  "day": "2024-03-23",
                  "count": 532
              },
              {
                  "day": "2024-03-24",
                  "count": 482
              },
              {
                  "day": "2024-03-25",
                  "count": 482
              },
              {
                  "day": "2024-03-26",
                  "count": 482
              },
              {
                  "day": "2024-03-27",
                  "count": 482
              },
              {
                  "day": "2024-03-28",
                  "count": 294
              },
              {
                  "day": "2024-03-29",
                  "count": 294
              },
              {
                  "day": "2024-03-30",
                  "count": 294
              },
              {
                  "day": "2024-03-31",
                  "count": 294
              },
              {
                  "day": "2024-04-01",
                  "count": 293
              },
              {
                  "day": "2024-04-02",
                  "count": 293
              },
              {
                  "day": "2024-04-03",
                  "count": 296
              },
              {
                  "day": "2024-04-04",
                  "count": 296
              },
              {
                  "day": "2024-04-05",
                  "count": 294
              },
              {
                  "day": "2024-04-06",
                  "count": 294
              },
              {
                  "day": "2024-04-07",
                  "count": 294
              },
              {
                  "day": "2024-04-08",
                  "count": 294
              },
              {
                  "day": "2024-04-09",
                  "count": 302
              },
              {
                  "day": "2024-04-10",
                  "count": 302
              },
              {
                  "day": "2024-04-11",
                  "count": 302
              },
              {
                  "day": "2024-04-12",
                  "count": 302
              },
              {
                  "day": "2024-04-13",
                  "count": 302
              },
              {
                  "day": "2024-04-14",
                  "count": 309
              },
              {
                  "day": "2024-04-15",
                  "count": 305
              },
              {
                  "day": "2024-04-16",
                  "count": 302
              },
              {
                  "day": "2024-04-17",
                  "count": 304
              },
              {
                  "day": "2024-04-18",
                  "count": 304
              },
              {
                  "day": "2024-04-19",
                  "count": 304
              },
              {
                  "day": "2024-04-20",
                  "count": 304
              },
              {
                  "day": "2024-04-21",
                  "count": 304
              },
              {
                  "day": "2024-04-22",
                  "count": 304
              },
              {
                  "day": "2024-04-23",
                  "count": 305
              },
              {
                  "day": "2024-04-24",
                  "count": 305
              },
              {
                  "day": "2024-04-25",
                  "count": 305
              },
              {
                  "day": "2024-04-26",
                  "count": 308
              },
              {
                  "day": "2024-04-27",
                  "count": 308
              },
              {
                  "day": "2024-04-28",
                  "count": 308
              },
              {
                  "day": "2024-04-29",
                  "count": 308
              },
              {
                  "day": "2024-04-30",
                  "count": 308
              },
              {
                  "day": "2024-05-01",
                  "count": 310
              },
              {
                  "day": "2024-05-02",
                  "count": 310
              },
              {
                  "day": "2024-05-03",
                  "count": 308
              },
              {
                  "day": "2024-05-04",
                  "count": 308
              },
              {
                  "day": "2024-05-05",
                  "count": 307
              },
              {
                  "day": "2024-05-06",
                  "count": 307
              },
              {
                  "day": "2024-05-07",
                  "count": 309
              },
              {
                  "day": "2024-05-08",
                  "count": 309
              },
              {
                  "day": "2024-05-09",
                  "count": 309
              },
              {
                  "day": "2024-05-10",
                  "count": 309
              },
              {
                  "day": "2024-05-11",
                  "count": 309
              },
              {
                  "day": "2024-05-12",
                  "count": 309
              },
              {
                  "day": "2024-05-13",
                  "count": 311
              },
              {
                  "day": "2024-05-14",
                  "count": 314
              },
              {
                  "day": "2024-05-15",
                  "count": 323
              },
              {
                  "day": "2024-05-16",
                  "count": 323
              },
              {
                  "day": "2024-05-17",
                  "count": 323
              },
              {
                  "day": "2024-05-18",
                  "count": 323
              },
              {
                  "day": "2024-05-19",
                  "count": 327
              },
              {
                  "day": "2024-05-20",
                  "count": 329
              },
              {
                  "day": "2024-05-21",
                  "count": 333
              },
              {
                  "day": "2024-05-22",
                  "count": 342
              },
              {
                  "day": "2024-05-23",
                  "count": 342
              },
              {
                  "day": "2024-05-24",
                  "count": 337
              },
              {
                  "day": "2024-05-25",
                  "count": 337
              },
              {
                  "day": "2024-05-26",
                  "count": 337
              },
              {
                  "day": "2024-05-27",
                  "count": 337
              },
              {
                  "day": "2024-05-28",
                  "count": 337
              },
              {
                  "day": "2024-05-29",
                  "count": 342
              },
              {
                  "day": "2024-05-30",
                  "count": 346
              },
              {
                  "day": "2024-05-31",
                  "count": 352
              },
              {
                  "day": "2024-06-01",
                  "count": 356
              }
          ]
      },
      {
          "team-name": "Documents",
          "total": 7409,
          "critical": 98,
          "high": 588,
          "medium": 960,
          "low": 5763,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 6177
              },
              {
                  "day": "2024-01-02",
                  "count": 6174
              },
              {
                  "day": "2024-01-03",
                  "count": 6177
              },
              {
                  "day": "2024-01-04",
                  "count": 6177
              },
              {
                  "day": "2024-01-05",
                  "count": 6183
              },
              {
                  "day": "2024-01-06",
                  "count": 6184
              },
              {
                  "day": "2024-01-07",
                  "count": 6184
              },
              {
                  "day": "2024-01-08",
                  "count": 6182
              },
              {
                  "day": "2024-01-09",
                  "count": 6185
              },
              {
                  "day": "2024-01-10",
                  "count": 6236
              },
              {
                  "day": "2024-01-11",
                  "count": 6290
              },
              {
                  "day": "2024-01-12",
                  "count": 6201
              },
              {
                  "day": "2024-01-13",
                  "count": 6245
              },
              {
                  "day": "2024-01-14",
                  "count": 6245
              },
              {
                  "day": "2024-01-15",
                  "count": 6247
              },
              {
                  "day": "2024-01-16",
                  "count": 6320
              },
              {
                  "day": "2024-01-17",
                  "count": 6398
              },
              {
                  "day": "2024-01-18",
                  "count": 6464
              },
              {
                  "day": "2024-01-19",
                  "count": 6537
              },
              {
                  "day": "2024-01-20",
                  "count": 6538
              },
              {
                  "day": "2024-01-21",
                  "count": 6531
              },
              {
                  "day": "2024-01-22",
                  "count": 6536
              },
              {
                  "day": "2024-01-23",
                  "count": 6531
              },
              {
                  "day": "2024-01-24",
                  "count": 6526
              },
              {
                  "day": "2024-01-25",
                  "count": 6585
              },
              {
                  "day": "2024-01-26",
                  "count": 6592
              },
              {
                  "day": "2024-01-27",
                  "count": 6599
              },
              {
                  "day": "2024-01-28",
                  "count": 6601
              },
              {
                  "day": "2024-01-29",
                  "count": 6586
              },
              {
                  "day": "2024-01-30",
                  "count": 6619
              },
              {
                  "day": "2024-01-31",
                  "count": 6782
              },
              {
                  "day": "2024-02-01",
                  "count": 6732
              },
              {
                  "day": "2024-02-02",
                  "count": 6702
              },
              {
                  "day": "2024-02-03",
                  "count": 6688
              },
              {
                  "day": "2024-02-04",
                  "count": 6705
              },
              {
                  "day": "2024-02-05",
                  "count": 6775
              },
              {
                  "day": "2024-02-06",
                  "count": 6833
              },
              {
                  "day": "2024-02-07",
                  "count": 6876
              },
              {
                  "day": "2024-02-08",
                  "count": 6880
              },
              {
                  "day": "2024-02-09",
                  "count": 6887
              },
              {
                  "day": "2024-02-10",
                  "count": 6890
              },
              {
                  "day": "2024-02-11",
                  "count": 6896
              },
              {
                  "day": "2024-02-12",
                  "count": 6898
              },
              {
                  "day": "2024-02-13",
                  "count": 6898
              },
              {
                  "day": "2024-02-14",
                  "count": 6700
              },
              {
                  "day": "2024-02-15",
                  "count": 6644
              },
              {
                  "day": "2024-02-16",
                  "count": 6628
              },
              {
                  "day": "2024-02-17",
                  "count": 6630
              },
              {
                  "day": "2024-02-18",
                  "count": 6633
              },
              {
                  "day": "2024-02-19",
                  "count": 6641
              },
              {
                  "day": "2024-02-20",
                  "count": 6717
              },
              {
                  "day": "2024-02-21",
                  "count": 6759
              },
              {
                  "day": "2024-02-22",
                  "count": 6765
              },
              {
                  "day": "2024-02-23",
                  "count": 6794
              },
              {
                  "day": "2024-02-24",
                  "count": 6775
              },
              {
                  "day": "2024-02-25",
                  "count": 6767
              },
              {
                  "day": "2024-02-26",
                  "count": 6767
              },
              {
                  "day": "2024-02-27",
                  "count": 6950
              },
              {
                  "day": "2024-02-28",
                  "count": 7027
              },
              {
                  "day": "2024-02-29",
                  "count": 7044
              },
              {
                  "day": "2024-03-01",
                  "count": 7044
              },
              {
                  "day": "2024-03-02",
                  "count": 7045
              },
              {
                  "day": "2024-03-03",
                  "count": 6996
              },
              {
                  "day": "2024-03-04",
                  "count": 7047
              },
              {
                  "day": "2024-03-05",
                  "count": 7055
              },
              {
                  "day": "2024-03-06",
                  "count": 7078
              },
              {
                  "day": "2024-03-07",
                  "count": 7073
              },
              {
                  "day": "2024-03-08",
                  "count": 7094
              },
              {
                  "day": "2024-03-09",
                  "count": 7094
              },
              {
                  "day": "2024-03-10",
                  "count": 7117
              },
              {
                  "day": "2024-03-11",
                  "count": 7142
              },
              {
                  "day": "2024-03-12",
                  "count": 7125
              },
              {
                  "day": "2024-03-13",
                  "count": 7055
              },
              {
                  "day": "2024-03-14",
                  "count": 7059
              },
              {
                  "day": "2024-03-15",
                  "count": 7066
              },
              {
                  "day": "2024-03-16",
                  "count": 7027
              },
              {
                  "day": "2024-03-17",
                  "count": 7053
              },
              {
                  "day": "2024-03-18",
                  "count": 6986
              },
              {
                  "day": "2024-03-19",
                  "count": 6987
              },
              {
                  "day": "2024-03-20",
                  "count": 6987
              },
              {
                  "day": "2024-03-21",
                  "count": 7111
              },
              {
                  "day": "2024-03-22",
                  "count": 7133
              },
              {
                  "day": "2024-03-23",
                  "count": 7185
              },
              {
                  "day": "2024-03-24",
                  "count": 7182
              },
              {
                  "day": "2024-03-25",
                  "count": 7185
              },
              {
                  "day": "2024-03-26",
                  "count": 7186
              },
              {
                  "day": "2024-03-27",
                  "count": 7227
              },
              {
                  "day": "2024-03-28",
                  "count": 7151
              },
              {
                  "day": "2024-03-29",
                  "count": 7127
              },
              {
                  "day": "2024-03-30",
                  "count": 7127
              },
              {
                  "day": "2024-03-31",
                  "count": 7159
              },
              {
                  "day": "2024-04-01",
                  "count": 7131
              },
              {
                  "day": "2024-04-02",
                  "count": 7130
              },
              {
                  "day": "2024-04-03",
                  "count": 7126
              },
              {
                  "day": "2024-04-04",
                  "count": 6920
              },
              {
                  "day": "2024-04-05",
                  "count": 6881
              },
              {
                  "day": "2024-04-06",
                  "count": 6881
              },
              {
                  "day": "2024-04-07",
                  "count": 6881
              },
              {
                  "day": "2024-04-08",
                  "count": 6871
              },
              {
                  "day": "2024-04-09",
                  "count": 6948
              },
              {
                  "day": "2024-04-10",
                  "count": 6947
              },
              {
                  "day": "2024-04-11",
                  "count": 6948
              },
              {
                  "day": "2024-04-12",
                  "count": 6947
              },
              {
                  "day": "2024-04-13",
                  "count": 6947
              },
              {
                  "day": "2024-04-14",
                  "count": 6918
              },
              {
                  "day": "2024-04-15",
                  "count": 6919
              },
              {
                  "day": "2024-04-16",
                  "count": 6957
              },
              {
                  "day": "2024-04-17",
                  "count": 6959
              },
              {
                  "day": "2024-04-18",
                  "count": 6991
              },
              {
                  "day": "2024-04-19",
                  "count": 7022
              },
              {
                  "day": "2024-04-20",
                  "count": 7022
              },
              {
                  "day": "2024-04-21",
                  "count": 7022
              },
              {
                  "day": "2024-04-22",
                  "count": 7022
              },
              {
                  "day": "2024-04-23",
                  "count": 7027
              },
              {
                  "day": "2024-04-24",
                  "count": 7030
              },
              {
                  "day": "2024-04-25",
                  "count": 6984
              },
              {
                  "day": "2024-04-26",
                  "count": 7150
              },
              {
                  "day": "2024-04-27",
                  "count": 7155
              },
              {
                  "day": "2024-04-28",
                  "count": 7135
              },
              {
                  "day": "2024-04-29",
                  "count": 7129
              },
              {
                  "day": "2024-04-30",
                  "count": 7145
              },
              {
                  "day": "2024-05-01",
                  "count": 7149
              },
              {
                  "day": "2024-05-02",
                  "count": 7146
              },
              {
                  "day": "2024-05-03",
                  "count": 7135
              },
              {
                  "day": "2024-05-04",
                  "count": 7134
              },
              {
                  "day": "2024-05-05",
                  "count": 7126
              },
              {
                  "day": "2024-05-06",
                  "count": 7129
              },
              {
                  "day": "2024-05-07",
                  "count": 7132
              },
              {
                  "day": "2024-05-08",
                  "count": 7232
              },
              {
                  "day": "2024-05-09",
                  "count": 7272
              },
              {
                  "day": "2024-05-10",
                  "count": 7294
              },
              {
                  "day": "2024-05-11",
                  "count": 7295
              },
              {
                  "day": "2024-05-12",
                  "count": 7295
              },
              {
                  "day": "2024-05-13",
                  "count": 7296
              },
              {
                  "day": "2024-05-14",
                  "count": 7286
              },
              {
                  "day": "2024-05-15",
                  "count": 7185
              },
              {
                  "day": "2024-05-16",
                  "count": 7199
              },
              {
                  "day": "2024-05-17",
                  "count": 7212
              },
              {
                  "day": "2024-05-18",
                  "count": 7245
              },
              {
                  "day": "2024-05-19",
                  "count": 7273
              },
              {
                  "day": "2024-05-20",
                  "count": 7282
              },
              {
                  "day": "2024-05-21",
                  "count": 7303
              },
              {
                  "day": "2024-05-22",
                  "count": 7323
              },
              {
                  "day": "2024-05-23",
                  "count": 7348
              },
              {
                  "day": "2024-05-24",
                  "count": 7319
              },
              {
                  "day": "2024-05-25",
                  "count": 7318
              },
              {
                  "day": "2024-05-26",
                  "count": 7308
              },
              {
                  "day": "2024-05-27",
                  "count": 7318
              },
              {
                  "day": "2024-05-28",
                  "count": 7319
              },
              {
                  "day": "2024-05-29",
                  "count": 7390
              },
              {
                  "day": "2024-05-30",
                  "count": 7403
              },
              {
                  "day": "2024-05-31",
                  "count": 7406
              },
              {
                  "day": "2024-06-01",
                  "count": 7409
              }
          ]
      },
      {
          "team-name": "Frontline",
          "total": 1039,
          "critical": 16,
          "high": 338,
          "medium": 494,
          "low": 191,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 935
              },
              {
                  "day": "2024-01-02",
                  "count": 936
              },
              {
                  "day": "2024-01-03",
                  "count": 936
              },
              {
                  "day": "2024-01-04",
                  "count": 936
              },
              {
                  "day": "2024-01-05",
                  "count": 937
              },
              {
                  "day": "2024-01-06",
                  "count": 937
              },
              {
                  "day": "2024-01-07",
                  "count": 937
              },
              {
                  "day": "2024-01-08",
                  "count": 937
              },
              {
                  "day": "2024-01-09",
                  "count": 939
              },
              {
                  "day": "2024-01-10",
                  "count": 939
              },
              {
                  "day": "2024-01-11",
                  "count": 939
              },
              {
                  "day": "2024-01-12",
                  "count": 938
              },
              {
                  "day": "2024-01-13",
                  "count": 938
              },
              {
                  "day": "2024-01-14",
                  "count": 938
              },
              {
                  "day": "2024-01-15",
                  "count": 938
              },
              {
                  "day": "2024-01-16",
                  "count": 938
              },
              {
                  "day": "2024-01-17",
                  "count": 942
              },
              {
                  "day": "2024-01-18",
                  "count": 942
              },
              {
                  "day": "2024-01-19",
                  "count": 944
              },
              {
                  "day": "2024-01-20",
                  "count": 944
              },
              {
                  "day": "2024-01-21",
                  "count": 942
              },
              {
                  "day": "2024-01-22",
                  "count": 942
              },
              {
                  "day": "2024-01-23",
                  "count": 942
              },
              {
                  "day": "2024-01-24",
                  "count": 942
              },
              {
                  "day": "2024-01-25",
                  "count": 943
              },
              {
                  "day": "2024-01-26",
                  "count": 944
              },
              {
                  "day": "2024-01-27",
                  "count": 944
              },
              {
                  "day": "2024-01-28",
                  "count": 944
              },
              {
                  "day": "2024-01-29",
                  "count": 944
              },
              {
                  "day": "2024-01-30",
                  "count": 944
              },
              {
                  "day": "2024-01-31",
                  "count": 944
              },
              {
                  "day": "2024-02-01",
                  "count": 944
              },
              {
                  "day": "2024-02-02",
                  "count": 944
              },
              {
                  "day": "2024-02-03",
                  "count": 944
              },
              {
                  "day": "2024-02-04",
                  "count": 944
              },
              {
                  "day": "2024-02-05",
                  "count": 945
              },
              {
                  "day": "2024-02-06",
                  "count": 946
              },
              {
                  "day": "2024-02-07",
                  "count": 946
              },
              {
                  "day": "2024-02-08",
                  "count": 946
              },
              {
                  "day": "2024-02-09",
                  "count": 946
              },
              {
                  "day": "2024-02-10",
                  "count": 946
              },
              {
                  "day": "2024-02-11",
                  "count": 947
              },
              {
                  "day": "2024-02-12",
                  "count": 943
              },
              {
                  "day": "2024-02-13",
                  "count": 943
              },
              {
                  "day": "2024-02-14",
                  "count": 943
              },
              {
                  "day": "2024-02-15",
                  "count": 943
              },
              {
                  "day": "2024-02-16",
                  "count": 943
              },
              {
                  "day": "2024-02-17",
                  "count": 943
              },
              {
                  "day": "2024-02-18",
                  "count": 951
              },
              {
                  "day": "2024-02-19",
                  "count": 951
              },
              {
                  "day": "2024-02-20",
                  "count": 952
              },
              {
                  "day": "2024-02-21",
                  "count": 945
              },
              {
                  "day": "2024-02-22",
                  "count": 945
              },
              {
                  "day": "2024-02-23",
                  "count": 946
              },
              {
                  "day": "2024-02-24",
                  "count": 946
              },
              {
                  "day": "2024-02-25",
                  "count": 946
              },
              {
                  "day": "2024-02-26",
                  "count": 946
              },
              {
                  "day": "2024-02-27",
                  "count": 956
              },
              {
                  "day": "2024-02-28",
                  "count": 957
              },
              {
                  "day": "2024-02-29",
                  "count": 958
              },
              {
                  "day": "2024-03-01",
                  "count": 958
              },
              {
                  "day": "2024-03-02",
                  "count": 959
              },
              {
                  "day": "2024-03-03",
                  "count": 960
              },
              {
                  "day": "2024-03-04",
                  "count": 960
              },
              {
                  "day": "2024-03-05",
                  "count": 960
              },
              {
                  "day": "2024-03-06",
                  "count": 960
              },
              {
                  "day": "2024-03-07",
                  "count": 961
              },
              {
                  "day": "2024-03-08",
                  "count": 963
              },
              {
                  "day": "2024-03-09",
                  "count": 963
              },
              {
                  "day": "2024-03-10",
                  "count": 963
              },
              {
                  "day": "2024-03-11",
                  "count": 963
              },
              {
                  "day": "2024-03-12",
                  "count": 963
              },
              {
                  "day": "2024-03-13",
                  "count": 963
              },
              {
                  "day": "2024-03-14",
                  "count": 985
              },
              {
                  "day": "2024-03-15",
                  "count": 989
              },
              {
                  "day": "2024-03-16",
                  "count": 989
              },
              {
                  "day": "2024-03-17",
                  "count": 989
              },
              {
                  "day": "2024-03-18",
                  "count": 990
              },
              {
                  "day": "2024-03-19",
                  "count": 990
              },
              {
                  "day": "2024-03-20",
                  "count": 990
              },
              {
                  "day": "2024-03-21",
                  "count": 994
              },
              {
                  "day": "2024-03-22",
                  "count": 990
              },
              {
                  "day": "2024-03-23",
                  "count": 990
              },
              {
                  "day": "2024-03-24",
                  "count": 990
              },
              {
                  "day": "2024-03-25",
                  "count": 990
              },
              {
                  "day": "2024-03-26",
                  "count": 991
              },
              {
                  "day": "2024-03-27",
                  "count": 994
              },
              {
                  "day": "2024-03-28",
                  "count": 997
              },
              {
                  "day": "2024-03-29",
                  "count": 979
              },
              {
                  "day": "2024-03-30",
                  "count": 979
              },
              {
                  "day": "2024-03-31",
                  "count": 979
              },
              {
                  "day": "2024-04-01",
                  "count": 979
              },
              {
                  "day": "2024-04-02",
                  "count": 979
              },
              {
                  "day": "2024-04-03",
                  "count": 979
              },
              {
                  "day": "2024-04-04",
                  "count": 968
              },
              {
                  "day": "2024-04-05",
                  "count": 975
              },
              {
                  "day": "2024-04-06",
                  "count": 975
              },
              {
                  "day": "2024-04-07",
                  "count": 975
              },
              {
                  "day": "2024-04-08",
                  "count": 975
              },
              {
                  "day": "2024-04-09",
                  "count": 977
              },
              {
                  "day": "2024-04-10",
                  "count": 977
              },
              {
                  "day": "2024-04-11",
                  "count": 977
              },
              {
                  "day": "2024-04-12",
                  "count": 977
              },
              {
                  "day": "2024-04-13",
                  "count": 977
              },
              {
                  "day": "2024-04-14",
                  "count": 978
              },
              {
                  "day": "2024-04-15",
                  "count": 978
              },
              {
                  "day": "2024-04-16",
                  "count": 978
              },
              {
                  "day": "2024-04-17",
                  "count": 978
              },
              {
                  "day": "2024-04-18",
                  "count": 979
              },
              {
                  "day": "2024-04-19",
                  "count": 976
              },
              {
                  "day": "2024-04-20",
                  "count": 976
              },
              {
                  "day": "2024-04-21",
                  "count": 976
              },
              {
                  "day": "2024-04-22",
                  "count": 976
              },
              {
                  "day": "2024-04-23",
                  "count": 976
              },
              {
                  "day": "2024-04-24",
                  "count": 975
              },
              {
                  "day": "2024-04-25",
                  "count": 975
              },
              {
                  "day": "2024-04-26",
                  "count": 979
              },
              {
                  "day": "2024-04-27",
                  "count": 983
              },
              {
                  "day": "2024-04-28",
                  "count": 983
              },
              {
                  "day": "2024-04-29",
                  "count": 985
              },
              {
                  "day": "2024-04-30",
                  "count": 986
              },
              {
                  "day": "2024-05-01",
                  "count": 986
              },
              {
                  "day": "2024-05-02",
                  "count": 986
              },
              {
                  "day": "2024-05-03",
                  "count": 986
              },
              {
                  "day": "2024-05-04",
                  "count": 986
              },
              {
                  "day": "2024-05-05",
                  "count": 986
              },
              {
                  "day": "2024-05-06",
                  "count": 986
              },
              {
                  "day": "2024-05-07",
                  "count": 987
              },
              {
                  "day": "2024-05-08",
                  "count": 987
              },
              {
                  "day": "2024-05-09",
                  "count": 990
              },
              {
                  "day": "2024-05-10",
                  "count": 990
              },
              {
                  "day": "2024-05-11",
                  "count": 998
              },
              {
                  "day": "2024-05-12",
                  "count": 1003
              },
              {
                  "day": "2024-05-13",
                  "count": 1015
              },
              {
                  "day": "2024-05-14",
                  "count": 1015
              },
              {
                  "day": "2024-05-15",
                  "count": 1017
              },
              {
                  "day": "2024-05-16",
                  "count": 1017
              },
              {
                  "day": "2024-05-17",
                  "count": 1017
              },
              {
                  "day": "2024-05-18",
                  "count": 1017
              },
              {
                  "day": "2024-05-19",
                  "count": 1036
              },
              {
                  "day": "2024-05-20",
                  "count": 1035
              },
              {
                  "day": "2024-05-21",
                  "count": 1033
              },
              {
                  "day": "2024-05-22",
                  "count": 1033
              },
              {
                  "day": "2024-05-23",
                  "count": 1033
              },
              {
                  "day": "2024-05-24",
                  "count": 1033
              },
              {
                  "day": "2024-05-25",
                  "count": 1033
              },
              {
                  "day": "2024-05-26",
                  "count": 1033
              },
              {
                  "day": "2024-05-27",
                  "count": 1033
              },
              {
                  "day": "2024-05-28",
                  "count": 1037
              },
              {
                  "day": "2024-05-29",
                  "count": 1038
              },
              {
                  "day": "2024-05-30",
                  "count": 1039
              },
              {
                  "day": "2024-05-31",
                  "count": 1039
              },
              {
                  "day": "2024-06-01",
                  "count": 1039
              }
          ]
      },
      {
          "team-name": "Talent Transform",
          "total": 257,
          "critical": 3,
          "high": 39,
          "medium": 29,
          "low": 186,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 226
              },
              {
                  "day": "2024-01-02",
                  "count": 227
              },
              {
                  "day": "2024-01-03",
                  "count": 227
              },
              {
                  "day": "2024-01-04",
                  "count": 227
              },
              {
                  "day": "2024-01-05",
                  "count": 229
              },
              {
                  "day": "2024-01-06",
                  "count": 229
              },
              {
                  "day": "2024-01-07",
                  "count": 229
              },
              {
                  "day": "2024-01-08",
                  "count": 229
              },
              {
                  "day": "2024-01-09",
                  "count": 229
              },
              {
                  "day": "2024-01-10",
                  "count": 230
              },
              {
                  "day": "2024-01-11",
                  "count": 230
              },
              {
                  "day": "2024-01-12",
                  "count": 224
              },
              {
                  "day": "2024-01-13",
                  "count": 225
              },
              {
                  "day": "2024-01-14",
                  "count": 225
              },
              {
                  "day": "2024-01-15",
                  "count": 225
              },
              {
                  "day": "2024-01-16",
                  "count": 226
              },
              {
                  "day": "2024-01-17",
                  "count": 228
              },
              {
                  "day": "2024-01-18",
                  "count": 228
              },
              {
                  "day": "2024-01-19",
                  "count": 229
              },
              {
                  "day": "2024-01-20",
                  "count": 229
              },
              {
                  "day": "2024-01-21",
                  "count": 229
              },
              {
                  "day": "2024-01-22",
                  "count": 229
              },
              {
                  "day": "2024-01-23",
                  "count": 229
              },
              {
                  "day": "2024-01-24",
                  "count": 229
              },
              {
                  "day": "2024-01-25",
                  "count": 229
              },
              {
                  "day": "2024-01-26",
                  "count": 232
              },
              {
                  "day": "2024-01-27",
                  "count": 232
              },
              {
                  "day": "2024-01-28",
                  "count": 233
              },
              {
                  "day": "2024-01-29",
                  "count": 233
              },
              {
                  "day": "2024-01-30",
                  "count": 233
              },
              {
                  "day": "2024-01-31",
                  "count": 236
              },
              {
                  "day": "2024-02-01",
                  "count": 236
              },
              {
                  "day": "2024-02-02",
                  "count": 233
              },
              {
                  "day": "2024-02-03",
                  "count": 233
              },
              {
                  "day": "2024-02-04",
                  "count": 234
              },
              {
                  "day": "2024-02-05",
                  "count": 237
              },
              {
                  "day": "2024-02-06",
                  "count": 238
              },
              {
                  "day": "2024-02-07",
                  "count": 238
              },
              {
                  "day": "2024-02-08",
                  "count": 238
              },
              {
                  "day": "2024-02-09",
                  "count": 238
              },
              {
                  "day": "2024-02-10",
                  "count": 239
              },
              {
                  "day": "2024-02-11",
                  "count": 239
              },
              {
                  "day": "2024-02-12",
                  "count": 239
              },
              {
                  "day": "2024-02-13",
                  "count": 239
              },
              {
                  "day": "2024-02-14",
                  "count": 239
              },
              {
                  "day": "2024-02-15",
                  "count": 230
              },
              {
                  "day": "2024-02-16",
                  "count": 230
              },
              {
                  "day": "2024-02-17",
                  "count": 230
              },
              {
                  "day": "2024-02-18",
                  "count": 230
              },
              {
                  "day": "2024-02-19",
                  "count": 230
              },
              {
                  "day": "2024-02-20",
                  "count": 232
              },
              {
                  "day": "2024-02-21",
                  "count": 233
              },
              {
                  "day": "2024-02-22",
                  "count": 233
              },
              {
                  "day": "2024-02-23",
                  "count": 233
              },
              {
                  "day": "2024-02-24",
                  "count": 233
              },
              {
                  "day": "2024-02-25",
                  "count": 233
              },
              {
                  "day": "2024-02-26",
                  "count": 233
              },
              {
                  "day": "2024-02-27",
                  "count": 238
              },
              {
                  "day": "2024-02-28",
                  "count": 238
              },
              {
                  "day": "2024-02-29",
                  "count": 239
              },
              {
                  "day": "2024-03-01",
                  "count": 239
              },
              {
                  "day": "2024-03-02",
                  "count": 239
              },
              {
                  "day": "2024-03-03",
                  "count": 239
              },
              {
                  "day": "2024-03-04",
                  "count": 239
              },
              {
                  "day": "2024-03-05",
                  "count": 239
              },
              {
                  "day": "2024-03-06",
                  "count": 240
              },
              {
                  "day": "2024-03-07",
                  "count": 240
              },
              {
                  "day": "2024-03-08",
                  "count": 241
              },
              {
                  "day": "2024-03-09",
                  "count": 241
              },
              {
                  "day": "2024-03-10",
                  "count": 242
              },
              {
                  "day": "2024-03-11",
                  "count": 242
              },
              {
                  "day": "2024-03-12",
                  "count": 233
              },
              {
                  "day": "2024-03-13",
                  "count": 233
              },
              {
                  "day": "2024-03-14",
                  "count": 233
              },
              {
                  "day": "2024-03-15",
                  "count": 236
              },
              {
                  "day": "2024-03-16",
                  "count": 236
              },
              {
                  "day": "2024-03-17",
                  "count": 236
              },
              {
                  "day": "2024-03-18",
                  "count": 234
              },
              {
                  "day": "2024-03-19",
                  "count": 234
              },
              {
                  "day": "2024-03-20",
                  "count": 234
              },
              {
                  "day": "2024-03-21",
                  "count": 237
              },
              {
                  "day": "2024-03-22",
                  "count": 240
              },
              {
                  "day": "2024-03-23",
                  "count": 240
              },
              {
                  "day": "2024-03-24",
                  "count": 240
              },
              {
                  "day": "2024-03-25",
                  "count": 240
              },
              {
                  "day": "2024-03-26",
                  "count": 240
              },
              {
                  "day": "2024-03-27",
                  "count": 240
              },
              {
                  "day": "2024-03-28",
                  "count": 244
              },
              {
                  "day": "2024-03-29",
                  "count": 244
              },
              {
                  "day": "2024-03-30",
                  "count": 244
              },
              {
                  "day": "2024-03-31",
                  "count": 244
              },
              {
                  "day": "2024-04-01",
                  "count": 244
              },
              {
                  "day": "2024-04-02",
                  "count": 244
              },
              {
                  "day": "2024-04-03",
                  "count": 244
              },
              {
                  "day": "2024-04-04",
                  "count": 245
              },
              {
                  "day": "2024-04-05",
                  "count": 246
              },
              {
                  "day": "2024-04-06",
                  "count": 246
              },
              {
                  "day": "2024-04-07",
                  "count": 246
              },
              {
                  "day": "2024-04-08",
                  "count": 246
              },
              {
                  "day": "2024-04-09",
                  "count": 247
              },
              {
                  "day": "2024-04-10",
                  "count": 247
              },
              {
                  "day": "2024-04-11",
                  "count": 247
              },
              {
                  "day": "2024-04-12",
                  "count": 247
              },
              {
                  "day": "2024-04-13",
                  "count": 247
              },
              {
                  "day": "2024-04-14",
                  "count": 247
              },
              {
                  "day": "2024-04-15",
                  "count": 247
              },
              {
                  "day": "2024-04-16",
                  "count": 247
              },
              {
                  "day": "2024-04-17",
                  "count": 247
              },
              {
                  "day": "2024-04-18",
                  "count": 247
              },
              {
                  "day": "2024-04-19",
                  "count": 248
              },
              {
                  "day": "2024-04-20",
                  "count": 248
              },
              {
                  "day": "2024-04-21",
                  "count": 248
              },
              {
                  "day": "2024-04-22",
                  "count": 248
              },
              {
                  "day": "2024-04-23",
                  "count": 248
              },
              {
                  "day": "2024-04-24",
                  "count": 249
              },
              {
                  "day": "2024-04-25",
                  "count": 247
              },
              {
                  "day": "2024-04-26",
                  "count": 247
              },
              {
                  "day": "2024-04-27",
                  "count": 250
              },
              {
                  "day": "2024-04-28",
                  "count": 250
              },
              {
                  "day": "2024-04-29",
                  "count": 250
              },
              {
                  "day": "2024-04-30",
                  "count": 250
              },
              {
                  "day": "2024-05-01",
                  "count": 250
              },
              {
                  "day": "2024-05-02",
                  "count": 250
              },
              {
                  "day": "2024-05-03",
                  "count": 250
              },
              {
                  "day": "2024-05-04",
                  "count": 250
              },
              {
                  "day": "2024-05-05",
                  "count": 250
              },
              {
                  "day": "2024-05-06",
                  "count": 250
              },
              {
                  "day": "2024-05-07",
                  "count": 250
              },
              {
                  "day": "2024-05-08",
                  "count": 251
              },
              {
                  "day": "2024-05-09",
                  "count": 251
              },
              {
                  "day": "2024-05-10",
                  "count": 251
              },
              {
                  "day": "2024-05-11",
                  "count": 252
              },
              {
                  "day": "2024-05-12",
                  "count": 252
              },
              {
                  "day": "2024-05-13",
                  "count": 254
              },
              {
                  "day": "2024-05-14",
                  "count": 255
              },
              {
                  "day": "2024-05-15",
                  "count": 254
              },
              {
                  "day": "2024-05-16",
                  "count": 254
              },
              {
                  "day": "2024-05-17",
                  "count": 255
              },
              {
                  "day": "2024-05-18",
                  "count": 255
              },
              {
                  "day": "2024-05-19",
                  "count": 255
              },
              {
                  "day": "2024-05-20",
                  "count": 255
              },
              {
                  "day": "2024-05-21",
                  "count": 255
              },
              {
                  "day": "2024-05-22",
                  "count": 254
              },
              {
                  "day": "2024-05-23",
                  "count": 254
              },
              {
                  "day": "2024-05-24",
                  "count": 254
              },
              {
                  "day": "2024-05-25",
                  "count": 254
              },
              {
                  "day": "2024-05-26",
                  "count": 254
              },
              {
                  "day": "2024-05-27",
                  "count": 254
              },
              {
                  "day": "2024-05-28",
                  "count": 254
              },
              {
                  "day": "2024-05-29",
                  "count": 255
              },
              {
                  "day": "2024-05-30",
                  "count": 258
              },
              {
                  "day": "2024-05-31",
                  "count": 258
              },
              {
                  "day": "2024-06-01",
                  "count": 257
              }
          ]
      },
      {
          "team-name": "Skillabi",
          "total": 304,
          "critical": 3,
          "high": 48,
          "medium": 54,
          "low": 199,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 234
              },
              {
                  "day": "2024-01-02",
                  "count": 235
              },
              {
                  "day": "2024-01-03",
                  "count": 235
              },
              {
                  "day": "2024-01-04",
                  "count": 235
              },
              {
                  "day": "2024-01-05",
                  "count": 237
              },
              {
                  "day": "2024-01-06",
                  "count": 237
              },
              {
                  "day": "2024-01-07",
                  "count": 237
              },
              {
                  "day": "2024-01-08",
                  "count": 237
              },
              {
                  "day": "2024-01-09",
                  "count": 238
              },
              {
                  "day": "2024-01-10",
                  "count": 242
              },
              {
                  "day": "2024-01-11",
                  "count": 242
              },
              {
                  "day": "2024-01-12",
                  "count": 237
              },
              {
                  "day": "2024-01-13",
                  "count": 239
              },
              {
                  "day": "2024-01-14",
                  "count": 239
              },
              {
                  "day": "2024-01-15",
                  "count": 239
              },
              {
                  "day": "2024-01-16",
                  "count": 240
              },
              {
                  "day": "2024-01-17",
                  "count": 246
              },
              {
                  "day": "2024-01-18",
                  "count": 247
              },
              {
                  "day": "2024-01-19",
                  "count": 247
              },
              {
                  "day": "2024-01-20",
                  "count": 247
              },
              {
                  "day": "2024-01-21",
                  "count": 247
              },
              {
                  "day": "2024-01-22",
                  "count": 247
              },
              {
                  "day": "2024-01-23",
                  "count": 247
              },
              {
                  "day": "2024-01-24",
                  "count": 247
              },
              {
                  "day": "2024-01-25",
                  "count": 250
              },
              {
                  "day": "2024-01-26",
                  "count": 253
              },
              {
                  "day": "2024-01-27",
                  "count": 252
              },
              {
                  "day": "2024-01-28",
                  "count": 249
              },
              {
                  "day": "2024-01-29",
                  "count": 249
              },
              {
                  "day": "2024-01-30",
                  "count": 249
              },
              {
                  "day": "2024-01-31",
                  "count": 252
              },
              {
                  "day": "2024-02-01",
                  "count": 252
              },
              {
                  "day": "2024-02-02",
                  "count": 249
              },
              {
                  "day": "2024-02-03",
                  "count": 249
              },
              {
                  "day": "2024-02-04",
                  "count": 250
              },
              {
                  "day": "2024-02-05",
                  "count": 253
              },
              {
                  "day": "2024-02-06",
                  "count": 253
              },
              {
                  "day": "2024-02-07",
                  "count": 253
              },
              {
                  "day": "2024-02-08",
                  "count": 253
              },
              {
                  "day": "2024-02-09",
                  "count": 254
              },
              {
                  "day": "2024-02-10",
                  "count": 254
              },
              {
                  "day": "2024-02-11",
                  "count": 255
              },
              {
                  "day": "2024-02-12",
                  "count": 257
              },
              {
                  "day": "2024-02-13",
                  "count": 257
              },
              {
                  "day": "2024-02-14",
                  "count": 257
              },
              {
                  "day": "2024-02-15",
                  "count": 248
              },
              {
                  "day": "2024-02-16",
                  "count": 248
              },
              {
                  "day": "2024-02-17",
                  "count": 248
              },
              {
                  "day": "2024-02-18",
                  "count": 252
              },
              {
                  "day": "2024-02-19",
                  "count": 256
              },
              {
                  "day": "2024-02-20",
                  "count": 256
              },
              {
                  "day": "2024-02-21",
                  "count": 259
              },
              {
                  "day": "2024-02-22",
                  "count": 259
              },
              {
                  "day": "2024-02-23",
                  "count": 259
              },
              {
                  "day": "2024-02-24",
                  "count": 259
              },
              {
                  "day": "2024-02-25",
                  "count": 259
              },
              {
                  "day": "2024-02-26",
                  "count": 259
              },
              {
                  "day": "2024-02-27",
                  "count": 262
              },
              {
                  "day": "2024-02-28",
                  "count": 265
              },
              {
                  "day": "2024-02-29",
                  "count": 265
              },
              {
                  "day": "2024-03-01",
                  "count": 266
              },
              {
                  "day": "2024-03-02",
                  "count": 266
              },
              {
                  "day": "2024-03-03",
                  "count": 266
              },
              {
                  "day": "2024-03-04",
                  "count": 266
              },
              {
                  "day": "2024-03-05",
                  "count": 266
              },
              {
                  "day": "2024-03-06",
                  "count": 267
              },
              {
                  "day": "2024-03-07",
                  "count": 268
              },
              {
                  "day": "2024-03-08",
                  "count": 268
              },
              {
                  "day": "2024-03-09",
                  "count": 268
              },
              {
                  "day": "2024-03-10",
                  "count": 268
              },
              {
                  "day": "2024-03-11",
                  "count": 268
              },
              {
                  "day": "2024-03-12",
                  "count": 269
              },
              {
                  "day": "2024-03-13",
                  "count": 260
              },
              {
                  "day": "2024-03-14",
                  "count": 259
              },
              {
                  "day": "2024-03-15",
                  "count": 262
              },
              {
                  "day": "2024-03-16",
                  "count": 262
              },
              {
                  "day": "2024-03-17",
                  "count": 262
              },
              {
                  "day": "2024-03-18",
                  "count": 260
              },
              {
                  "day": "2024-03-19",
                  "count": 260
              },
              {
                  "day": "2024-03-20",
                  "count": 260
              },
              {
                  "day": "2024-03-21",
                  "count": 263
              },
              {
                  "day": "2024-03-22",
                  "count": 267
              },
              {
                  "day": "2024-03-23",
                  "count": 267
              },
              {
                  "day": "2024-03-24",
                  "count": 267
              },
              {
                  "day": "2024-03-25",
                  "count": 267
              },
              {
                  "day": "2024-03-26",
                  "count": 267
              },
              {
                  "day": "2024-03-27",
                  "count": 268
              },
              {
                  "day": "2024-03-28",
                  "count": 272
              },
              {
                  "day": "2024-03-29",
                  "count": 272
              },
              {
                  "day": "2024-03-30",
                  "count": 272
              },
              {
                  "day": "2024-03-31",
                  "count": 272
              },
              {
                  "day": "2024-04-01",
                  "count": 272
              },
              {
                  "day": "2024-04-02",
                  "count": 272
              },
              {
                  "day": "2024-04-03",
                  "count": 272
              },
              {
                  "day": "2024-04-04",
                  "count": 273
              },
              {
                  "day": "2024-04-05",
                  "count": 273
              },
              {
                  "day": "2024-04-06",
                  "count": 278
              },
              {
                  "day": "2024-04-07",
                  "count": 278
              },
              {
                  "day": "2024-04-08",
                  "count": 278
              },
              {
                  "day": "2024-04-09",
                  "count": 279
              },
              {
                  "day": "2024-04-10",
                  "count": 279
              },
              {
                  "day": "2024-04-11",
                  "count": 279
              },
              {
                  "day": "2024-04-12",
                  "count": 279
              },
              {
                  "day": "2024-04-13",
                  "count": 279
              },
              {
                  "day": "2024-04-14",
                  "count": 283
              },
              {
                  "day": "2024-04-15",
                  "count": 283
              },
              {
                  "day": "2024-04-16",
                  "count": 283
              },
              {
                  "day": "2024-04-17",
                  "count": 283
              },
              {
                  "day": "2024-04-18",
                  "count": 284
              },
              {
                  "day": "2024-04-19",
                  "count": 284
              },
              {
                  "day": "2024-04-20",
                  "count": 284
              },
              {
                  "day": "2024-04-21",
                  "count": 284
              },
              {
                  "day": "2024-04-22",
                  "count": 284
              },
              {
                  "day": "2024-04-23",
                  "count": 285
              },
              {
                  "day": "2024-04-24",
                  "count": 284
              },
              {
                  "day": "2024-04-25",
                  "count": 284
              },
              {
                  "day": "2024-04-26",
                  "count": 286
              },
              {
                  "day": "2024-04-27",
                  "count": 286
              },
              {
                  "day": "2024-04-28",
                  "count": 286
              },
              {
                  "day": "2024-04-29",
                  "count": 287
              },
              {
                  "day": "2024-04-30",
                  "count": 287
              },
              {
                  "day": "2024-05-01",
                  "count": 287
              },
              {
                  "day": "2024-05-02",
                  "count": 287
              },
              {
                  "day": "2024-05-03",
                  "count": 287
              },
              {
                  "day": "2024-05-04",
                  "count": 287
              },
              {
                  "day": "2024-05-05",
                  "count": 287
              },
              {
                  "day": "2024-05-06",
                  "count": 287
              },
              {
                  "day": "2024-05-07",
                  "count": 287
              },
              {
                  "day": "2024-05-08",
                  "count": 288
              },
              {
                  "day": "2024-05-09",
                  "count": 289
              },
              {
                  "day": "2024-05-10",
                  "count": 290
              },
              {
                  "day": "2024-05-11",
                  "count": 291
              },
              {
                  "day": "2024-05-12",
                  "count": 291
              },
              {
                  "day": "2024-05-13",
                  "count": 293
              },
              {
                  "day": "2024-05-14",
                  "count": 300
              },
              {
                  "day": "2024-05-15",
                  "count": 294
              },
              {
                  "day": "2024-05-16",
                  "count": 299
              },
              {
                  "day": "2024-05-17",
                  "count": 300
              },
              {
                  "day": "2024-05-18",
                  "count": 300
              },
              {
                  "day": "2024-05-19",
                  "count": 304
              },
              {
                  "day": "2024-05-20",
                  "count": 305
              },
              {
                  "day": "2024-05-21",
                  "count": 308
              },
              {
                  "day": "2024-05-22",
                  "count": 313
              },
              {
                  "day": "2024-05-23",
                  "count": 313
              },
              {
                  "day": "2024-05-24",
                  "count": 301
              },
              {
                  "day": "2024-05-25",
                  "count": 301
              },
              {
                  "day": "2024-05-26",
                  "count": 301
              },
              {
                  "day": "2024-05-27",
                  "count": 301
              },
              {
                  "day": "2024-05-28",
                  "count": 304
              },
              {
                  "day": "2024-05-29",
                  "count": 304
              },
              {
                  "day": "2024-05-30",
                  "count": 305
              },
              {
                  "day": "2024-05-31",
                  "count": 305
              },
              {
                  "day": "2024-06-01",
                  "count": 304
              }
          ]
      },
      {
          "team-name": "Data Delivery Support",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "eImpact",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Lens",
          "total": 61497,
          "critical": 11,
          "high": 1093,
          "medium": 27592,
          "low": 32801,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 58882
              },
              {
                  "day": "2024-01-02",
                  "count": 58882
              },
              {
                  "day": "2024-01-03",
                  "count": 58882
              },
              {
                  "day": "2024-01-04",
                  "count": 58882
              },
              {
                  "day": "2024-01-05",
                  "count": 58884
              },
              {
                  "day": "2024-01-06",
                  "count": 58884
              },
              {
                  "day": "2024-01-07",
                  "count": 58884
              },
              {
                  "day": "2024-01-08",
                  "count": 58884
              },
              {
                  "day": "2024-01-09",
                  "count": 58884
              },
              {
                  "day": "2024-01-10",
                  "count": 58956
              },
              {
                  "day": "2024-01-11",
                  "count": 59075
              },
              {
                  "day": "2024-01-12",
                  "count": 59168
              },
              {
                  "day": "2024-01-13",
                  "count": 59178
              },
              {
                  "day": "2024-01-14",
                  "count": 59178
              },
              {
                  "day": "2024-01-15",
                  "count": 59178
              },
              {
                  "day": "2024-01-16",
                  "count": 59178
              },
              {
                  "day": "2024-01-17",
                  "count": 59178
              },
              {
                  "day": "2024-01-18",
                  "count": 59178
              },
              {
                  "day": "2024-01-19",
                  "count": 59222
              },
              {
                  "day": "2024-01-20",
                  "count": 59227
              },
              {
                  "day": "2024-01-21",
                  "count": 59227
              },
              {
                  "day": "2024-01-22",
                  "count": 59227
              },
              {
                  "day": "2024-01-23",
                  "count": 59227
              },
              {
                  "day": "2024-01-24",
                  "count": 59227
              },
              {
                  "day": "2024-01-25",
                  "count": 59227
              },
              {
                  "day": "2024-01-26",
                  "count": 59227
              },
              {
                  "day": "2024-01-27",
                  "count": 59227
              },
              {
                  "day": "2024-01-28",
                  "count": 59227
              },
              {
                  "day": "2024-01-29",
                  "count": 59227
              },
              {
                  "day": "2024-01-30",
                  "count": 59227
              },
              {
                  "day": "2024-01-31",
                  "count": 59227
              },
              {
                  "day": "2024-02-01",
                  "count": 59227
              },
              {
                  "day": "2024-02-02",
                  "count": 59227
              },
              {
                  "day": "2024-02-03",
                  "count": 59227
              },
              {
                  "day": "2024-02-04",
                  "count": 59227
              },
              {
                  "day": "2024-02-05",
                  "count": 59257
              },
              {
                  "day": "2024-02-06",
                  "count": 59319
              },
              {
                  "day": "2024-02-07",
                  "count": 59475
              },
              {
                  "day": "2024-02-08",
                  "count": 59519
              },
              {
                  "day": "2024-02-09",
                  "count": 59521
              },
              {
                  "day": "2024-02-10",
                  "count": 59521
              },
              {
                  "day": "2024-02-11",
                  "count": 59521
              },
              {
                  "day": "2024-02-12",
                  "count": 59521
              },
              {
                  "day": "2024-02-13",
                  "count": 59521
              },
              {
                  "day": "2024-02-14",
                  "count": 59689
              },
              {
                  "day": "2024-02-15",
                  "count": 59855
              },
              {
                  "day": "2024-02-16",
                  "count": 59895
              },
              {
                  "day": "2024-02-17",
                  "count": 59774
              },
              {
                  "day": "2024-02-18",
                  "count": 59816
              },
              {
                  "day": "2024-02-19",
                  "count": 59864
              },
              {
                  "day": "2024-02-20",
                  "count": 59864
              },
              {
                  "day": "2024-02-21",
                  "count": 59945
              },
              {
                  "day": "2024-02-22",
                  "count": 60431
              },
              {
                  "day": "2024-02-23",
                  "count": 59291
              },
              {
                  "day": "2024-02-24",
                  "count": 60447
              },
              {
                  "day": "2024-02-25",
                  "count": 60447
              },
              {
                  "day": "2024-02-26",
                  "count": 60447
              },
              {
                  "day": "2024-02-27",
                  "count": 60447
              },
              {
                  "day": "2024-02-28",
                  "count": 60447
              },
              {
                  "day": "2024-02-29",
                  "count": 60597
              },
              {
                  "day": "2024-03-01",
                  "count": 60887
              },
              {
                  "day": "2024-03-02",
                  "count": 60937
              },
              {
                  "day": "2024-03-03",
                  "count": 60937
              },
              {
                  "day": "2024-03-04",
                  "count": 60937
              },
              {
                  "day": "2024-03-05",
                  "count": 60930
              },
              {
                  "day": "2024-03-06",
                  "count": 60894
              },
              {
                  "day": "2024-03-07",
                  "count": 60921
              },
              {
                  "day": "2024-03-08",
                  "count": 60935
              },
              {
                  "day": "2024-03-09",
                  "count": 60937
              },
              {
                  "day": "2024-03-10",
                  "count": 60949
              },
              {
                  "day": "2024-03-11",
                  "count": 60985
              },
              {
                  "day": "2024-03-12",
                  "count": 60986
              },
              {
                  "day": "2024-03-13",
                  "count": 60986
              },
              {
                  "day": "2024-03-14",
                  "count": 60986
              },
              {
                  "day": "2024-03-15",
                  "count": 60988
              },
              {
                  "day": "2024-03-16",
                  "count": 60990
              },
              {
                  "day": "2024-03-17",
                  "count": 60990
              },
              {
                  "day": "2024-03-18",
                  "count": 60992
              },
              {
                  "day": "2024-03-19",
                  "count": 60994
              },
              {
                  "day": "2024-03-20",
                  "count": 60994
              },
              {
                  "day": "2024-03-21",
                  "count": 60994
              },
              {
                  "day": "2024-03-22",
                  "count": 60994
              },
              {
                  "day": "2024-03-23",
                  "count": 60994
              },
              {
                  "day": "2024-03-24",
                  "count": 60994
              },
              {
                  "day": "2024-03-25",
                  "count": 60994
              },
              {
                  "day": "2024-03-26",
                  "count": 60971
              },
              {
                  "day": "2024-03-27",
                  "count": 60998
              },
              {
                  "day": "2024-03-28",
                  "count": 60897
              },
              {
                  "day": "2024-03-29",
                  "count": 60897
              },
              {
                  "day": "2024-03-30",
                  "count": 60897
              },
              {
                  "day": "2024-03-31",
                  "count": 60897
              },
              {
                  "day": "2024-04-01",
                  "count": 60897
              },
              {
                  "day": "2024-04-02",
                  "count": 60897
              },
              {
                  "day": "2024-04-03",
                  "count": 60897
              },
              {
                  "day": "2024-04-04",
                  "count": 61348
              },
              {
                  "day": "2024-04-05",
                  "count": 61357
              },
              {
                  "day": "2024-04-06",
                  "count": 61357
              },
              {
                  "day": "2024-04-07",
                  "count": 61357
              },
              {
                  "day": "2024-04-08",
                  "count": 61357
              },
              {
                  "day": "2024-04-09",
                  "count": 61099
              },
              {
                  "day": "2024-04-10",
                  "count": 61105
              },
              {
                  "day": "2024-04-11",
                  "count": 61105
              },
              {
                  "day": "2024-04-12",
                  "count": 61105
              },
              {
                  "day": "2024-04-13",
                  "count": 61105
              },
              {
                  "day": "2024-04-14",
                  "count": 61087
              },
              {
                  "day": "2024-04-15",
                  "count": 61087
              },
              {
                  "day": "2024-04-16",
                  "count": 61054
              },
              {
                  "day": "2024-04-17",
                  "count": 61054
              },
              {
                  "day": "2024-04-18",
                  "count": 61065
              },
              {
                  "day": "2024-04-19",
                  "count": 61089
              },
              {
                  "day": "2024-04-20",
                  "count": 61089
              },
              {
                  "day": "2024-04-21",
                  "count": 61089
              },
              {
                  "day": "2024-04-22",
                  "count": 61089
              },
              {
                  "day": "2024-04-23",
                  "count": 61089
              },
              {
                  "day": "2024-04-24",
                  "count": 61089
              },
              {
                  "day": "2024-04-25",
                  "count": 61089
              },
              {
                  "day": "2024-04-26",
                  "count": 61089
              },
              {
                  "day": "2024-04-27",
                  "count": 61099
              },
              {
                  "day": "2024-04-28",
                  "count": 61289
              },
              {
                  "day": "2024-04-29",
                  "count": 61319
              },
              {
                  "day": "2024-04-30",
                  "count": 61319
              },
              {
                  "day": "2024-05-01",
                  "count": 61349
              },
              {
                  "day": "2024-05-02",
                  "count": 61349
              },
              {
                  "day": "2024-05-03",
                  "count": 61349
              },
              {
                  "day": "2024-05-04",
                  "count": 61349
              },
              {
                  "day": "2024-05-05",
                  "count": 61349
              },
              {
                  "day": "2024-05-06",
                  "count": 61349
              },
              {
                  "day": "2024-05-07",
                  "count": 61349
              },
              {
                  "day": "2024-05-08",
                  "count": 61349
              },
              {
                  "day": "2024-05-09",
                  "count": 61349
              },
              {
                  "day": "2024-05-10",
                  "count": 61368
              },
              {
                  "day": "2024-05-11",
                  "count": 61372
              },
              {
                  "day": "2024-05-12",
                  "count": 61372
              },
              {
                  "day": "2024-05-13",
                  "count": 61372
              },
              {
                  "day": "2024-05-14",
                  "count": 61372
              },
              {
                  "day": "2024-05-15",
                  "count": 61416
              },
              {
                  "day": "2024-05-16",
                  "count": 61438
              },
              {
                  "day": "2024-05-17",
                  "count": 61438
              },
              {
                  "day": "2024-05-18",
                  "count": 61438
              },
              {
                  "day": "2024-05-19",
                  "count": 61439
              },
              {
                  "day": "2024-05-20",
                  "count": 61440
              },
              {
                  "day": "2024-05-21",
                  "count": 61442
              },
              {
                  "day": "2024-05-22",
                  "count": 61442
              },
              {
                  "day": "2024-05-23",
                  "count": 61442
              },
              {
                  "day": "2024-05-24",
                  "count": 61441
              },
              {
                  "day": "2024-05-25",
                  "count": 61440
              },
              {
                  "day": "2024-05-26",
                  "count": 61440
              },
              {
                  "day": "2024-05-27",
                  "count": 61471
              },
              {
                  "day": "2024-05-28",
                  "count": 61471
              },
              {
                  "day": "2024-05-29",
                  "count": 61473
              },
              {
                  "day": "2024-05-30",
                  "count": 61520
              },
              {
                  "day": "2024-05-31",
                  "count": 61520
              },
              {
                  "day": "2024-06-01",
                  "count": 61497
              }
          ]
      },
      {
          "team-name": "SkillFit",
          "total": 67,
          "critical": 0,
          "high": 6,
          "medium": 9,
          "low": 52,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 127
              },
              {
                  "day": "2024-01-02",
                  "count": 123
              },
              {
                  "day": "2024-01-03",
                  "count": 109
              },
              {
                  "day": "2024-01-04",
                  "count": 109
              },
              {
                  "day": "2024-01-05",
                  "count": 115
              },
              {
                  "day": "2024-01-06",
                  "count": 115
              },
              {
                  "day": "2024-01-07",
                  "count": 115
              },
              {
                  "day": "2024-01-08",
                  "count": 115
              },
              {
                  "day": "2024-01-09",
                  "count": 114
              },
              {
                  "day": "2024-01-10",
                  "count": 115
              },
              {
                  "day": "2024-01-11",
                  "count": 115
              },
              {
                  "day": "2024-01-12",
                  "count": 115
              },
              {
                  "day": "2024-01-13",
                  "count": 115
              },
              {
                  "day": "2024-01-14",
                  "count": 115
              },
              {
                  "day": "2024-01-15",
                  "count": 115
              },
              {
                  "day": "2024-01-16",
                  "count": 115
              },
              {
                  "day": "2024-01-17",
                  "count": 115
              },
              {
                  "day": "2024-01-18",
                  "count": 115
              },
              {
                  "day": "2024-01-19",
                  "count": 115
              },
              {
                  "day": "2024-01-20",
                  "count": 115
              },
              {
                  "day": "2024-01-21",
                  "count": 115
              },
              {
                  "day": "2024-01-22",
                  "count": 115
              },
              {
                  "day": "2024-01-23",
                  "count": 115
              },
              {
                  "day": "2024-01-24",
                  "count": 115
              },
              {
                  "day": "2024-01-25",
                  "count": 115
              },
              {
                  "day": "2024-01-26",
                  "count": 115
              },
              {
                  "day": "2024-01-27",
                  "count": 115
              },
              {
                  "day": "2024-01-28",
                  "count": 115
              },
              {
                  "day": "2024-01-29",
                  "count": 115
              },
              {
                  "day": "2024-01-30",
                  "count": 115
              },
              {
                  "day": "2024-01-31",
                  "count": 115
              },
              {
                  "day": "2024-02-01",
                  "count": 115
              },
              {
                  "day": "2024-02-02",
                  "count": 115
              },
              {
                  "day": "2024-02-03",
                  "count": 115
              },
              {
                  "day": "2024-02-04",
                  "count": 115
              },
              {
                  "day": "2024-02-05",
                  "count": 115
              },
              {
                  "day": "2024-02-06",
                  "count": 115
              },
              {
                  "day": "2024-02-07",
                  "count": 115
              },
              {
                  "day": "2024-02-08",
                  "count": 115
              },
              {
                  "day": "2024-02-09",
                  "count": 115
              },
              {
                  "day": "2024-02-10",
                  "count": 115
              },
              {
                  "day": "2024-02-11",
                  "count": 115
              },
              {
                  "day": "2024-02-12",
                  "count": 116
              },
              {
                  "day": "2024-02-13",
                  "count": 102
              },
              {
                  "day": "2024-02-14",
                  "count": 102
              },
              {
                  "day": "2024-02-15",
                  "count": 102
              },
              {
                  "day": "2024-02-16",
                  "count": 102
              },
              {
                  "day": "2024-02-17",
                  "count": 102
              },
              {
                  "day": "2024-02-18",
                  "count": 102
              },
              {
                  "day": "2024-02-19",
                  "count": 102
              },
              {
                  "day": "2024-02-20",
                  "count": 102
              },
              {
                  "day": "2024-02-21",
                  "count": 102
              },
              {
                  "day": "2024-02-22",
                  "count": 102
              },
              {
                  "day": "2024-02-23",
                  "count": 102
              },
              {
                  "day": "2024-02-24",
                  "count": 102
              },
              {
                  "day": "2024-02-25",
                  "count": 102
              },
              {
                  "day": "2024-02-26",
                  "count": 92
              },
              {
                  "day": "2024-02-27",
                  "count": 92
              },
              {
                  "day": "2024-02-28",
                  "count": 92
              },
              {
                  "day": "2024-02-29",
                  "count": 92
              },
              {
                  "day": "2024-03-01",
                  "count": 92
              },
              {
                  "day": "2024-03-02",
                  "count": 92
              },
              {
                  "day": "2024-03-03",
                  "count": 92
              },
              {
                  "day": "2024-03-04",
                  "count": 92
              },
              {
                  "day": "2024-03-05",
                  "count": 92
              },
              {
                  "day": "2024-03-06",
                  "count": 92
              },
              {
                  "day": "2024-03-07",
                  "count": 92
              },
              {
                  "day": "2024-03-08",
                  "count": 92
              },
              {
                  "day": "2024-03-09",
                  "count": 92
              },
              {
                  "day": "2024-03-10",
                  "count": 92
              },
              {
                  "day": "2024-03-11",
                  "count": 92
              },
              {
                  "day": "2024-03-12",
                  "count": 92
              },
              {
                  "day": "2024-03-13",
                  "count": 78
              },
              {
                  "day": "2024-03-14",
                  "count": 78
              },
              {
                  "day": "2024-03-15",
                  "count": 81
              },
              {
                  "day": "2024-03-16",
                  "count": 81
              },
              {
                  "day": "2024-03-17",
                  "count": 81
              },
              {
                  "day": "2024-03-18",
                  "count": 81
              },
              {
                  "day": "2024-03-19",
                  "count": 79
              },
              {
                  "day": "2024-03-20",
                  "count": 67
              },
              {
                  "day": "2024-03-21",
                  "count": 67
              },
              {
                  "day": "2024-03-22",
                  "count": 67
              },
              {
                  "day": "2024-03-23",
                  "count": 67
              },
              {
                  "day": "2024-03-24",
                  "count": 67
              },
              {
                  "day": "2024-03-25",
                  "count": 67
              },
              {
                  "day": "2024-03-26",
                  "count": 67
              },
              {
                  "day": "2024-03-27",
                  "count": 67
              },
              {
                  "day": "2024-03-28",
                  "count": 67
              },
              {
                  "day": "2024-03-29",
                  "count": 67
              },
              {
                  "day": "2024-03-30",
                  "count": 67
              },
              {
                  "day": "2024-03-31",
                  "count": 67
              },
              {
                  "day": "2024-04-01",
                  "count": 67
              },
              {
                  "day": "2024-04-02",
                  "count": 67
              },
              {
                  "day": "2024-04-03",
                  "count": 67
              },
              {
                  "day": "2024-04-04",
                  "count": 67
              },
              {
                  "day": "2024-04-05",
                  "count": 67
              },
              {
                  "day": "2024-04-06",
                  "count": 67
              },
              {
                  "day": "2024-04-07",
                  "count": 67
              },
              {
                  "day": "2024-04-08",
                  "count": 67
              },
              {
                  "day": "2024-04-09",
                  "count": 67
              },
              {
                  "day": "2024-04-10",
                  "count": 67
              },
              {
                  "day": "2024-04-11",
                  "count": 67
              },
              {
                  "day": "2024-04-12",
                  "count": 67
              },
              {
                  "day": "2024-04-13",
                  "count": 67
              },
              {
                  "day": "2024-04-14",
                  "count": 68
              },
              {
                  "day": "2024-04-15",
                  "count": 68
              },
              {
                  "day": "2024-04-16",
                  "count": 68
              },
              {
                  "day": "2024-04-17",
                  "count": 68
              },
              {
                  "day": "2024-04-18",
                  "count": 68
              },
              {
                  "day": "2024-04-19",
                  "count": 68
              },
              {
                  "day": "2024-04-20",
                  "count": 68
              },
              {
                  "day": "2024-04-21",
                  "count": 68
              },
              {
                  "day": "2024-04-22",
                  "count": 68
              },
              {
                  "day": "2024-04-23",
                  "count": 68
              },
              {
                  "day": "2024-04-24",
                  "count": 68
              },
              {
                  "day": "2024-04-25",
                  "count": 68
              },
              {
                  "day": "2024-04-26",
                  "count": 68
              },
              {
                  "day": "2024-04-27",
                  "count": 68
              },
              {
                  "day": "2024-04-28",
                  "count": 68
              },
              {
                  "day": "2024-04-29",
                  "count": 69
              },
              {
                  "day": "2024-04-30",
                  "count": 69
              },
              {
                  "day": "2024-05-01",
                  "count": 69
              },
              {
                  "day": "2024-05-02",
                  "count": 69
              },
              {
                  "day": "2024-05-03",
                  "count": 69
              },
              {
                  "day": "2024-05-04",
                  "count": 69
              },
              {
                  "day": "2024-05-05",
                  "count": 69
              },
              {
                  "day": "2024-05-06",
                  "count": 71
              },
              {
                  "day": "2024-05-07",
                  "count": 71
              },
              {
                  "day": "2024-05-08",
                  "count": 71
              },
              {
                  "day": "2024-05-09",
                  "count": 71
              },
              {
                  "day": "2024-05-10",
                  "count": 71
              },
              {
                  "day": "2024-05-11",
                  "count": 71
              },
              {
                  "day": "2024-05-12",
                  "count": 71
              },
              {
                  "day": "2024-05-13",
                  "count": 72
              },
              {
                  "day": "2024-05-14",
                  "count": 72
              },
              {
                  "day": "2024-05-15",
                  "count": 72
              },
              {
                  "day": "2024-05-16",
                  "count": 72
              },
              {
                  "day": "2024-05-17",
                  "count": 72
              },
              {
                  "day": "2024-05-18",
                  "count": 72
              },
              {
                  "day": "2024-05-19",
                  "count": 72
              },
              {
                  "day": "2024-05-20",
                  "count": 72
              },
              {
                  "day": "2024-05-21",
                  "count": 70
              },
              {
                  "day": "2024-05-22",
                  "count": 70
              },
              {
                  "day": "2024-05-23",
                  "count": 68
              },
              {
                  "day": "2024-05-24",
                  "count": 68
              },
              {
                  "day": "2024-05-25",
                  "count": 68
              },
              {
                  "day": "2024-05-26",
                  "count": 68
              },
              {
                  "day": "2024-05-27",
                  "count": 68
              },
              {
                  "day": "2024-05-28",
                  "count": 68
              },
              {
                  "day": "2024-05-29",
                  "count": 68
              },
              {
                  "day": "2024-05-30",
                  "count": 68
              },
              {
                  "day": "2024-05-31",
                  "count": 67
              },
              {
                  "day": "2024-06-01",
                  "count": 67
              }
          ]
      },
      {
          "team-name": "Micro",
          "total": 5016,
          "critical": 63,
          "high": 202,
          "medium": 384,
          "low": 4367,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 4412
              },
              {
                  "day": "2024-01-02",
                  "count": 4413
              },
              {
                  "day": "2024-01-03",
                  "count": 4413
              },
              {
                  "day": "2024-01-04",
                  "count": 4413
              },
              {
                  "day": "2024-01-05",
                  "count": 4416
              },
              {
                  "day": "2024-01-06",
                  "count": 4416
              },
              {
                  "day": "2024-01-07",
                  "count": 4416
              },
              {
                  "day": "2024-01-08",
                  "count": 4416
              },
              {
                  "day": "2024-01-09",
                  "count": 4416
              },
              {
                  "day": "2024-01-10",
                  "count": 4449
              },
              {
                  "day": "2024-01-11",
                  "count": 4485
              },
              {
                  "day": "2024-01-12",
                  "count": 4429
              },
              {
                  "day": "2024-01-13",
                  "count": 4463
              },
              {
                  "day": "2024-01-14",
                  "count": 4463
              },
              {
                  "day": "2024-01-15",
                  "count": 4464
              },
              {
                  "day": "2024-01-16",
                  "count": 4477
              },
              {
                  "day": "2024-01-17",
                  "count": 4555
              },
              {
                  "day": "2024-01-18",
                  "count": 4580
              },
              {
                  "day": "2024-01-19",
                  "count": 4589
              },
              {
                  "day": "2024-01-20",
                  "count": 4590
              },
              {
                  "day": "2024-01-21",
                  "count": 4600
              },
              {
                  "day": "2024-01-22",
                  "count": 4600
              },
              {
                  "day": "2024-01-23",
                  "count": 4587
              },
              {
                  "day": "2024-01-24",
                  "count": 4586
              },
              {
                  "day": "2024-01-25",
                  "count": 4610
              },
              {
                  "day": "2024-01-26",
                  "count": 4647
              },
              {
                  "day": "2024-01-27",
                  "count": 4654
              },
              {
                  "day": "2024-01-28",
                  "count": 4655
              },
              {
                  "day": "2024-01-29",
                  "count": 4655
              },
              {
                  "day": "2024-01-30",
                  "count": 4657
              },
              {
                  "day": "2024-01-31",
                  "count": 4699
              },
              {
                  "day": "2024-02-01",
                  "count": 4714
              },
              {
                  "day": "2024-02-02",
                  "count": 4652
              },
              {
                  "day": "2024-02-03",
                  "count": 4669
              },
              {
                  "day": "2024-02-04",
                  "count": 4672
              },
              {
                  "day": "2024-02-05",
                  "count": 4710
              },
              {
                  "day": "2024-02-06",
                  "count": 4744
              },
              {
                  "day": "2024-02-07",
                  "count": 4764
              },
              {
                  "day": "2024-02-08",
                  "count": 4766
              },
              {
                  "day": "2024-02-09",
                  "count": 4767
              },
              {
                  "day": "2024-02-10",
                  "count": 4770
              },
              {
                  "day": "2024-02-11",
                  "count": 4775
              },
              {
                  "day": "2024-02-12",
                  "count": 4777
              },
              {
                  "day": "2024-02-13",
                  "count": 4772
              },
              {
                  "day": "2024-02-14",
                  "count": 4632
              },
              {
                  "day": "2024-02-15",
                  "count": 4572
              },
              {
                  "day": "2024-02-16",
                  "count": 4561
              },
              {
                  "day": "2024-02-17",
                  "count": 4557
              },
              {
                  "day": "2024-02-18",
                  "count": 4556
              },
              {
                  "day": "2024-02-19",
                  "count": 4557
              },
              {
                  "day": "2024-02-20",
                  "count": 4591
              },
              {
                  "day": "2024-02-21",
                  "count": 4618
              },
              {
                  "day": "2024-02-22",
                  "count": 4622
              },
              {
                  "day": "2024-02-23",
                  "count": 4622
              },
              {
                  "day": "2024-02-24",
                  "count": 4622
              },
              {
                  "day": "2024-02-25",
                  "count": 4622
              },
              {
                  "day": "2024-02-26",
                  "count": 4622
              },
              {
                  "day": "2024-02-27",
                  "count": 4738
              },
              {
                  "day": "2024-02-28",
                  "count": 4816
              },
              {
                  "day": "2024-02-29",
                  "count": 4824
              },
              {
                  "day": "2024-03-01",
                  "count": 4824
              },
              {
                  "day": "2024-03-02",
                  "count": 4824
              },
              {
                  "day": "2024-03-03",
                  "count": 4825
              },
              {
                  "day": "2024-03-04",
                  "count": 4825
              },
              {
                  "day": "2024-03-05",
                  "count": 4829
              },
              {
                  "day": "2024-03-06",
                  "count": 4835
              },
              {
                  "day": "2024-03-07",
                  "count": 4858
              },
              {
                  "day": "2024-03-08",
                  "count": 4873
              },
              {
                  "day": "2024-03-09",
                  "count": 4873
              },
              {
                  "day": "2024-03-10",
                  "count": 4904
              },
              {
                  "day": "2024-03-11",
                  "count": 4910
              },
              {
                  "day": "2024-03-12",
                  "count": 4903
              },
              {
                  "day": "2024-03-13",
                  "count": 4854
              },
              {
                  "day": "2024-03-14",
                  "count": 4837
              },
              {
                  "day": "2024-03-15",
                  "count": 4801
              },
              {
                  "day": "2024-03-16",
                  "count": 4801
              },
              {
                  "day": "2024-03-17",
                  "count": 4801
              },
              {
                  "day": "2024-03-18",
                  "count": 4781
              },
              {
                  "day": "2024-03-19",
                  "count": 4781
              },
              {
                  "day": "2024-03-20",
                  "count": 4781
              },
              {
                  "day": "2024-03-21",
                  "count": 4869
              },
              {
                  "day": "2024-03-22",
                  "count": 4879
              },
              {
                  "day": "2024-03-23",
                  "count": 4886
              },
              {
                  "day": "2024-03-24",
                  "count": 4884
              },
              {
                  "day": "2024-03-25",
                  "count": 4884
              },
              {
                  "day": "2024-03-26",
                  "count": 4884
              },
              {
                  "day": "2024-03-27",
                  "count": 4902
              },
              {
                  "day": "2024-03-28",
                  "count": 4957
              },
              {
                  "day": "2024-03-29",
                  "count": 4958
              },
              {
                  "day": "2024-03-30",
                  "count": 4958
              },
              {
                  "day": "2024-03-31",
                  "count": 4959
              },
              {
                  "day": "2024-04-01",
                  "count": 4962
              },
              {
                  "day": "2024-04-02",
                  "count": 4962
              },
              {
                  "day": "2024-04-03",
                  "count": 4693
              },
              {
                  "day": "2024-04-04",
                  "count": 4704
              },
              {
                  "day": "2024-04-05",
                  "count": 4711
              },
              {
                  "day": "2024-04-06",
                  "count": 4711
              },
              {
                  "day": "2024-04-07",
                  "count": 4711
              },
              {
                  "day": "2024-04-08",
                  "count": 4711
              },
              {
                  "day": "2024-04-09",
                  "count": 4753
              },
              {
                  "day": "2024-04-10",
                  "count": 4749
              },
              {
                  "day": "2024-04-11",
                  "count": 4749
              },
              {
                  "day": "2024-04-12",
                  "count": 4748
              },
              {
                  "day": "2024-04-13",
                  "count": 4748
              },
              {
                  "day": "2024-04-14",
                  "count": 4740
              },
              {
                  "day": "2024-04-15",
                  "count": 4741
              },
              {
                  "day": "2024-04-16",
                  "count": 4771
              },
              {
                  "day": "2024-04-17",
                  "count": 4771
              },
              {
                  "day": "2024-04-18",
                  "count": 4805
              },
              {
                  "day": "2024-04-19",
                  "count": 4810
              },
              {
                  "day": "2024-04-20",
                  "count": 4810
              },
              {
                  "day": "2024-04-21",
                  "count": 4810
              },
              {
                  "day": "2024-04-22",
                  "count": 4803
              },
              {
                  "day": "2024-04-23",
                  "count": 4810
              },
              {
                  "day": "2024-04-24",
                  "count": 4816
              },
              {
                  "day": "2024-04-25",
                  "count": 4780
              },
              {
                  "day": "2024-04-26",
                  "count": 4918
              },
              {
                  "day": "2024-04-27",
                  "count": 4899
              },
              {
                  "day": "2024-04-28",
                  "count": 4896
              },
              {
                  "day": "2024-04-29",
                  "count": 4896
              },
              {
                  "day": "2024-04-30",
                  "count": 4907
              },
              {
                  "day": "2024-05-01",
                  "count": 4907
              },
              {
                  "day": "2024-05-02",
                  "count": 4907
              },
              {
                  "day": "2024-05-03",
                  "count": 4902
              },
              {
                  "day": "2024-05-04",
                  "count": 4902
              },
              {
                  "day": "2024-05-05",
                  "count": 4903
              },
              {
                  "day": "2024-05-06",
                  "count": 4906
              },
              {
                  "day": "2024-05-07",
                  "count": 4910
              },
              {
                  "day": "2024-05-08",
                  "count": 4981
              },
              {
                  "day": "2024-05-09",
                  "count": 5023
              },
              {
                  "day": "2024-05-10",
                  "count": 5031
              },
              {
                  "day": "2024-05-11",
                  "count": 5035
              },
              {
                  "day": "2024-05-12",
                  "count": 5035
              },
              {
                  "day": "2024-05-13",
                  "count": 5037
              },
              {
                  "day": "2024-05-14",
                  "count": 5025
              },
              {
                  "day": "2024-05-15",
                  "count": 4938
              },
              {
                  "day": "2024-05-16",
                  "count": 4920
              },
              {
                  "day": "2024-05-17",
                  "count": 4956
              },
              {
                  "day": "2024-05-18",
                  "count": 4958
              },
              {
                  "day": "2024-05-19",
                  "count": 4967
              },
              {
                  "day": "2024-05-20",
                  "count": 4968
              },
              {
                  "day": "2024-05-21",
                  "count": 4976
              },
              {
                  "day": "2024-05-22",
                  "count": 4982
              },
              {
                  "day": "2024-05-23",
                  "count": 4985
              },
              {
                  "day": "2024-05-24",
                  "count": 4985
              },
              {
                  "day": "2024-05-25",
                  "count": 4965
              },
              {
                  "day": "2024-05-26",
                  "count": 4965
              },
              {
                  "day": "2024-05-27",
                  "count": 4985
              },
              {
                  "day": "2024-05-28",
                  "count": 4985
              },
              {
                  "day": "2024-05-29",
                  "count": 5004
              },
              {
                  "day": "2024-05-30",
                  "count": 5030
              },
              {
                  "day": "2024-05-31",
                  "count": 5033
              },
              {
                  "day": "2024-06-01",
                  "count": 5016
              }
          ]
      },
      {
          "team-name": "Tabulaex",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Nova",
          "total": 109,
          "critical": 0,
          "high": 13,
          "medium": 59,
          "low": 37,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 76
              },
              {
                  "day": "2024-01-02",
                  "count": 76
              },
              {
                  "day": "2024-01-03",
                  "count": 76
              },
              {
                  "day": "2024-01-04",
                  "count": 76
              },
              {
                  "day": "2024-01-05",
                  "count": 76
              },
              {
                  "day": "2024-01-06",
                  "count": 76
              },
              {
                  "day": "2024-01-07",
                  "count": 76
              },
              {
                  "day": "2024-01-08",
                  "count": 76
              },
              {
                  "day": "2024-01-09",
                  "count": 76
              },
              {
                  "day": "2024-01-10",
                  "count": 84
              },
              {
                  "day": "2024-01-11",
                  "count": 86
              },
              {
                  "day": "2024-01-12",
                  "count": 86
              },
              {
                  "day": "2024-01-13",
                  "count": 86
              },
              {
                  "day": "2024-01-14",
                  "count": 86
              },
              {
                  "day": "2024-01-15",
                  "count": 86
              },
              {
                  "day": "2024-01-16",
                  "count": 96
              },
              {
                  "day": "2024-01-17",
                  "count": 96
              },
              {
                  "day": "2024-01-18",
                  "count": 96
              },
              {
                  "day": "2024-01-19",
                  "count": 96
              },
              {
                  "day": "2024-01-20",
                  "count": 96
              },
              {
                  "day": "2024-01-21",
                  "count": 96
              },
              {
                  "day": "2024-01-22",
                  "count": 96
              },
              {
                  "day": "2024-01-23",
                  "count": 96
              },
              {
                  "day": "2024-01-24",
                  "count": 96
              },
              {
                  "day": "2024-01-25",
                  "count": 96
              },
              {
                  "day": "2024-01-26",
                  "count": 92
              },
              {
                  "day": "2024-01-27",
                  "count": 88
              },
              {
                  "day": "2024-01-28",
                  "count": 88
              },
              {
                  "day": "2024-01-29",
                  "count": 88
              },
              {
                  "day": "2024-01-30",
                  "count": 88
              },
              {
                  "day": "2024-01-31",
                  "count": 86
              },
              {
                  "day": "2024-02-01",
                  "count": 80
              },
              {
                  "day": "2024-02-02",
                  "count": 63
              },
              {
                  "day": "2024-02-03",
                  "count": 81
              },
              {
                  "day": "2024-02-04",
                  "count": 81
              },
              {
                  "day": "2024-02-05",
                  "count": 81
              },
              {
                  "day": "2024-02-06",
                  "count": 81
              },
              {
                  "day": "2024-02-07",
                  "count": 82
              },
              {
                  "day": "2024-02-08",
                  "count": 82
              },
              {
                  "day": "2024-02-09",
                  "count": 82
              },
              {
                  "day": "2024-02-10",
                  "count": 64
              },
              {
                  "day": "2024-02-11",
                  "count": 64
              },
              {
                  "day": "2024-02-12",
                  "count": 82
              },
              {
                  "day": "2024-02-13",
                  "count": 82
              },
              {
                  "day": "2024-02-14",
                  "count": 82
              },
              {
                  "day": "2024-02-15",
                  "count": 82
              },
              {
                  "day": "2024-02-16",
                  "count": 82
              },
              {
                  "day": "2024-02-17",
                  "count": 82
              },
              {
                  "day": "2024-02-18",
                  "count": 82
              },
              {
                  "day": "2024-02-19",
                  "count": 82
              },
              {
                  "day": "2024-02-20",
                  "count": 82
              },
              {
                  "day": "2024-02-21",
                  "count": 82
              },
              {
                  "day": "2024-02-22",
                  "count": 82
              },
              {
                  "day": "2024-02-23",
                  "count": 83
              },
              {
                  "day": "2024-02-24",
                  "count": 83
              },
              {
                  "day": "2024-02-25",
                  "count": 83
              },
              {
                  "day": "2024-02-26",
                  "count": 83
              },
              {
                  "day": "2024-02-27",
                  "count": 83
              },
              {
                  "day": "2024-02-28",
                  "count": 83
              },
              {
                  "day": "2024-02-29",
                  "count": 83
              },
              {
                  "day": "2024-03-01",
                  "count": 83
              },
              {
                  "day": "2024-03-02",
                  "count": 83
              },
              {
                  "day": "2024-03-03",
                  "count": 83
              },
              {
                  "day": "2024-03-04",
                  "count": 83
              },
              {
                  "day": "2024-03-05",
                  "count": 83
              },
              {
                  "day": "2024-03-06",
                  "count": 83
              },
              {
                  "day": "2024-03-07",
                  "count": 83
              },
              {
                  "day": "2024-03-08",
                  "count": 83
              },
              {
                  "day": "2024-03-09",
                  "count": 83
              },
              {
                  "day": "2024-03-10",
                  "count": 83
              },
              {
                  "day": "2024-03-11",
                  "count": 83
              },
              {
                  "day": "2024-03-12",
                  "count": 83
              },
              {
                  "day": "2024-03-13",
                  "count": 83
              },
              {
                  "day": "2024-03-14",
                  "count": 83
              },
              {
                  "day": "2024-03-15",
                  "count": 83
              },
              {
                  "day": "2024-03-16",
                  "count": 83
              },
              {
                  "day": "2024-03-17",
                  "count": 83
              },
              {
                  "day": "2024-03-18",
                  "count": 83
              },
              {
                  "day": "2024-03-19",
                  "count": 83
              },
              {
                  "day": "2024-03-20",
                  "count": 83
              },
              {
                  "day": "2024-03-21",
                  "count": 83
              },
              {
                  "day": "2024-03-22",
                  "count": 83
              },
              {
                  "day": "2024-03-23",
                  "count": 83
              },
              {
                  "day": "2024-03-24",
                  "count": 83
              },
              {
                  "day": "2024-03-25",
                  "count": 83
              },
              {
                  "day": "2024-03-26",
                  "count": 83
              },
              {
                  "day": "2024-03-27",
                  "count": 83
              },
              {
                  "day": "2024-03-28",
                  "count": 83
              },
              {
                  "day": "2024-03-29",
                  "count": 83
              },
              {
                  "day": "2024-03-30",
                  "count": 83
              },
              {
                  "day": "2024-03-31",
                  "count": 83
              },
              {
                  "day": "2024-04-01",
                  "count": 83
              },
              {
                  "day": "2024-04-02",
                  "count": 83
              },
              {
                  "day": "2024-04-03",
                  "count": 83
              },
              {
                  "day": "2024-04-04",
                  "count": 83
              },
              {
                  "day": "2024-04-05",
                  "count": 83
              },
              {
                  "day": "2024-04-06",
                  "count": 83
              },
              {
                  "day": "2024-04-07",
                  "count": 83
              },
              {
                  "day": "2024-04-08",
                  "count": 82
              },
              {
                  "day": "2024-04-09",
                  "count": 92
              },
              {
                  "day": "2024-04-10",
                  "count": 92
              },
              {
                  "day": "2024-04-11",
                  "count": 92
              },
              {
                  "day": "2024-04-12",
                  "count": 92
              },
              {
                  "day": "2024-04-13",
                  "count": 92
              },
              {
                  "day": "2024-04-14",
                  "count": 92
              },
              {
                  "day": "2024-04-15",
                  "count": 92
              },
              {
                  "day": "2024-04-16",
                  "count": 92
              },
              {
                  "day": "2024-04-17",
                  "count": 92
              },
              {
                  "day": "2024-04-18",
                  "count": 92
              },
              {
                  "day": "2024-04-19",
                  "count": 92
              },
              {
                  "day": "2024-04-20",
                  "count": 92
              },
              {
                  "day": "2024-04-21",
                  "count": 92
              },
              {
                  "day": "2024-04-22",
                  "count": 92
              },
              {
                  "day": "2024-04-23",
                  "count": 92
              },
              {
                  "day": "2024-04-24",
                  "count": 92
              },
              {
                  "day": "2024-04-25",
                  "count": 92
              },
              {
                  "day": "2024-04-26",
                  "count": 92
              },
              {
                  "day": "2024-04-27",
                  "count": 92
              },
              {
                  "day": "2024-04-28",
                  "count": 92
              },
              {
                  "day": "2024-04-29",
                  "count": 92
              },
              {
                  "day": "2024-04-30",
                  "count": 92
              },
              {
                  "day": "2024-05-01",
                  "count": 92
              },
              {
                  "day": "2024-05-02",
                  "count": 92
              },
              {
                  "day": "2024-05-03",
                  "count": 92
              },
              {
                  "day": "2024-05-04",
                  "count": 92
              },
              {
                  "day": "2024-05-05",
                  "count": 89
              },
              {
                  "day": "2024-05-06",
                  "count": 88
              },
              {
                  "day": "2024-05-07",
                  "count": 88
              },
              {
                  "day": "2024-05-08",
                  "count": 88
              },
              {
                  "day": "2024-05-09",
                  "count": 88
              },
              {
                  "day": "2024-05-10",
                  "count": 88
              },
              {
                  "day": "2024-05-11",
                  "count": 88
              },
              {
                  "day": "2024-05-12",
                  "count": 88
              },
              {
                  "day": "2024-05-13",
                  "count": 88
              },
              {
                  "day": "2024-05-14",
                  "count": 88
              },
              {
                  "day": "2024-05-15",
                  "count": 88
              },
              {
                  "day": "2024-05-16",
                  "count": 88
              },
              {
                  "day": "2024-05-17",
                  "count": 88
              },
              {
                  "day": "2024-05-18",
                  "count": 88
              },
              {
                  "day": "2024-05-19",
                  "count": 92
              },
              {
                  "day": "2024-05-20",
                  "count": 92
              },
              {
                  "day": "2024-05-21",
                  "count": 98
              },
              {
                  "day": "2024-05-22",
                  "count": 99
              },
              {
                  "day": "2024-05-23",
                  "count": 99
              },
              {
                  "day": "2024-05-24",
                  "count": 99
              },
              {
                  "day": "2024-05-25",
                  "count": 99
              },
              {
                  "day": "2024-05-26",
                  "count": 99
              },
              {
                  "day": "2024-05-27",
                  "count": 99
              },
              {
                  "day": "2024-05-28",
                  "count": 99
              },
              {
                  "day": "2024-05-29",
                  "count": 105
              },
              {
                  "day": "2024-05-30",
                  "count": 109
              },
              {
                  "day": "2024-05-31",
                  "count": 109
              },
              {
                  "day": "2024-06-01",
                  "count": 109
              }
          ]
      },
      {
          "team-name": "Networking",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Aggregation Dev",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Alumni Pathways",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Lens API",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Company Datastore",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "NLP",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Log Archive",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Profiles",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Data Delivery",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Product Models",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Business Intelligence",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Markeplace Main",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Lightcast Master",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Emsi Data",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Gazelle Development",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Consulting Automation",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Analyst",
          "total": 1358,
          "critical": 45,
          "high": 207,
          "medium": 267,
          "low": 839,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 1281
              },
              {
                  "day": "2024-01-02",
                  "count": 1281
              },
              {
                  "day": "2024-01-03",
                  "count": 1281
              },
              {
                  "day": "2024-01-04",
                  "count": 1281
              },
              {
                  "day": "2024-01-05",
                  "count": 1281
              },
              {
                  "day": "2024-01-06",
                  "count": 1281
              },
              {
                  "day": "2024-01-07",
                  "count": 1281
              },
              {
                  "day": "2024-01-08",
                  "count": 1281
              },
              {
                  "day": "2024-01-09",
                  "count": 1282
              },
              {
                  "day": "2024-01-10",
                  "count": 1283
              },
              {
                  "day": "2024-01-11",
                  "count": 1284
              },
              {
                  "day": "2024-01-12",
                  "count": 1277
              },
              {
                  "day": "2024-01-13",
                  "count": 1278
              },
              {
                  "day": "2024-01-14",
                  "count": 1278
              },
              {
                  "day": "2024-01-15",
                  "count": 1278
              },
              {
                  "day": "2024-01-16",
                  "count": 1280
              },
              {
                  "day": "2024-01-17",
                  "count": 1286
              },
              {
                  "day": "2024-01-18",
                  "count": 1289
              },
              {
                  "day": "2024-01-19",
                  "count": 1292
              },
              {
                  "day": "2024-01-20",
                  "count": 1292
              },
              {
                  "day": "2024-01-21",
                  "count": 1290
              },
              {
                  "day": "2024-01-22",
                  "count": 1290
              },
              {
                  "day": "2024-01-23",
                  "count": 1291
              },
              {
                  "day": "2024-01-24",
                  "count": 1291
              },
              {
                  "day": "2024-01-25",
                  "count": 1295
              },
              {
                  "day": "2024-01-26",
                  "count": 1296
              },
              {
                  "day": "2024-01-27",
                  "count": 1298
              },
              {
                  "day": "2024-01-28",
                  "count": 1298
              },
              {
                  "day": "2024-01-29",
                  "count": 1298
              },
              {
                  "day": "2024-01-30",
                  "count": 1298
              },
              {
                  "day": "2024-01-31",
                  "count": 1299
              },
              {
                  "day": "2024-02-01",
                  "count": 1296
              },
              {
                  "day": "2024-02-02",
                  "count": 1295
              },
              {
                  "day": "2024-02-03",
                  "count": 1297
              },
              {
                  "day": "2024-02-04",
                  "count": 1297
              },
              {
                  "day": "2024-02-05",
                  "count": 1300
              },
              {
                  "day": "2024-02-06",
                  "count": 1303
              },
              {
                  "day": "2024-02-07",
                  "count": 1303
              },
              {
                  "day": "2024-02-08",
                  "count": 1305
              },
              {
                  "day": "2024-02-09",
                  "count": 1306
              },
              {
                  "day": "2024-02-10",
                  "count": 1307
              },
              {
                  "day": "2024-02-11",
                  "count": 1307
              },
              {
                  "day": "2024-02-12",
                  "count": 1308
              },
              {
                  "day": "2024-02-13",
                  "count": 1308
              },
              {
                  "day": "2024-02-14",
                  "count": 1302
              },
              {
                  "day": "2024-02-15",
                  "count": 1293
              },
              {
                  "day": "2024-02-16",
                  "count": 1293
              },
              {
                  "day": "2024-02-17",
                  "count": 1293
              },
              {
                  "day": "2024-02-18",
                  "count": 1293
              },
              {
                  "day": "2024-02-19",
                  "count": 1293
              },
              {
                  "day": "2024-02-20",
                  "count": 1298
              },
              {
                  "day": "2024-02-21",
                  "count": 1301
              },
              {
                  "day": "2024-02-22",
                  "count": 1301
              },
              {
                  "day": "2024-02-23",
                  "count": 1301
              },
              {
                  "day": "2024-02-24",
                  "count": 1301
              },
              {
                  "day": "2024-02-25",
                  "count": 1301
              },
              {
                  "day": "2024-02-26",
                  "count": 1301
              },
              {
                  "day": "2024-02-27",
                  "count": 1316
              },
              {
                  "day": "2024-02-28",
                  "count": 1318
              },
              {
                  "day": "2024-02-29",
                  "count": 1318
              },
              {
                  "day": "2024-03-01",
                  "count": 1318
              },
              {
                  "day": "2024-03-02",
                  "count": 1319
              },
              {
                  "day": "2024-03-03",
                  "count": 1319
              },
              {
                  "day": "2024-03-04",
                  "count": 1319
              },
              {
                  "day": "2024-03-05",
                  "count": 1320
              },
              {
                  "day": "2024-03-06",
                  "count": 1320
              },
              {
                  "day": "2024-03-07",
                  "count": 1321
              },
              {
                  "day": "2024-03-08",
                  "count": 1322
              },
              {
                  "day": "2024-03-09",
                  "count": 1322
              },
              {
                  "day": "2024-03-10",
                  "count": 1322
              },
              {
                  "day": "2024-03-11",
                  "count": 1323
              },
              {
                  "day": "2024-03-12",
                  "count": 1322
              },
              {
                  "day": "2024-03-13",
                  "count": 1314
              },
              {
                  "day": "2024-03-14",
                  "count": 1313
              },
              {
                  "day": "2024-03-15",
                  "count": 1313
              },
              {
                  "day": "2024-03-16",
                  "count": 1313
              },
              {
                  "day": "2024-03-17",
                  "count": 1313
              },
              {
                  "day": "2024-03-18",
                  "count": 1311
              },
              {
                  "day": "2024-03-19",
                  "count": 1311
              },
              {
                  "day": "2024-03-20",
                  "count": 1311
              },
              {
                  "day": "2024-03-21",
                  "count": 1316
              },
              {
                  "day": "2024-03-22",
                  "count": 1318
              },
              {
                  "day": "2024-03-23",
                  "count": 1320
              },
              {
                  "day": "2024-03-24",
                  "count": 1320
              },
              {
                  "day": "2024-03-25",
                  "count": 1320
              },
              {
                  "day": "2024-03-26",
                  "count": 1320
              },
              {
                  "day": "2024-03-27",
                  "count": 1325
              },
              {
                  "day": "2024-03-28",
                  "count": 1328
              },
              {
                  "day": "2024-03-29",
                  "count": 1328
              },
              {
                  "day": "2024-03-30",
                  "count": 1328
              },
              {
                  "day": "2024-03-31",
                  "count": 1328
              },
              {
                  "day": "2024-04-01",
                  "count": 1328
              },
              {
                  "day": "2024-04-02",
                  "count": 1328
              },
              {
                  "day": "2024-04-03",
                  "count": 1328
              },
              {
                  "day": "2024-04-04",
                  "count": 1330
              },
              {
                  "day": "2024-04-05",
                  "count": 1330
              },
              {
                  "day": "2024-04-06",
                  "count": 1331
              },
              {
                  "day": "2024-04-07",
                  "count": 1331
              },
              {
                  "day": "2024-04-08",
                  "count": 1331
              },
              {
                  "day": "2024-04-09",
                  "count": 1334
              },
              {
                  "day": "2024-04-10",
                  "count": 1334
              },
              {
                  "day": "2024-04-11",
                  "count": 1334
              },
              {
                  "day": "2024-04-12",
                  "count": 1334
              },
              {
                  "day": "2024-04-13",
                  "count": 1334
              },
              {
                  "day": "2024-04-14",
                  "count": 1333
              },
              {
                  "day": "2024-04-15",
                  "count": 1333
              },
              {
                  "day": "2024-04-16",
                  "count": 1334
              },
              {
                  "day": "2024-04-17",
                  "count": 1333
              },
              {
                  "day": "2024-04-18",
                  "count": 1335
              },
              {
                  "day": "2024-04-19",
                  "count": 1334
              },
              {
                  "day": "2024-04-20",
                  "count": 1335
              },
              {
                  "day": "2024-04-21",
                  "count": 1335
              },
              {
                  "day": "2024-04-22",
                  "count": 1335
              },
              {
                  "day": "2024-04-23",
                  "count": 1335
              },
              {
                  "day": "2024-04-24",
                  "count": 1336
              },
              {
                  "day": "2024-04-25",
                  "count": 1333
              },
              {
                  "day": "2024-04-26",
                  "count": 1339
              },
              {
                  "day": "2024-04-27",
                  "count": 1339
              },
              {
                  "day": "2024-04-28",
                  "count": 1339
              },
              {
                  "day": "2024-04-29",
                  "count": 1339
              },
              {
                  "day": "2024-04-30",
                  "count": 1339
              },
              {
                  "day": "2024-05-01",
                  "count": 1339
              },
              {
                  "day": "2024-05-02",
                  "count": 1339
              },
              {
                  "day": "2024-05-03",
                  "count": 1338
              },
              {
                  "day": "2024-05-04",
                  "count": 1338
              },
              {
                  "day": "2024-05-05",
                  "count": 1338
              },
              {
                  "day": "2024-05-06",
                  "count": 1337
              },
              {
                  "day": "2024-05-07",
                  "count": 1337
              },
              {
                  "day": "2024-05-08",
                  "count": 1338
              },
              {
                  "day": "2024-05-09",
                  "count": 1348
              },
              {
                  "day": "2024-05-10",
                  "count": 1349
              },
              {
                  "day": "2024-05-11",
                  "count": 1349
              },
              {
                  "day": "2024-05-12",
                  "count": 1349
              },
              {
                  "day": "2024-05-13",
                  "count": 1351
              },
              {
                  "day": "2024-05-14",
                  "count": 1355
              },
              {
                  "day": "2024-05-15",
                  "count": 1350
              },
              {
                  "day": "2024-05-16",
                  "count": 1349
              },
              {
                  "day": "2024-05-17",
                  "count": 1349
              },
              {
                  "day": "2024-05-18",
                  "count": 1350
              },
              {
                  "day": "2024-05-19",
                  "count": 1352
              },
              {
                  "day": "2024-05-20",
                  "count": 1352
              },
              {
                  "day": "2024-05-21",
                  "count": 1352
              },
              {
                  "day": "2024-05-22",
                  "count": 1353
              },
              {
                  "day": "2024-05-23",
                  "count": 1354
              },
              {
                  "day": "2024-05-24",
                  "count": 1354
              },
              {
                  "day": "2024-05-25",
                  "count": 1354
              },
              {
                  "day": "2024-05-26",
                  "count": 1354
              },
              {
                  "day": "2024-05-27",
                  "count": 1354
              },
              {
                  "day": "2024-05-28",
                  "count": 1355
              },
              {
                  "day": "2024-05-29",
                  "count": 1358
              },
              {
                  "day": "2024-05-30",
                  "count": 1358
              },
              {
                  "day": "2024-05-31",
                  "count": 1358
              },
              {
                  "day": "2024-06-01",
                  "count": 1358
              }
          ]
      },
      {
          "team-name": "Data Science India",
          "total": 30,
          "critical": 2,
          "high": 10,
          "medium": 10,
          "low": 8,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 4
              },
              {
                  "day": "2024-01-04",
                  "count": 4
              },
              {
                  "day": "2024-01-05",
                  "count": 4
              },
              {
                  "day": "2024-01-06",
                  "count": 4
              },
              {
                  "day": "2024-01-07",
                  "count": 4
              },
              {
                  "day": "2024-01-08",
                  "count": 4
              },
              {
                  "day": "2024-01-09",
                  "count": 4
              },
              {
                  "day": "2024-01-10",
                  "count": 5
              },
              {
                  "day": "2024-01-11",
                  "count": 5
              },
              {
                  "day": "2024-01-12",
                  "count": 5
              },
              {
                  "day": "2024-01-13",
                  "count": 5
              },
              {
                  "day": "2024-01-14",
                  "count": 5
              },
              {
                  "day": "2024-01-15",
                  "count": 5
              },
              {
                  "day": "2024-01-16",
                  "count": 6
              },
              {
                  "day": "2024-01-17",
                  "count": 6
              },
              {
                  "day": "2024-01-18",
                  "count": 6
              },
              {
                  "day": "2024-01-19",
                  "count": 6
              },
              {
                  "day": "2024-01-20",
                  "count": 6
              },
              {
                  "day": "2024-01-21",
                  "count": 6
              },
              {
                  "day": "2024-01-22",
                  "count": 6
              },
              {
                  "day": "2024-01-23",
                  "count": 6
              },
              {
                  "day": "2024-01-24",
                  "count": 6
              },
              {
                  "day": "2024-01-25",
                  "count": 6
              },
              {
                  "day": "2024-01-26",
                  "count": 4
              },
              {
                  "day": "2024-01-27",
                  "count": 4
              },
              {
                  "day": "2024-01-28",
                  "count": 4
              },
              {
                  "day": "2024-01-29",
                  "count": 4
              },
              {
                  "day": "2024-01-30",
                  "count": 4
              },
              {
                  "day": "2024-01-31",
                  "count": 2
              },
              {
                  "day": "2024-02-01",
                  "count": 2
              },
              {
                  "day": "2024-02-02",
                  "count": 2
              },
              {
                  "day": "2024-02-03",
                  "count": 2
              },
              {
                  "day": "2024-02-04",
                  "count": 2
              },
              {
                  "day": "2024-02-05",
                  "count": 2
              },
              {
                  "day": "2024-02-06",
                  "count": 2
              },
              {
                  "day": "2024-02-07",
                  "count": 2
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 30
              },
              {
                  "day": "2024-05-28",
                  "count": 30
              },
              {
                  "day": "2024-05-29",
                  "count": 30
              },
              {
                  "day": "2024-05-30",
                  "count": 30
              },
              {
                  "day": "2024-05-31",
                  "count": 30
              },
              {
                  "day": "2024-06-01",
                  "count": 30
              }
          ]
      },
      {
          "team-name": "Career Coach Dev",
          "total": 1207,
          "critical": 4,
          "high": 293,
          "medium": 549,
          "low": 361,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 1699
              },
              {
                  "day": "2024-01-02",
                  "count": 1729
              },
              {
                  "day": "2024-01-03",
                  "count": 1732
              },
              {
                  "day": "2024-01-04",
                  "count": 1735
              },
              {
                  "day": "2024-01-05",
                  "count": 1753
              },
              {
                  "day": "2024-01-06",
                  "count": 1753
              },
              {
                  "day": "2024-01-07",
                  "count": 1753
              },
              {
                  "day": "2024-01-08",
                  "count": 1753
              },
              {
                  "day": "2024-01-09",
                  "count": 1767
              },
              {
                  "day": "2024-01-10",
                  "count": 1790
              },
              {
                  "day": "2024-01-11",
                  "count": 1807
              },
              {
                  "day": "2024-01-12",
                  "count": 1807
              },
              {
                  "day": "2024-01-13",
                  "count": 1807
              },
              {
                  "day": "2024-01-14",
                  "count": 1807
              },
              {
                  "day": "2024-01-15",
                  "count": 1811
              },
              {
                  "day": "2024-01-16",
                  "count": 1816
              },
              {
                  "day": "2024-01-17",
                  "count": 1843
              },
              {
                  "day": "2024-01-18",
                  "count": 1856
              },
              {
                  "day": "2024-01-19",
                  "count": 1883
              },
              {
                  "day": "2024-01-20",
                  "count": 1883
              },
              {
                  "day": "2024-01-21",
                  "count": 1883
              },
              {
                  "day": "2024-01-22",
                  "count": 1883
              },
              {
                  "day": "2024-01-23",
                  "count": 1883
              },
              {
                  "day": "2024-01-24",
                  "count": 1881
              },
              {
                  "day": "2024-01-25",
                  "count": 1884
              },
              {
                  "day": "2024-01-26",
                  "count": 1899
              },
              {
                  "day": "2024-01-27",
                  "count": 1902
              },
              {
                  "day": "2024-01-28",
                  "count": 1896
              },
              {
                  "day": "2024-01-29",
                  "count": 1896
              },
              {
                  "day": "2024-01-30",
                  "count": 1896
              },
              {
                  "day": "2024-01-31",
                  "count": 1896
              },
              {
                  "day": "2024-02-01",
                  "count": 1899
              },
              {
                  "day": "2024-02-02",
                  "count": 1849
              },
              {
                  "day": "2024-02-03",
                  "count": 1825
              },
              {
                  "day": "2024-02-04",
                  "count": 1825
              },
              {
                  "day": "2024-02-05",
                  "count": 1825
              },
              {
                  "day": "2024-02-06",
                  "count": 1834
              },
              {
                  "day": "2024-02-07",
                  "count": 1844
              },
              {
                  "day": "2024-02-08",
                  "count": 1844
              },
              {
                  "day": "2024-02-09",
                  "count": 1844
              },
              {
                  "day": "2024-02-10",
                  "count": 1870
              },
              {
                  "day": "2024-02-11",
                  "count": 1889
              },
              {
                  "day": "2024-02-12",
                  "count": 1892
              },
              {
                  "day": "2024-02-13",
                  "count": 1892
              },
              {
                  "day": "2024-02-14",
                  "count": 1828
              },
              {
                  "day": "2024-02-15",
                  "count": 1744
              },
              {
                  "day": "2024-02-16",
                  "count": 1736
              },
              {
                  "day": "2024-02-17",
                  "count": 1716
              },
              {
                  "day": "2024-02-18",
                  "count": 1724
              },
              {
                  "day": "2024-02-19",
                  "count": 1697
              },
              {
                  "day": "2024-02-20",
                  "count": 1705
              },
              {
                  "day": "2024-02-21",
                  "count": 1709
              },
              {
                  "day": "2024-02-22",
                  "count": 1701
              },
              {
                  "day": "2024-02-23",
                  "count": 1687
              },
              {
                  "day": "2024-02-24",
                  "count": 1603
              },
              {
                  "day": "2024-02-25",
                  "count": 1603
              },
              {
                  "day": "2024-02-26",
                  "count": 1393
              },
              {
                  "day": "2024-02-27",
                  "count": 1340
              },
              {
                  "day": "2024-02-28",
                  "count": 1241
              },
              {
                  "day": "2024-02-29",
                  "count": 1228
              },
              {
                  "day": "2024-03-01",
                  "count": 1161
              },
              {
                  "day": "2024-03-02",
                  "count": 1162
              },
              {
                  "day": "2024-03-03",
                  "count": 1162
              },
              {
                  "day": "2024-03-04",
                  "count": 1162
              },
              {
                  "day": "2024-03-05",
                  "count": 1166
              },
              {
                  "day": "2024-03-06",
                  "count": 1168
              },
              {
                  "day": "2024-03-07",
                  "count": 1160
              },
              {
                  "day": "2024-03-08",
                  "count": 1164
              },
              {
                  "day": "2024-03-09",
                  "count": 1165
              },
              {
                  "day": "2024-03-10",
                  "count": 1166
              },
              {
                  "day": "2024-03-11",
                  "count": 1165
              },
              {
                  "day": "2024-03-12",
                  "count": 1165
              },
              {
                  "day": "2024-03-13",
                  "count": 1163
              },
              {
                  "day": "2024-03-14",
                  "count": 1172
              },
              {
                  "day": "2024-03-15",
                  "count": 1199
              },
              {
                  "day": "2024-03-16",
                  "count": 1209
              },
              {
                  "day": "2024-03-17",
                  "count": 1209
              },
              {
                  "day": "2024-03-18",
                  "count": 1209
              },
              {
                  "day": "2024-03-19",
                  "count": 1209
              },
              {
                  "day": "2024-03-20",
                  "count": 1209
              },
              {
                  "day": "2024-03-21",
                  "count": 1211
              },
              {
                  "day": "2024-03-22",
                  "count": 1170
              },
              {
                  "day": "2024-03-23",
                  "count": 1190
              },
              {
                  "day": "2024-03-24",
                  "count": 1190
              },
              {
                  "day": "2024-03-25",
                  "count": 1192
              },
              {
                  "day": "2024-03-26",
                  "count": 1213
              },
              {
                  "day": "2024-03-27",
                  "count": 1237
              },
              {
                  "day": "2024-03-28",
                  "count": 1252
              },
              {
                  "day": "2024-03-29",
                  "count": 1173
              },
              {
                  "day": "2024-03-30",
                  "count": 1173
              },
              {
                  "day": "2024-03-31",
                  "count": 1173
              },
              {
                  "day": "2024-04-01",
                  "count": 1164
              },
              {
                  "day": "2024-04-02",
                  "count": 1112
              },
              {
                  "day": "2024-04-03",
                  "count": 1112
              },
              {
                  "day": "2024-04-04",
                  "count": 1138
              },
              {
                  "day": "2024-04-05",
                  "count": 1127
              },
              {
                  "day": "2024-04-06",
                  "count": 1127
              },
              {
                  "day": "2024-04-07",
                  "count": 1127
              },
              {
                  "day": "2024-04-08",
                  "count": 1127
              },
              {
                  "day": "2024-04-09",
                  "count": 1127
              },
              {
                  "day": "2024-04-10",
                  "count": 1135
              },
              {
                  "day": "2024-04-11",
                  "count": 1130
              },
              {
                  "day": "2024-04-12",
                  "count": 1130
              },
              {
                  "day": "2024-04-13",
                  "count": 1130
              },
              {
                  "day": "2024-04-14",
                  "count": 1129
              },
              {
                  "day": "2024-04-15",
                  "count": 1130
              },
              {
                  "day": "2024-04-16",
                  "count": 1082
              },
              {
                  "day": "2024-04-17",
                  "count": 1082
              },
              {
                  "day": "2024-04-18",
                  "count": 1048
              },
              {
                  "day": "2024-04-19",
                  "count": 1058
              },
              {
                  "day": "2024-04-20",
                  "count": 1058
              },
              {
                  "day": "2024-04-21",
                  "count": 1058
              },
              {
                  "day": "2024-04-22",
                  "count": 1058
              },
              {
                  "day": "2024-04-23",
                  "count": 1058
              },
              {
                  "day": "2024-04-24",
                  "count": 1059
              },
              {
                  "day": "2024-04-25",
                  "count": 1048
              },
              {
                  "day": "2024-04-26",
                  "count": 1033
              },
              {
                  "day": "2024-04-27",
                  "count": 1033
              },
              {
                  "day": "2024-04-28",
                  "count": 1033
              },
              {
                  "day": "2024-04-29",
                  "count": 1034
              },
              {
                  "day": "2024-04-30",
                  "count": 1034
              },
              {
                  "day": "2024-05-01",
                  "count": 1034
              },
              {
                  "day": "2024-05-02",
                  "count": 1024
              },
              {
                  "day": "2024-05-03",
                  "count": 1013
              },
              {
                  "day": "2024-05-04",
                  "count": 1013
              },
              {
                  "day": "2024-05-05",
                  "count": 1013
              },
              {
                  "day": "2024-05-06",
                  "count": 1013
              },
              {
                  "day": "2024-05-07",
                  "count": 1013
              },
              {
                  "day": "2024-05-08",
                  "count": 1013
              },
              {
                  "day": "2024-05-09",
                  "count": 1014
              },
              {
                  "day": "2024-05-10",
                  "count": 1017
              },
              {
                  "day": "2024-05-11",
                  "count": 1017
              },
              {
                  "day": "2024-05-12",
                  "count": 1017
              },
              {
                  "day": "2024-05-13",
                  "count": 1056
              },
              {
                  "day": "2024-05-14",
                  "count": 1065
              },
              {
                  "day": "2024-05-15",
                  "count": 1042
              },
              {
                  "day": "2024-05-16",
                  "count": 1131
              },
              {
                  "day": "2024-05-17",
                  "count": 1151
              },
              {
                  "day": "2024-05-18",
                  "count": 1151
              },
              {
                  "day": "2024-05-19",
                  "count": 1184
              },
              {
                  "day": "2024-05-20",
                  "count": 1187
              },
              {
                  "day": "2024-05-21",
                  "count": 1276
              },
              {
                  "day": "2024-05-22",
                  "count": 1326
              },
              {
                  "day": "2024-05-23",
                  "count": 1229
              },
              {
                  "day": "2024-05-24",
                  "count": 1179
              },
              {
                  "day": "2024-05-25",
                  "count": 1141
              },
              {
                  "day": "2024-05-26",
                  "count": 1141
              },
              {
                  "day": "2024-05-27",
                  "count": 1141
              },
              {
                  "day": "2024-05-28",
                  "count": 1145
              },
              {
                  "day": "2024-05-29",
                  "count": 1148
              },
              {
                  "day": "2024-05-30",
                  "count": 1174
              },
              {
                  "day": "2024-05-31",
                  "count": 1180
              },
              {
                  "day": "2024-06-01",
                  "count": 1207
              }
          ]
      },
      {
          "team-name": "API Dev India",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Security",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "App Dev India",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Legacy API",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Labor Insight",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "India Applications",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Gazelle GCP",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "Ask Lightcast",
          "total": 11,
          "critical": 0,
          "high": 2,
          "medium": 9,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 5
              },
              {
                  "day": "2024-01-04",
                  "count": 5
              },
              {
                  "day": "2024-01-05",
                  "count": 5
              },
              {
                  "day": "2024-01-06",
                  "count": 5
              },
              {
                  "day": "2024-01-07",
                  "count": 5
              },
              {
                  "day": "2024-01-08",
                  "count": 5
              },
              {
                  "day": "2024-01-09",
                  "count": 5
              },
              {
                  "day": "2024-01-10",
                  "count": 5
              },
              {
                  "day": "2024-01-11",
                  "count": 5
              },
              {
                  "day": "2024-01-12",
                  "count": 5
              },
              {
                  "day": "2024-01-13",
                  "count": 5
              },
              {
                  "day": "2024-01-14",
                  "count": 5
              },
              {
                  "day": "2024-01-15",
                  "count": 5
              },
              {
                  "day": "2024-01-16",
                  "count": 5
              },
              {
                  "day": "2024-01-17",
                  "count": 5
              },
              {
                  "day": "2024-01-18",
                  "count": 5
              },
              {
                  "day": "2024-01-19",
                  "count": 5
              },
              {
                  "day": "2024-01-20",
                  "count": 5
              },
              {
                  "day": "2024-01-21",
                  "count": 5
              },
              {
                  "day": "2024-01-22",
                  "count": 5
              },
              {
                  "day": "2024-01-23",
                  "count": 5
              },
              {
                  "day": "2024-01-24",
                  "count": 5
              },
              {
                  "day": "2024-01-25",
                  "count": 5
              },
              {
                  "day": "2024-01-26",
                  "count": 5
              },
              {
                  "day": "2024-01-27",
                  "count": 5
              },
              {
                  "day": "2024-01-28",
                  "count": 5
              },
              {
                  "day": "2024-01-29",
                  "count": 5
              },
              {
                  "day": "2024-01-30",
                  "count": 5
              },
              {
                  "day": "2024-01-31",
                  "count": 5
              },
              {
                  "day": "2024-02-01",
                  "count": 5
              },
              {
                  "day": "2024-02-02",
                  "count": 5
              },
              {
                  "day": "2024-02-03",
                  "count": 5
              },
              {
                  "day": "2024-02-04",
                  "count": 5
              },
              {
                  "day": "2024-02-05",
                  "count": 5
              },
              {
                  "day": "2024-02-06",
                  "count": 5
              },
              {
                  "day": "2024-02-07",
                  "count": 5
              },
              {
                  "day": "2024-02-08",
                  "count": 5
              },
              {
                  "day": "2024-02-09",
                  "count": 5
              },
              {
                  "day": "2024-02-10",
                  "count": 5
              },
              {
                  "day": "2024-02-11",
                  "count": 5
              },
              {
                  "day": "2024-02-12",
                  "count": 5
              },
              {
                  "day": "2024-02-13",
                  "count": 5
              },
              {
                  "day": "2024-02-14",
                  "count": 5
              },
              {
                  "day": "2024-02-15",
                  "count": 5
              },
              {
                  "day": "2024-02-16",
                  "count": 5
              },
              {
                  "day": "2024-02-17",
                  "count": 5
              },
              {
                  "day": "2024-02-18",
                  "count": 5
              },
              {
                  "day": "2024-02-19",
                  "count": 5
              },
              {
                  "day": "2024-02-20",
                  "count": 5
              },
              {
                  "day": "2024-02-21",
                  "count": 5
              },
              {
                  "day": "2024-02-22",
                  "count": 5
              },
              {
                  "day": "2024-02-23",
                  "count": 5
              },
              {
                  "day": "2024-02-24",
                  "count": 5
              },
              {
                  "day": "2024-02-25",
                  "count": 5
              },
              {
                  "day": "2024-02-26",
                  "count": 5
              },
              {
                  "day": "2024-02-27",
                  "count": 5
              },
              {
                  "day": "2024-02-28",
                  "count": 5
              },
              {
                  "day": "2024-02-29",
                  "count": 5
              },
              {
                  "day": "2024-03-01",
                  "count": 5
              },
              {
                  "day": "2024-03-02",
                  "count": 5
              },
              {
                  "day": "2024-03-03",
                  "count": 5
              },
              {
                  "day": "2024-03-04",
                  "count": 5
              },
              {
                  "day": "2024-03-05",
                  "count": 5
              },
              {
                  "day": "2024-03-06",
                  "count": 5
              },
              {
                  "day": "2024-03-07",
                  "count": 5
              },
              {
                  "day": "2024-03-08",
                  "count": 5
              },
              {
                  "day": "2024-03-09",
                  "count": 5
              },
              {
                  "day": "2024-03-10",
                  "count": 5
              },
              {
                  "day": "2024-03-11",
                  "count": 5
              },
              {
                  "day": "2024-03-12",
                  "count": 5
              },
              {
                  "day": "2024-03-13",
                  "count": 5
              },
              {
                  "day": "2024-03-14",
                  "count": 5
              },
              {
                  "day": "2024-03-15",
                  "count": 5
              },
              {
                  "day": "2024-03-16",
                  "count": 5
              },
              {
                  "day": "2024-03-17",
                  "count": 5
              },
              {
                  "day": "2024-03-18",
                  "count": 5
              },
              {
                  "day": "2024-03-19",
                  "count": 5
              },
              {
                  "day": "2024-03-20",
                  "count": 5
              },
              {
                  "day": "2024-03-21",
                  "count": 5
              },
              {
                  "day": "2024-03-22",
                  "count": 5
              },
              {
                  "day": "2024-03-23",
                  "count": 5
              },
              {
                  "day": "2024-03-24",
                  "count": 5
              },
              {
                  "day": "2024-03-25",
                  "count": 5
              },
              {
                  "day": "2024-03-26",
                  "count": 5
              },
              {
                  "day": "2024-03-27",
                  "count": 5
              },
              {
                  "day": "2024-03-28",
                  "count": 5
              },
              {
                  "day": "2024-03-29",
                  "count": 5
              },
              {
                  "day": "2024-03-30",
                  "count": 5
              },
              {
                  "day": "2024-03-31",
                  "count": 5
              },
              {
                  "day": "2024-04-01",
                  "count": 5
              },
              {
                  "day": "2024-04-02",
                  "count": 5
              },
              {
                  "day": "2024-04-03",
                  "count": 5
              },
              {
                  "day": "2024-04-04",
                  "count": 5
              },
              {
                  "day": "2024-04-05",
                  "count": 5
              },
              {
                  "day": "2024-04-06",
                  "count": 5
              },
              {
                  "day": "2024-04-07",
                  "count": 5
              },
              {
                  "day": "2024-04-08",
                  "count": 5
              },
              {
                  "day": "2024-04-09",
                  "count": 5
              },
              {
                  "day": "2024-04-10",
                  "count": 5
              },
              {
                  "day": "2024-04-11",
                  "count": 5
              },
              {
                  "day": "2024-04-12",
                  "count": 5
              },
              {
                  "day": "2024-04-13",
                  "count": 5
              },
              {
                  "day": "2024-04-14",
                  "count": 5
              },
              {
                  "day": "2024-04-15",
                  "count": 5
              },
              {
                  "day": "2024-04-16",
                  "count": 5
              },
              {
                  "day": "2024-04-17",
                  "count": 5
              },
              {
                  "day": "2024-04-18",
                  "count": 5
              },
              {
                  "day": "2024-04-19",
                  "count": 5
              },
              {
                  "day": "2024-04-20",
                  "count": 5
              },
              {
                  "day": "2024-04-21",
                  "count": 5
              },
              {
                  "day": "2024-04-22",
                  "count": 5
              },
              {
                  "day": "2024-04-23",
                  "count": 5
              },
              {
                  "day": "2024-04-24",
                  "count": 9
              },
              {
                  "day": "2024-04-25",
                  "count": 9
              },
              {
                  "day": "2024-04-26",
                  "count": 9
              },
              {
                  "day": "2024-04-27",
                  "count": 9
              },
              {
                  "day": "2024-04-28",
                  "count": 9
              },
              {
                  "day": "2024-04-29",
                  "count": 9
              },
              {
                  "day": "2024-04-30",
                  "count": 9
              },
              {
                  "day": "2024-05-01",
                  "count": 9
              },
              {
                  "day": "2024-05-02",
                  "count": 9
              },
              {
                  "day": "2024-05-03",
                  "count": 9
              },
              {
                  "day": "2024-05-04",
                  "count": 9
              },
              {
                  "day": "2024-05-05",
                  "count": 9
              },
              {
                  "day": "2024-05-06",
                  "count": 9
              },
              {
                  "day": "2024-05-07",
                  "count": 9
              },
              {
                  "day": "2024-05-08",
                  "count": 9
              },
              {
                  "day": "2024-05-09",
                  "count": 9
              },
              {
                  "day": "2024-05-10",
                  "count": 9
              },
              {
                  "day": "2024-05-11",
                  "count": 10
              },
              {
                  "day": "2024-05-12",
                  "count": 10
              },
              {
                  "day": "2024-05-13",
                  "count": 10
              },
              {
                  "day": "2024-05-14",
                  "count": 12
              },
              {
                  "day": "2024-05-15",
                  "count": 12
              },
              {
                  "day": "2024-05-16",
                  "count": 12
              },
              {
                  "day": "2024-05-17",
                  "count": 12
              },
              {
                  "day": "2024-05-18",
                  "count": 12
              },
              {
                  "day": "2024-05-19",
                  "count": 12
              },
              {
                  "day": "2024-05-20",
                  "count": 13
              },
              {
                  "day": "2024-05-21",
                  "count": 17
              },
              {
                  "day": "2024-05-22",
                  "count": 17
              },
              {
                  "day": "2024-05-23",
                  "count": 11
              },
              {
                  "day": "2024-05-24",
                  "count": 11
              },
              {
                  "day": "2024-05-25",
                  "count": 11
              },
              {
                  "day": "2024-05-26",
                  "count": 11
              },
              {
                  "day": "2024-05-27",
                  "count": 11
              },
              {
                  "day": "2024-05-28",
                  "count": 11
              },
              {
                  "day": "2024-05-29",
                  "count": 11
              },
              {
                  "day": "2024-05-30",
                  "count": 11
              },
              {
                  "day": "2024-05-31",
                  "count": 11
              },
              {
                  "day": "2024-06-01",
                  "count": 11
              }
          ]
      },
      {
          "team-name": "Consulting Engineering",
          "total": 143,
          "critical": 1,
          "high": 41,
          "medium": 94,
          "low": 7,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 19
              },
              {
                  "day": "2024-01-02",
                  "count": 19
              },
              {
                  "day": "2024-01-03",
                  "count": 19
              },
              {
                  "day": "2024-01-04",
                  "count": 19
              },
              {
                  "day": "2024-01-05",
                  "count": 19
              },
              {
                  "day": "2024-01-06",
                  "count": 19
              },
              {
                  "day": "2024-01-07",
                  "count": 19
              },
              {
                  "day": "2024-01-08",
                  "count": 19
              },
              {
                  "day": "2024-01-09",
                  "count": 19
              },
              {
                  "day": "2024-01-10",
                  "count": 19
              },
              {
                  "day": "2024-01-11",
                  "count": 21
              },
              {
                  "day": "2024-01-12",
                  "count": 21
              },
              {
                  "day": "2024-01-13",
                  "count": 21
              },
              {
                  "day": "2024-01-14",
                  "count": 21
              },
              {
                  "day": "2024-01-15",
                  "count": 21
              },
              {
                  "day": "2024-01-16",
                  "count": 21
              },
              {
                  "day": "2024-01-17",
                  "count": 21
              },
              {
                  "day": "2024-01-18",
                  "count": 21
              },
              {
                  "day": "2024-01-19",
                  "count": 21
              },
              {
                  "day": "2024-01-20",
                  "count": 21
              },
              {
                  "day": "2024-01-21",
                  "count": 21
              },
              {
                  "day": "2024-01-22",
                  "count": 21
              },
              {
                  "day": "2024-01-23",
                  "count": 22
              },
              {
                  "day": "2024-01-24",
                  "count": 22
              },
              {
                  "day": "2024-01-25",
                  "count": 22
              },
              {
                  "day": "2024-01-26",
                  "count": 22
              },
              {
                  "day": "2024-01-27",
                  "count": 22
              },
              {
                  "day": "2024-01-28",
                  "count": 22
              },
              {
                  "day": "2024-01-29",
                  "count": 22
              },
              {
                  "day": "2024-01-30",
                  "count": 22
              },
              {
                  "day": "2024-01-31",
                  "count": 22
              },
              {
                  "day": "2024-02-01",
                  "count": 23
              },
              {
                  "day": "2024-02-02",
                  "count": 23
              },
              {
                  "day": "2024-02-03",
                  "count": 23
              },
              {
                  "day": "2024-02-04",
                  "count": 23
              },
              {
                  "day": "2024-02-05",
                  "count": 23
              },
              {
                  "day": "2024-02-06",
                  "count": 23
              },
              {
                  "day": "2024-02-07",
                  "count": 23
              },
              {
                  "day": "2024-02-08",
                  "count": 23
              },
              {
                  "day": "2024-02-09",
                  "count": 23
              },
              {
                  "day": "2024-02-10",
                  "count": 23
              },
              {
                  "day": "2024-02-11",
                  "count": 23
              },
              {
                  "day": "2024-02-12",
                  "count": 23
              },
              {
                  "day": "2024-02-13",
                  "count": 25
              },
              {
                  "day": "2024-02-14",
                  "count": 25
              },
              {
                  "day": "2024-02-15",
                  "count": 25
              },
              {
                  "day": "2024-02-16",
                  "count": 25
              },
              {
                  "day": "2024-02-17",
                  "count": 25
              },
              {
                  "day": "2024-02-18",
                  "count": 25
              },
              {
                  "day": "2024-02-19",
                  "count": 25
              },
              {
                  "day": "2024-02-20",
                  "count": 25
              },
              {
                  "day": "2024-02-21",
                  "count": 25
              },
              {
                  "day": "2024-02-22",
                  "count": 24
              },
              {
                  "day": "2024-02-23",
                  "count": 24
              },
              {
                  "day": "2024-02-24",
                  "count": 24
              },
              {
                  "day": "2024-02-25",
                  "count": 24
              },
              {
                  "day": "2024-02-26",
                  "count": 24
              },
              {
                  "day": "2024-02-27",
                  "count": 24
              },
              {
                  "day": "2024-02-28",
                  "count": 23
              },
              {
                  "day": "2024-02-29",
                  "count": 23
              },
              {
                  "day": "2024-03-01",
                  "count": 23
              },
              {
                  "day": "2024-03-02",
                  "count": 23
              },
              {
                  "day": "2024-03-03",
                  "count": 23
              },
              {
                  "day": "2024-03-04",
                  "count": 23
              },
              {
                  "day": "2024-03-05",
                  "count": 23
              },
              {
                  "day": "2024-03-06",
                  "count": 23
              },
              {
                  "day": "2024-03-07",
                  "count": 23
              },
              {
                  "day": "2024-03-08",
                  "count": 24
              },
              {
                  "day": "2024-03-09",
                  "count": 24
              },
              {
                  "day": "2024-03-10",
                  "count": 24
              },
              {
                  "day": "2024-03-11",
                  "count": 24
              },
              {
                  "day": "2024-03-12",
                  "count": 131
              },
              {
                  "day": "2024-03-13",
                  "count": 131
              },
              {
                  "day": "2024-03-14",
                  "count": 131
              },
              {
                  "day": "2024-03-15",
                  "count": 134
              },
              {
                  "day": "2024-03-16",
                  "count": 134
              },
              {
                  "day": "2024-03-17",
                  "count": 134
              },
              {
                  "day": "2024-03-18",
                  "count": 134
              },
              {
                  "day": "2024-03-19",
                  "count": 133
              },
              {
                  "day": "2024-03-20",
                  "count": 133
              },
              {
                  "day": "2024-03-21",
                  "count": 125
              },
              {
                  "day": "2024-03-22",
                  "count": 128
              },
              {
                  "day": "2024-03-23",
                  "count": 128
              },
              {
                  "day": "2024-03-24",
                  "count": 128
              },
              {
                  "day": "2024-03-25",
                  "count": 128
              },
              {
                  "day": "2024-03-26",
                  "count": 99
              },
              {
                  "day": "2024-03-27",
                  "count": 99
              },
              {
                  "day": "2024-03-28",
                  "count": 99
              },
              {
                  "day": "2024-03-29",
                  "count": 99
              },
              {
                  "day": "2024-03-30",
                  "count": 99
              },
              {
                  "day": "2024-03-31",
                  "count": 99
              },
              {
                  "day": "2024-04-01",
                  "count": 99
              },
              {
                  "day": "2024-04-02",
                  "count": 99
              },
              {
                  "day": "2024-04-03",
                  "count": 99
              },
              {
                  "day": "2024-04-04",
                  "count": 99
              },
              {
                  "day": "2024-04-05",
                  "count": 94
              },
              {
                  "day": "2024-04-06",
                  "count": 94
              },
              {
                  "day": "2024-04-07",
                  "count": 94
              },
              {
                  "day": "2024-04-08",
                  "count": 90
              },
              {
                  "day": "2024-04-09",
                  "count": 94
              },
              {
                  "day": "2024-04-10",
                  "count": 94
              },
              {
                  "day": "2024-04-11",
                  "count": 94
              },
              {
                  "day": "2024-04-12",
                  "count": 94
              },
              {
                  "day": "2024-04-13",
                  "count": 94
              },
              {
                  "day": "2024-04-14",
                  "count": 95
              },
              {
                  "day": "2024-04-15",
                  "count": 95
              },
              {
                  "day": "2024-04-16",
                  "count": 95
              },
              {
                  "day": "2024-04-17",
                  "count": 95
              },
              {
                  "day": "2024-04-18",
                  "count": 95
              },
              {
                  "day": "2024-04-19",
                  "count": 95
              },
              {
                  "day": "2024-04-20",
                  "count": 95
              },
              {
                  "day": "2024-04-21",
                  "count": 95
              },
              {
                  "day": "2024-04-22",
                  "count": 95
              },
              {
                  "day": "2024-04-23",
                  "count": 95
              },
              {
                  "day": "2024-04-24",
                  "count": 94
              },
              {
                  "day": "2024-04-25",
                  "count": 106
              },
              {
                  "day": "2024-04-26",
                  "count": 106
              },
              {
                  "day": "2024-04-27",
                  "count": 108
              },
              {
                  "day": "2024-04-28",
                  "count": 108
              },
              {
                  "day": "2024-04-29",
                  "count": 110
              },
              {
                  "day": "2024-04-30",
                  "count": 110
              },
              {
                  "day": "2024-05-01",
                  "count": 110
              },
              {
                  "day": "2024-05-02",
                  "count": 110
              },
              {
                  "day": "2024-05-03",
                  "count": 110
              },
              {
                  "day": "2024-05-04",
                  "count": 110
              },
              {
                  "day": "2024-05-05",
                  "count": 110
              },
              {
                  "day": "2024-05-06",
                  "count": 110
              },
              {
                  "day": "2024-05-07",
                  "count": 112
              },
              {
                  "day": "2024-05-08",
                  "count": 112
              },
              {
                  "day": "2024-05-09",
                  "count": 112
              },
              {
                  "day": "2024-05-10",
                  "count": 112
              },
              {
                  "day": "2024-05-11",
                  "count": 120
              },
              {
                  "day": "2024-05-12",
                  "count": 120
              },
              {
                  "day": "2024-05-13",
                  "count": 122
              },
              {
                  "day": "2024-05-14",
                  "count": 125
              },
              {
                  "day": "2024-05-15",
                  "count": 127
              },
              {
                  "day": "2024-05-16",
                  "count": 129
              },
              {
                  "day": "2024-05-17",
                  "count": 129
              },
              {
                  "day": "2024-05-18",
                  "count": 129
              },
              {
                  "day": "2024-05-19",
                  "count": 129
              },
              {
                  "day": "2024-05-20",
                  "count": 127
              },
              {
                  "day": "2024-05-21",
                  "count": 129
              },
              {
                  "day": "2024-05-22",
                  "count": 130
              },
              {
                  "day": "2024-05-23",
                  "count": 142
              },
              {
                  "day": "2024-05-24",
                  "count": 142
              },
              {
                  "day": "2024-05-25",
                  "count": 142
              },
              {
                  "day": "2024-05-26",
                  "count": 142
              },
              {
                  "day": "2024-05-27",
                  "count": 142
              },
              {
                  "day": "2024-05-28",
                  "count": 143
              },
              {
                  "day": "2024-05-29",
                  "count": 143
              },
              {
                  "day": "2024-05-30",
                  "count": 143
              },
              {
                  "day": "2024-05-31",
                  "count": 143
              },
              {
                  "day": "2024-06-01",
                  "count": 143
              }
          ]
      },
      {
          "team-name": "RAPTOR",
          "total": 3,
          "critical": 0,
          "high": 0,
          "medium": 2,
          "low": 1,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 3
              },
              {
                  "day": "2024-05-25",
                  "count": 3
              },
              {
                  "day": "2024-05-26",
                  "count": 3
              },
              {
                  "day": "2024-05-27",
                  "count": 3
              },
              {
                  "day": "2024-05-28",
                  "count": 3
              },
              {
                  "day": "2024-05-29",
                  "count": 3
              },
              {
                  "day": "2024-05-30",
                  "count": 3
              },
              {
                  "day": "2024-05-31",
                  "count": 3
              },
              {
                  "day": "2024-06-01",
                  "count": 3
              }
          ]
      },
      {
          "team-name": "SalesOps",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      },
      {
          "team-name": "SysAdmin",
          "total": 0,
          "critical": 0,
          "high": 0,
          "medium": 0,
          "low": 0,
          "issue_by_day": [
              {
                  "day": "2024-01-01",
                  "count": 0
              },
              {
                  "day": "2024-01-02",
                  "count": 0
              },
              {
                  "day": "2024-01-03",
                  "count": 0
              },
              {
                  "day": "2024-01-04",
                  "count": 0
              },
              {
                  "day": "2024-01-05",
                  "count": 0
              },
              {
                  "day": "2024-01-06",
                  "count": 0
              },
              {
                  "day": "2024-01-07",
                  "count": 0
              },
              {
                  "day": "2024-01-08",
                  "count": 0
              },
              {
                  "day": "2024-01-09",
                  "count": 0
              },
              {
                  "day": "2024-01-10",
                  "count": 0
              },
              {
                  "day": "2024-01-11",
                  "count": 0
              },
              {
                  "day": "2024-01-12",
                  "count": 0
              },
              {
                  "day": "2024-01-13",
                  "count": 0
              },
              {
                  "day": "2024-01-14",
                  "count": 0
              },
              {
                  "day": "2024-01-15",
                  "count": 0
              },
              {
                  "day": "2024-01-16",
                  "count": 0
              },
              {
                  "day": "2024-01-17",
                  "count": 0
              },
              {
                  "day": "2024-01-18",
                  "count": 0
              },
              {
                  "day": "2024-01-19",
                  "count": 0
              },
              {
                  "day": "2024-01-20",
                  "count": 0
              },
              {
                  "day": "2024-01-21",
                  "count": 0
              },
              {
                  "day": "2024-01-22",
                  "count": 0
              },
              {
                  "day": "2024-01-23",
                  "count": 0
              },
              {
                  "day": "2024-01-24",
                  "count": 0
              },
              {
                  "day": "2024-01-25",
                  "count": 0
              },
              {
                  "day": "2024-01-26",
                  "count": 0
              },
              {
                  "day": "2024-01-27",
                  "count": 0
              },
              {
                  "day": "2024-01-28",
                  "count": 0
              },
              {
                  "day": "2024-01-29",
                  "count": 0
              },
              {
                  "day": "2024-01-30",
                  "count": 0
              },
              {
                  "day": "2024-01-31",
                  "count": 0
              },
              {
                  "day": "2024-02-01",
                  "count": 0
              },
              {
                  "day": "2024-02-02",
                  "count": 0
              },
              {
                  "day": "2024-02-03",
                  "count": 0
              },
              {
                  "day": "2024-02-04",
                  "count": 0
              },
              {
                  "day": "2024-02-05",
                  "count": 0
              },
              {
                  "day": "2024-02-06",
                  "count": 0
              },
              {
                  "day": "2024-02-07",
                  "count": 0
              },
              {
                  "day": "2024-02-08",
                  "count": 0
              },
              {
                  "day": "2024-02-09",
                  "count": 0
              },
              {
                  "day": "2024-02-10",
                  "count": 0
              },
              {
                  "day": "2024-02-11",
                  "count": 0
              },
              {
                  "day": "2024-02-12",
                  "count": 0
              },
              {
                  "day": "2024-02-13",
                  "count": 0
              },
              {
                  "day": "2024-02-14",
                  "count": 0
              },
              {
                  "day": "2024-02-15",
                  "count": 0
              },
              {
                  "day": "2024-02-16",
                  "count": 0
              },
              {
                  "day": "2024-02-17",
                  "count": 0
              },
              {
                  "day": "2024-02-18",
                  "count": 0
              },
              {
                  "day": "2024-02-19",
                  "count": 0
              },
              {
                  "day": "2024-02-20",
                  "count": 0
              },
              {
                  "day": "2024-02-21",
                  "count": 0
              },
              {
                  "day": "2024-02-22",
                  "count": 0
              },
              {
                  "day": "2024-02-23",
                  "count": 0
              },
              {
                  "day": "2024-02-24",
                  "count": 0
              },
              {
                  "day": "2024-02-25",
                  "count": 0
              },
              {
                  "day": "2024-02-26",
                  "count": 0
              },
              {
                  "day": "2024-02-27",
                  "count": 0
              },
              {
                  "day": "2024-02-28",
                  "count": 0
              },
              {
                  "day": "2024-02-29",
                  "count": 0
              },
              {
                  "day": "2024-03-01",
                  "count": 0
              },
              {
                  "day": "2024-03-02",
                  "count": 0
              },
              {
                  "day": "2024-03-03",
                  "count": 0
              },
              {
                  "day": "2024-03-04",
                  "count": 0
              },
              {
                  "day": "2024-03-05",
                  "count": 0
              },
              {
                  "day": "2024-03-06",
                  "count": 0
              },
              {
                  "day": "2024-03-07",
                  "count": 0
              },
              {
                  "day": "2024-03-08",
                  "count": 0
              },
              {
                  "day": "2024-03-09",
                  "count": 0
              },
              {
                  "day": "2024-03-10",
                  "count": 0
              },
              {
                  "day": "2024-03-11",
                  "count": 0
              },
              {
                  "day": "2024-03-12",
                  "count": 0
              },
              {
                  "day": "2024-03-13",
                  "count": 0
              },
              {
                  "day": "2024-03-14",
                  "count": 0
              },
              {
                  "day": "2024-03-15",
                  "count": 0
              },
              {
                  "day": "2024-03-16",
                  "count": 0
              },
              {
                  "day": "2024-03-17",
                  "count": 0
              },
              {
                  "day": "2024-03-18",
                  "count": 0
              },
              {
                  "day": "2024-03-19",
                  "count": 0
              },
              {
                  "day": "2024-03-20",
                  "count": 0
              },
              {
                  "day": "2024-03-21",
                  "count": 0
              },
              {
                  "day": "2024-03-22",
                  "count": 0
              },
              {
                  "day": "2024-03-23",
                  "count": 0
              },
              {
                  "day": "2024-03-24",
                  "count": 0
              },
              {
                  "day": "2024-03-25",
                  "count": 0
              },
              {
                  "day": "2024-03-26",
                  "count": 0
              },
              {
                  "day": "2024-03-27",
                  "count": 0
              },
              {
                  "day": "2024-03-28",
                  "count": 0
              },
              {
                  "day": "2024-03-29",
                  "count": 0
              },
              {
                  "day": "2024-03-30",
                  "count": 0
              },
              {
                  "day": "2024-03-31",
                  "count": 0
              },
              {
                  "day": "2024-04-01",
                  "count": 0
              },
              {
                  "day": "2024-04-02",
                  "count": 0
              },
              {
                  "day": "2024-04-03",
                  "count": 0
              },
              {
                  "day": "2024-04-04",
                  "count": 0
              },
              {
                  "day": "2024-04-05",
                  "count": 0
              },
              {
                  "day": "2024-04-06",
                  "count": 0
              },
              {
                  "day": "2024-04-07",
                  "count": 0
              },
              {
                  "day": "2024-04-08",
                  "count": 0
              },
              {
                  "day": "2024-04-09",
                  "count": 0
              },
              {
                  "day": "2024-04-10",
                  "count": 0
              },
              {
                  "day": "2024-04-11",
                  "count": 0
              },
              {
                  "day": "2024-04-12",
                  "count": 0
              },
              {
                  "day": "2024-04-13",
                  "count": 0
              },
              {
                  "day": "2024-04-14",
                  "count": 0
              },
              {
                  "day": "2024-04-15",
                  "count": 0
              },
              {
                  "day": "2024-04-16",
                  "count": 0
              },
              {
                  "day": "2024-04-17",
                  "count": 0
              },
              {
                  "day": "2024-04-18",
                  "count": 0
              },
              {
                  "day": "2024-04-19",
                  "count": 0
              },
              {
                  "day": "2024-04-20",
                  "count": 0
              },
              {
                  "day": "2024-04-21",
                  "count": 0
              },
              {
                  "day": "2024-04-22",
                  "count": 0
              },
              {
                  "day": "2024-04-23",
                  "count": 0
              },
              {
                  "day": "2024-04-24",
                  "count": 0
              },
              {
                  "day": "2024-04-25",
                  "count": 0
              },
              {
                  "day": "2024-04-26",
                  "count": 0
              },
              {
                  "day": "2024-04-27",
                  "count": 0
              },
              {
                  "day": "2024-04-28",
                  "count": 0
              },
              {
                  "day": "2024-04-29",
                  "count": 0
              },
              {
                  "day": "2024-04-30",
                  "count": 0
              },
              {
                  "day": "2024-05-01",
                  "count": 0
              },
              {
                  "day": "2024-05-02",
                  "count": 0
              },
              {
                  "day": "2024-05-03",
                  "count": 0
              },
              {
                  "day": "2024-05-04",
                  "count": 0
              },
              {
                  "day": "2024-05-05",
                  "count": 0
              },
              {
                  "day": "2024-05-06",
                  "count": 0
              },
              {
                  "day": "2024-05-07",
                  "count": 0
              },
              {
                  "day": "2024-05-08",
                  "count": 0
              },
              {
                  "day": "2024-05-09",
                  "count": 0
              },
              {
                  "day": "2024-05-10",
                  "count": 0
              },
              {
                  "day": "2024-05-11",
                  "count": 0
              },
              {
                  "day": "2024-05-12",
                  "count": 0
              },
              {
                  "day": "2024-05-13",
                  "count": 0
              },
              {
                  "day": "2024-05-14",
                  "count": 0
              },
              {
                  "day": "2024-05-15",
                  "count": 0
              },
              {
                  "day": "2024-05-16",
                  "count": 0
              },
              {
                  "day": "2024-05-17",
                  "count": 0
              },
              {
                  "day": "2024-05-18",
                  "count": 0
              },
              {
                  "day": "2024-05-19",
                  "count": 0
              },
              {
                  "day": "2024-05-20",
                  "count": 0
              },
              {
                  "day": "2024-05-21",
                  "count": 0
              },
              {
                  "day": "2024-05-22",
                  "count": 0
              },
              {
                  "day": "2024-05-23",
                  "count": 0
              },
              {
                  "day": "2024-05-24",
                  "count": 0
              },
              {
                  "day": "2024-05-25",
                  "count": 0
              },
              {
                  "day": "2024-05-26",
                  "count": 0
              },
              {
                  "day": "2024-05-27",
                  "count": 0
              },
              {
                  "day": "2024-05-28",
                  "count": 0
              },
              {
                  "day": "2024-05-29",
                  "count": 0
              },
              {
                  "day": "2024-05-30",
                  "count": 0
              },
              {
                  "day": "2024-05-31",
                  "count": 0
              },
              {
                  "day": "2024-06-01",
                  "count": 0
              }
          ]
      }
  ]
}
import { json, type MetaFunction } from "@remix-run/node";
import "../../styles/ThemedBarChart.css";
import { Outlet, useLoaderData } from "@remix-run/react";
import jsonData from "~/data.json";
import TeamDropdown from "~/components/TeamDropdown";

export const meta: MetaFunction = () => {
  return [{ title: "Teams" }];
};

export const loader = async () => {
  return json(jsonData);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(`asdf 🧐   data:`, data);

  return (
    <div>
      <h1>Teams</h1>
      <nav>
        <TeamDropdown teams={data.teams} />
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return json(url);
};

export default function Page() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="">
      Company Page
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

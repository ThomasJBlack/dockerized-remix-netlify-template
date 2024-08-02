from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
import httpx
from pydantic import BaseModel
from cache import AsyncTTL


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust the origin as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_data():
    """
    Pull data for dashboard
    """

    data = await pull_data()

    return data

@AsyncTTL(time_to_live = 3600)
async def pull_data():
    """
    Pull data
    """
    
    headers = {
        "Authorization": f"token {SNYK_API_TOKEN}",
        "Content-Type": "application/json" 
    }

    response = httpx.get(f"{SNYK_API_URL}/orgs", headers = headers)
    if response.status_code != 200:
        raise HTTPException(status_code = response.status_code, detail = "Failed to fetch data from Snyk")
    
    final_data = {"teams": []}
    
    orgs = response.json()["orgs"]

    limits = httpx.Limits(max_connections=4)

    async with httpx.AsyncClient(headers = headers, timeout = 60, limits = limits) as client:
        requests = []
        for org in orgs:

            body = {
                "filters": {
                    "orgs": [org["id"]]
                }
            }
    
            params = {
                "from": "2024-01-01",
                "to": "2024-06-01",
                "groupBy": "severity"
            }

            requests.append(client.post("https://api.snyk.io/v1/reporting/counts/issues", json = body, params= params, headers=headers))

        responses = await asyncio.gather(*requests)

        for i, response in enumerate(responses):

            data = response.json()

            # critical = 0
            # high = 0
            # medium = 0
            # low = 0
            # total = 0
            # unique = 0
            # autofixable = 0
            # licenses = 0
            # introduced_by_month = {}
            # resolved_by_month = {}
            issues_by_day = []

            for results in data["results"]:
                issues_by_day.append({
                    "day": results["day"],
                    "count": results["count"]
                })

            critical = data["results"][-1]["severity"]["critical"]
            high = data["results"][-1]["severity"]["high"]
            medium = data["results"][-1]["severity"]["medium"]
            low = data["results"][-1]["severity"]["low"]
            total = data["results"][-1]["count"]

            final_data["teams"].append({
                "team-name": orgs[i]["name"],
                "total": total,
                "critical": critical,
                "high": high,
                "medium": medium,
                "low": low,
                # "unique": 0,
                # "autofixable": 0,
                # "license": 0,
                # "introduced_by_day": {},
                # "resolved_by_day": {}
                "issue_by_day": issues_by_day
            })
                















                # response = await client.get(f"https://api.snyk.io/rest/orgs/{org["id"]}/issues?version=2024-06-21&effective_severity_level={issue_type}&limit=100")

                # issues_count = len(response.json()["data"])
                # while issues_count > 0:
                #     if issue_type == "critical":
                #         critical += issues_count
                #     elif issue_type == "high":
                #         high += issues_count
                #     elif issue_type == "medium":
                #         medium += issues_count
                    
                #     next_request = response["links"]["next"]
                #     response = httpx.get(f"https://api.snyk.io{next_request}")

                # issues = response.json()["data"]




    # for org in orgs:
    #     org_id = org["id"]
    #     org_name = org["name"]
    #     org_issues_response = httpx.get(f"https://api.snyk.io/rest/orgs/{org_id}/issues?version=2024-06-21", headers=headers)
    #     if org_issues_response.status_code == 200:
    #         for issue in org_issues_response.json()["data"]:
    #             introduced_month = issue["attributes"]["created_at"][:7]
    #             if introduced_month in introduced_by_month:
    #                 introduced_by_month[introduced_month] += 1
    #             else:
    #                 introduced_by_month[introduced_month] = 1
                
    #             if "resolution" in issue["attributes"]:
    #                 resolved_month = issue["attributes"]["resolution"]["resolved_at"][:7]
    #                 if resolved_month in resolved_by_month:
    #                     resolved_by_month[resolved_month] += 1
    #                 else:
    #                     resolved_by_month[resolved_month] = 1
    #             else:
    #                 issue_id = issue["id"]
    #                 issue_response = requests.get(f"https://api.snyk.io/rest/orgs/{org_id}/issues/{issue_id}?version=2024-06-21", headers=headers)
    #                 issue_response_data = issue_response.json()["data"]
    #                 if "is_fixable_snyk" in issue_response_data["attributes"]["coordinates"][0]:
    #                     if issue_response_data["attributes"]["coordinates"][0]["is_fixable_snyk"]:
    #                         autofixable += 1

    #             unique += 1
                
    #             status = issue["attributes"]["effective_severity_level"]

    #             if status == "critical":
    #                 critical += 1
    #             elif status == "high":
    #                 high += 1
    #             elif status == "medium":
    #                 medium += 1
    #             elif status == "low":
    #                 low += 1
    #             elif status == "unique":
    #                 high += 1
                
    #             if issue["attributes"]["type"] == "license":
    #                 licenses += 1
        
    #     introduced_by_month_list = []
    #     sorted_dates = list(introduced_by_month.keys())
    #     sorted_dates.sort()
    #     for date in sorted_dates:
    #         introduced_by_month_list.append({
    #             date: introduced_by_month[date]
    #             })
        
    #     resolved_by_month_list = []
    #     sorted_dates = list(resolved_by_month.keys())
    #     sorted_dates.sort()
    #     for date in sorted_dates:
    #         resolved_by_month_list.append({
    #             date: resolved_by_month[date]
    #             })
        
    #     final_data["teams"].append({
    #         "team-name": org_name,
    #         "critical": critical,
    #         "high": high,
    #         "medium": medium,
    #         "low": low,
    #         "unique": unique,
    #         "autofixable": autofixable,
    #         "license": licenses,
    #         "introduced_by_month": introduced_by_month_list,
    #         "resolved_by_month": resolved_by_month_list
    #     })

    
    return final_data

# asyncio.run(pull_data())
# print()
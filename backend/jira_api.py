# This code sample uses the 'requests' library:
# http://docs.python-requests.org
import requests
from requests.auth import HTTPBasicAuth
import json

# GET ALL PROJECTS

# projectIdOrKey = 'SOLOG'
base_url = "https://conuhack-company-demo.atlassian.net/rest/api/3/"
get_all_versions_endpoint = "project/{projectIdOrKey}/version"
get_all_projects_endpoint = "project/search"
get_all_issue_count_endpoint = "version/{id}/unresolvedIssueCount"

auth = HTTPBasicAuth("nguyenquan233@gmail.com", "KTWvcaphbgLYuZJggrw0AA52")

headers = {
    "Accept": "application/json"
}


def get_all_issue_count(version_id='1000'):
    response = requests.request(
        "GET",
        (base_url + get_all_issue_count_endpoint).format(id=version_id),
        headers=headers,
        auth=auth
    )
    return response.json()


def get_all_versions(project_name="SOLOG"):
    response = requests.request(
        "GET",
        (base_url + get_all_versions_endpoint).format(projectIdOrKey=project_name),
        headers=headers,
        auth=auth
    )
    all_versions = [{
        "releaseDate": version["releaseDate"],
        # "overdue": version["overdue"],
        "name": version["name"],
        "description": version["description"],
        "id": version["id"],
    } for version in response.json()['values']]

    return [
        get_all_issue_count(v['id']) | v for v in all_versions
    ]


def get_all_projects():
    response = requests.request(
        "GET",
        base_url + get_all_projects_endpoint,
        headers=headers,
        auth=auth
    )
    # pprint(response)
    return [{
        "avatarUrls": project["avatarUrls"],
        "key": project["key"],
        "name": project["name"]
    } for project in response.json()['values']]


def pprint(response):
    print(json.dumps(json.loads(response.text),
          sort_keys=True, indent=4, separators=(",", ": ")))


def pprint_dict(dict):
    print(json.dumps(dict, sort_keys=True, indent=4, separators=(",", ": ")))


def get_all_milestones_per_project():
    all_projects = get_all_projects()
    all_versions = [{
        'milestones': get_all_versions(p['key']),
    } | p for p in all_projects
    ]
    pprint_dict(all_versions)
    return all_versions


if __name__ == '__main__':
    get_all_milestones_per_project()

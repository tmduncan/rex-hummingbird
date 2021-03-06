from apirc.discovery import build
from oauth2rc.service_account import ServiceAccountCredentials
from datetime import datetime, timedelta
import re
from rex_utils import RexDb, RexRedis

rc = RexRedis.get_conn()

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = 'n-day-score-worker-prod.json'
VIEW_ID = '96749630'

def initialize_analyticsreporting():
  credentials = ServiceAccountCredentials.from_json_keyfile_name(KEY_FILE_LOCATION, SCOPES)
  return build('analytics', 'v4', credentials=credentials)

def get_report(analytics, days):
  endDate = 'today'
  startDate = str(days)+"daysAgo"
  return analytics.reports().batchGet(body={ 'reportRequests': [{
    'viewId': VIEW_ID,
    'dateRanges': [{'startDate': startDate, 'endDate': endDate}],
    'metrics': [{'expression': 'ga:pageviews'}],
    'dimensions': [{'name': 'ga:pagepath'}]
    }]}).execute()

def print_and_store_response(response, days):
  for report in response.get('reports', []):
    columnHeader = report.get('columnHeader', {})
    dimensionHeaders = columnHeader.get('dimensions', [])
    metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])

    for row in report.get('data', {}).get('rows', []):  
      data = (row.get('dimensions', []), row.get('metrics', []))
#      (['www.rexchange.com/listing/425-owls-cove-ln/statistic'], [{'values': ['4']}])
      key = str(days)+"d-"+re.split('[\?\s]', metricHeaders[0]["name"]+"-"+dimensionHeaders[0]+"-"+data[0][0])[0]
      value = data[1][0]['values'][0]
      print("%s: %s" % (key, value))
      rc.set(key, value, 3600)

def main():
  days = range(0, 14)
  analytics = initialize_analyticsreporting()
  for d in days:
    response = get_report(analytics, d)
    print_and_store_response(response, d)

if __name__ == '__main__':
  main()

from datetime import date, timedelta
from rex_utils import RexDb, RexRedis

rc = RexRedis.get_conn()

def get_oh(listing_id, start, end):
    sql = 'SELECT visitors FROM open_house WHERE status = "COMPLETE" && scheduled_start_date > %s && scheduled_start_date < %s && listing_id = %s'
    rows = RexDb.select(sql, (start, end, listing_id))
    if not rows:
        return 0
    return rows[0][0]

def get_oh_nday(listing_id, days_ago):
    end = date.today()
    start = date.today()
    days_ago = timedelta(days=days_ago)
    start -= days_ago
    return get_oh(listing_id, start, end)

def get_sh(listing_id, start, end):
    sql = 'SELECT COUNT(1) FROM showing WHERE showing_date > %s && showing_date < %s && listing_id = %s'
    rows = RexDb.select(sql, (start, end, listing_id))
    if not rows:
        return 0
    return rows[0][0]

def get_sh_nday(listing_id, days_ago):
    end = date.today()
    days_ago = timedelta(days=days_ago)
    start = date.todau() - days_ago
    return get_sh(listing_id, start, end)

def get_nday_numer(listing_id, days_ago):
    return get_sh_nday(listing_id, days_ago) + get_oh_nday(listing_id, days_ago)

def get_nday_denom(listing_id, days_ago):
    return rc.get(str(days_ago) + "d-"+ "ga:pageviews-rex:listing_id-" + str(listing_id))

def get_nday_score(listing_id, days_ago):
    return get_nday_numer(listing_id, days_ago) / get_nday_denom(listing_id, days_ago)

def main():
    days_ago = timedelta(days=15)
    start date.today() - days_ago
    end = date.today()
    lid = 5
    print(get_oh(lid, str(start), str(end)))
    print(get_oh_nday(lid, 15))
    print('showings: {0}'.format(get_sh(lid, start, end)))
    print('nday numer (oh+sh) for {0} days: {1}'.format(days_ago.days, get_nday_numer(lid, days_ago.days)))
    print('nday score for {0} days: {1}'.format(days_ago.days, get_nday_score(lid, days_ago.days)))

if __name__ == '__main__':
    main()

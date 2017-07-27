import mysql.connector
import redis

class RexDb:
  conn = None

  @staticmethod
  def get_conn():
    if RexDb.conn is None or not RexDb.conn.is_connected():
      RexDb.conn = mysql.connector.connect(user='root', password='password', host='db', port=3306, database='rex_db')
    return RexDb.conn

  @staticmethod
  def select(statement, val_tuple):
    conn = RexDb.get_conn()
    cur = conn.cursor()
    cur.execute(statement, val_tuple)
    rows = cur.fetchall()
    conn.close()
    return rows

class RexRedis:
  conn = None

  @staticmethod
  def get_conn():
    if RexRedis.conn is None:
      RexRedis.conn = redis.StrictRedis(host='dc1-stage-redis.ybasnj.0001.usw1.cache.amazonaws.com', port=6379, db=0)
    return RexRedis.conn


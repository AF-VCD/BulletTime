import sys
import sqlite3
import csv

base = '/home/seeley/Documents/bullet-time/src/bullet_time/data'

conn = sqlite3.connect(base + '/acronyms.sqlite')
c = conn.cursor()

# Create table
c.execute('DROP TABLE IF EXISTS words')
c.execute('''
CREATE TABLE IF NOT EXISTS words
(word text PRIMARY KEY, pair_id integer);''')

SQL_INSERT = 'INSERT INTO words VALUES (?, ?)'

with open(base + '/ApprovedAcronyms.csv', 'r', newline='') as f:
    reader = csv.reader(f)
    for pair_id, pairing in enumerate(reader):
        for item in pairing:
            if item:
                try:
                    c.execute(SQL_INSERT, (item, pair_id))
                except Exception as e:
                    print(e)
                    print(pair_id)
                    print(item)
                    print(pairing)


conn.commit()
conn.close()
sys.exit()

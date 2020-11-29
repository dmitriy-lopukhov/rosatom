from flask_script import Manager
from s.app import app, db, issues_schema, issue_schema
from s.models import *
import datetime
import csv

app.config['DEBUG'] = True
manager = Manager(app)

def loadCsv(filename):
    file = open(filename, encoding="utf8")
    # skip_header = 1
    reader = csv.reader(file, delimiter=',', quotechar='\\')
    is_header = True
    names = []
    data = []
    for row in reader:
        if is_header:
            names = row
            is_header = False
        else:
            data.append(dict(zip(names, row)))
    return data


@manager.command
def create_tables():
    """Create relational database tables."""
    db.create_all()

@manager.command
def create_test_data():
    e_data = loadCsv("employees.csv")

    for r in e_data:
        #print( r["phone"])
        new_record = Employee(
            name = r["name"],
            lastname = r["lastname"],
            patronym = r["patronym"],
            position = r["position"],
            phone = r["phone"],
            orgunit = r["orgunit"],
            created = datetime.datetime.now()
        )
        db.session.add(new_record)

    db.session.commit()

    i_data = loadCsv("issues.csv")
    for r in i_data:
        new_record = Issue(
            caption = r['caption'],
            author = r['author'],
            executor = r['executor'],
            status = r['status'],
            prior = r['prior'],
            taskType = r['taskType'],
            description = r['description'],
            deadline = datetime.datetime.strptime(r['deadline'], '%Y-%m-%d %H:%M:%S') ,
            creationDate = datetime.datetime.strptime(r['creationDate'], '%Y-%m-%d %H:%M:%S'),
            updateDate = datetime.datetime.strptime( r['updateDate'], '%Y-%m-%d %H:%M:%S')
        )
        db.session.add(new_record)

    db.session.commit()


@manager.command
def create_all():
    create_tables()
    create_test_data()

if __name__ == '__main__':
    manager.run()

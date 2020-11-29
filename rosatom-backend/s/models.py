from .app import db, ma


class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(255))
    author = db.Column(db.Integer())
    executor = db.Column(db.Integer())
    status = db.Column(db.Integer())
    prior = db.Column(db.Integer())
    taskType = db.Column(db.Integer())
    description = db.Column(db.String(65535))
    deadline = db.Column(db.DateTime())
    creationDate = db.Column(db.DateTime())
    updateDate = db.Column(db.DateTime())

    def __repr__(self):
        return '<Issue %s>' % self.title


class IssueSchema(ma.Schema):
    class Meta:
        fields = ("id", "caption", "author", "executor", "status", "prior", "taskType", "description", "deadline", "creationDate", "updateDate")
        #dateformat = '%Y-%m-%dT%H:%M:%S'


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    patronym = db.Column(db.String(255))
    position = db.Column(db.String(255))
    created = db.Column(db.DateTime())
    phone    = db.Column(db.String(255))
    orgunit  = db.Column(db.String(255))

    def __repr__(self):
        return '<Employee %s %s %s>' % self.title, self.patronym, self.lastname


class EmployeeSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "lastname", "patronym", "position", "phone", "orgunit", "created")
        #dateformat = '%Y-%m-%dT%H:%M:%S'


#class
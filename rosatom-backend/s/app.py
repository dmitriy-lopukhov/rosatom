from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
import datetime
import dateutil.parser


def create_app():
    app = Flask(__name__)
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/rosatom'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    @app.route('/', methods=['GET'])
    def index():
        """
        example endpoint
        """
        return 'It works, somehow'

    return app

app = create_app()
api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

from .models import Issue,IssueSchema, Employee, EmployeeSchema

issue_schema = IssueSchema()
issues_schema = IssueSchema(many=True)
employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)


class IssueListResource(Resource):
    def get(self):
        issues = Issue.query.all()
        return issues_schema.dump(issues)

    def post(self):
        if 'updateDate' in request.json:
            updateDate = request.json['updateDate']
        else:
            updateDate = datetime.datetime.now().isoformat()

        n = Issue(
            caption = request.json['caption'],
            author = request.json['author'],
            executor = request.json['executor'],
            description = request.json['description'],
            deadline = dateutil.parser.parse(request.json['deadline']),
            creationDate =  dateutil.parser.parse(request.json['creationDate']),
            updateDate = dateutil.parser.parse(updateDate),
            status= request.json['status'],
            prior =  request.json['prior'],
            taskType =  request.json['taskType']

        )
        db.session.add(n)
        db.session.commit()
        return issue_schema.dump(n)


class IssueResource(Resource):
    def get(self, id):
        i = Issue.query.get_or_404(id)
        return issue_schema.dump(i)

    def patch(self, id):
        i = Issue.query.get_or_404(id)

        if 'caption' in request.json:
            i.caption = request.json['caption']
        if 'author' in request.json:
            i.author = request.json['author']
        if 'executor' in request.json:
            i.executor = request.json['executor']
        if 'description' in request.json:
            i.description = request.json['description']
        if 'deadline' in request.json:
            i.deadline = request.json['deadline']
        if 'creationDate' in request.json:
            i.creationDate = request.json['creationDate']
        if 'updateDate' in request.json:
            i.updateDate = request.json['updateDate']

        db.session.commit()
        return issue_schema.dump(i)

    """def delete(self, id):
        i = Issue.query.get_or_404(id)
        db.session.delete(i)
        db.session.commit()
        return '', 204"""

### Emploees

class EmployeeListResource(Resource):
    def get(self):
        em = Employee.query.all()
        return employees_schema.dump(em)

    def post(self):
        n = Employee(
            name = request.json['name'],
            lastname = request.json['lastname'],
            patronym = request.json['patronym'],
            position = request.json['position'],
            created = datetime.now(),
            #created = dateutil.parser.parse(request.json['created']),
            phone = request.json['phone'],
            orgunit = request.json['orgunit']
        )
        db.session.add(n)
        db.session.commit()
        return employee_schema.dump(n)


class EmployeeResource(Resource):
    def get(self, id):
        e = Employee.query.get_or_404(id)
        #e = Employee.query.get(id)
        return employee_schema.dump(e)

    def patch(self, id):
        e = Employee.query.get_or_404(id)
        if 'name' in request.json:
            e.name = request.json['name']
        if 'lastname' in request.json:
            e.name = request.json['lastname']
        if 'patronym' in request.json:
            e.name = request.json['patronym']
        if 'position' in request.json:
            e.name = request.json['position']
        #if 'created' in request.json:
        #    e.name = dateutil.parser.parse(request.json['created'])
        if 'phone' in request.json:
            e.name = request.json['phone']
        if 'orgunit' in request.json:
            e.name = request.json['orgunit']

        db.session.commit()
        return employee_schema.dump(e)

    """def delete(self, id):
        e = Issue.query.get_or_404(id)
        db.session.delete(e)
        db.session.commit()
        return '', 204"""

api.add_resource(IssueListResource, '/issue')
api.add_resource(IssueResource, '/issue/<int:id>')
api.add_resource(EmployeeListResource, '/employee')
api.add_resource(EmployeeResource, '/employee/<int:id>')
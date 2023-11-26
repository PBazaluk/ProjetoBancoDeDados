import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$lookup': {
      'from': 'student', 
      'localField': 'dept_name', 
      'foreignField': 'dept_name', 
      'as': 'student'
    }
  }, {
    '$lookup': {
      'from': 'instructor', 
      'localField': 'dept_name', 
      'foreignField': 'dept_name', 
      'as': 'instructor'
    }
  }, {
    '$unwind': {
      'path': '$instructor', 
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$group': {
      '_id': '$dept_name', 
      'building': {
        '$first': '$building'
      }, 
      'student': {
        '$first': '$student'
      }, 
      'budget': {
        '$first': '$budget'
      }, 
      'Media': {
        '$avg': {
          '$toInt': '$instructor.salary'
        }
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'Departamento': '$_id', 
      'Total_de_Alunos': {
        '$size': '$student'
      }, 
      'Orçamento': '$budget', 
      'Média_Salário': '$Media'
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('Projeto2').collection('department');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$lookup': {
      'from': 'advisor', 
      'localField': 'id', 
      'foreignField': 's_id', 
      'as': 'advisor'
    }
  }, {
    '$lookup': {
      'from': 'instructor', 
      'localField': 'advisor.i_id', 
      'foreignField': 'id', 
      'as': 'instructor'
    }
  }, {
    '$lookup': {
      'from': 'teaches', 
      'localField': 'instructor.id', 
      'foreignField': 'id', 
      'as': 'teaches'
    }
  }, {
    '$lookup': {
      'from': 'takes', 
      'localField': 'id', 
      'foreignField': 'id', 
      'as': 'takes'
    }
  }, {
    '$match': {
      '$expr': {
        '$eq': [
          '$teaches.course_id', '$takes.course_id'
        ]
      }
    }
  }, {
    '$unwind': {
      'path': '$advisor', 
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$lookup': {
      'from': 'course', 
      'localField': 'takes.course_id', 
      'foreignField': 'course_id', 
      'as': 'course'
    }
  }, {
    '$project': {
      '_id': 0, 
      'name': 1, 
      'instructor_name': '$instructor.name', 
      'course_name': '$course.title'
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('Projeto2').collection('student');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
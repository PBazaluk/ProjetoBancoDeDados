
import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$lookup': {
      'from': 'teaches', 
      'localField': 'course_id', 
      'foreignField': 'course_id', 
      'as': 'result'
    }
  }, {
    '$lookup': {
      'from': 'instructor', 
      'localField': 'result.id', 
      'foreignField': 'id', 
      'as': 'result2'
    }
  }, {
    '$project': {
      '_id': 0, 
      'building': 1, 
      'room_no': 1, 
      'result2.name': 1
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('Projeto2').collection('section');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
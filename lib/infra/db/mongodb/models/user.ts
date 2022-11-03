import { Document, ObjectId, WithId } from 'mongodb';

export default interface Game extends WithId<Document> {
  username: string;
  emailAddress: string;
  salt: string;
  hash: string;
  id?: ObjectId;
}

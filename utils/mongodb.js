import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;


    return {
        client: cachedClient,
        db: cachedDb,
    };
}


export const createDefaultCollection = async(db, identifier) => {
    try {
    await db.createCollection(identifier, {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['username'],
                additionalProperties: false,
                properties: {
                    _id: {},
                    username: {
                        bsonType: 'string',
                        description: "'username' is required and is a string."
                    },
                    email_address: {
                        bsonType: "string",
                        description: "'email address' is required and is a string."
                    },
                    github_id: {
                        bsonType: "string",
                        description: "'github id' is optional but, if used, must be a string."
                    },
                    hash: {
                        bsonType: "string",
                        description: "'hash' is optional but, if used, must be a string."
                    },
                    salt: {
                        bsonType: "string",
                        description: "'salt' is optional but, if used, must be a string."
                    },
                    created_at: {
                        bsonType: "date",
                        description: "'created at' is optional but, if used, must be a date."
                    },
                }
            }
        }
    });
    } catch (err) {
        throw new Error(err);
    }
}
export class MongoConfig {
  static MONGODB_URI: string =
    process.env.MONGODB_URI ||
    'mongodb+srv://guibushido:JcxmtE6MXMP9WtP@cluster0.m2gcd.mongodb.net/gameAdvice?authSource=admin&replicaSet=atlas-ebfznn-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

  static MONGODB_TEST_URI = 'mongodb://localhost:27017/';
}

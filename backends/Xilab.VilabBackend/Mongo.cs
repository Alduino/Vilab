using MongoDB.Driver;

namespace Xilab.VilabBackend
{
    public interface IDatabaseService
    {
        MongoClient Client { get; }
        IMongoDatabase Database { get; }
    }
    
    public class MongoDatabaseService : IDatabaseService
    {
        public MongoClient Client { get; }
        public IMongoDatabase Database { get; }

        public MongoDatabaseService(MongoClient client, IMongoDatabase database)
        {
            Client = client;
            Database = database;
        }
        
        public MongoDatabaseService(IMongoDatabase database) : this(new MongoClient(), database) {}
        
        public MongoDatabaseService(MongoClient client) : this(client, client.GetDatabase("Vilab")) {}

        public MongoDatabaseService() : this(new MongoClient()) {}
    }
}
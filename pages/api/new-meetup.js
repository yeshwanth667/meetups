import { MongoClient } from "mongodb";

async function handler(req,res){
    if(req.method==='POST'){
        const data=req.body;

       const client=await MongoClient.connect('mongodb+srv://yeshwanthkrishna42:BNcpiFyq2rAWHNvT@cluster0.ie2raex.mongodb.net/meetups?retryWrites=true&w=majority')

       const db=client.db();

       const meetupsCollection=db.collection('meetups');

       const result=await meetupsCollection.insertOne(data)

       client.close();

       res.status(201).json({message:'Inserted into DB successfully'})

    }
}

export default handler;
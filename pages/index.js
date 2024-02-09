import MeetupList from "@/components/meetups/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";


export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name='description' content="List of React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://yeshwanthkrishna42:BNcpiFyq2rAWHNvT@cluster0.ie2raex.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups=await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup)=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString()
      }))
    },
    revalidate: 10, //For updating the UI whenever the Requests are Coming
  };
}

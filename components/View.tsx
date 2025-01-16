import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write";

const View = async ({ id }: { id: string }) => {
  const totalViews = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  await writeClient
    .patch(id) // Specify the document ID
    .inc({ views: 1 }) // Increment the `views` field by 1
    .commit();

  const updatedViews = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{updatedViews?.views} views</span>
      </p>
    </div>
  );
};

export default View;

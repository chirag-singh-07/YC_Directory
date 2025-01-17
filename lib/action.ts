"use server";

import { auth } from "@/auth";
import { parseServerActionForm } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionForm({ error: "Not signed in", status: "ERROR" });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key != "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        current: slug,
        _type: slug,
      },
      views: 0,
      author: {
        _ref: session?.id,
        _type: "reference",
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });

    return parseServerActionForm({
      ...result,
      status: "SUCCESS",
      error: "",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionForm({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

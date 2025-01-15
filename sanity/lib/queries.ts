import { defineQuery } from "next-sanity";
export const STARTUPS_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
        _id,
        title,
        slug,
        author->{
             name,
             _id,
             image,
             bio
        },
        views,
        description,
        category,
        image,
        _createdAt    
    }
`);

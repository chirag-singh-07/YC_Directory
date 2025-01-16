import { defineQuery } from "next-sanity";
export const STARTUPS_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search )] | order(_createdAt desc) {
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

export const STARTUPS_BY_ID_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
        _id,
        title,
        slug,
        _createdAt,
        author->{
        _id, name, username, image, bio
        },
        views,
        description,
        category,
        image,
        pitch,
    }
`);

export const STARTUPS_VIEWS_QUERY =
  defineQuery(`*[_type == 'startup' && _id == $id][0]{
        _id,views
    }`);

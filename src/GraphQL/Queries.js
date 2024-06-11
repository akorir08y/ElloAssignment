import {gql} from "@apollo/client";


// GraphQL Query Statement
export const GET_BOOKS = gql`
    query books {
      books {
        author
        coverPhotoURL
        readingLevel
        title
      }
    } 
`;
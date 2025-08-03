import axios from "axios";

const API_BASE_URL = "https://openlibrary.org";

// Search for books
export const searchBooks = async (query, options = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json`, {
      params: {
        q: query,
        ...options,
      },
    });
    return response.data.docs || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Search for authors
export const searchAuthors = async (query, options = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/authors.json`, {
      params: { q: query, ...options },
    });
    return response.data.docs || [];
  } catch (error) {
    console.error("Error searching authors:", error);
    throw error;
  }
};

// Fetch a book by its ID
export const fetchBookById = async (workId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/works/${workId}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

// Fetch author data by key
export const getAuthorByKey = async (authorKey) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/authors/${authorKey}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching author data:", error);
    throw error;
  }
};

// Fetch books by subject
export const fetchSubject = async (subject, options = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects/${subject}.json`, {
      params: {
        details: options.details ? true : undefined,
        ebooks: options.ebooks ? true : undefined,
        published_in: options.published_in,
        limit: options.limit,
        offset: options.offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subject data:", error);
    throw error;
  }
};

// Get book cover image URL
export const getBookCoverUrl = (coverId, size = "M") => {
  if (!coverId) return "/placeholder.svg?height=300&width=200";
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// Format Open Library book object
export const formatOpenLibraryBook = (book) => {
  return {
    id: book.key?.replace("/works/", "") || book.cover_edition_key || Math.random().toString(),
    volumeInfo: {
      title: book.title || "Unknown Title",
      authors: book.author_name || ["Unknown Author"],
      imageLinks: {
        thumbnail: book.cover_i ? getBookCoverUrl(book.cover_i, "M") : "/placeholder.svg?height=300&width=200",
      },
      publishedDate: book.first_publish_year?.toString() || "Unknown",
      categories: book.subject?.slice(0, 3) || [],
      description: book.subtitle || "No description available.",
      averageRating: book.ratings_average || 0,
      ratingsCount: book.ratings_count || 0,
      pageCount: book.number_of_pages_median || "Unknown",
      publisher: book.publisher?.[0] || "Unknown Publisher",
      isbn: book.isbn?.[0] || "",
      language: book.language?.[0] || "en",
    },
  };
};



// import axios from 'axios'

// const API_BASE_URL = "https://openlibrary.org";

// export const searchBooks = async (query,options = {}) => {
//     try {
       
//         const response = await axios.get(`${API_BASE_URL}/search.json`,{
//             params: {
//                 q: query,
//                 ...options  //for extra parameters
//             },
//         });
//         return response.data.docs || [];
//     } catch (error) {
//         console.error("Error fetching books:", error);
//         throw error;
//     }
// }

// export const searchAuthors = async (query, options = {}) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/search/authors.json`, {
//         params: { q: query, ...options },
//       });
  
//       return response.data.docs || [];
//     } catch (error) {
//       console.error("Error searching authors:", error);
//       throw error;
//     }
// };
  
  
// export const fetchBookById = async (workId) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/works/${workId}.json`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching book by ID:", error);
//       throw error;
//     }
//   };

// export const getAuthorByKey = async (authorKey) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/authors/${authorKey}.json`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching author data:", error);
//       throw error;
//     }
//   };
  
// export const fetchSubject = async (subject, options = {}) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/subjects/${subject}.json`, {
//         params: {
//           details: options.details ? true : undefined,
//           ebooks: options.ebooks ? true : undefined,
//           published_in: options.published_in,
//           limit: options.limit,
//           offset: options.offset,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching subject data:", error);
//       throw error;
//     }
// };
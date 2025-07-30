import axios from 'axios'

const API_BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query,options = {}) => {
    try {
       
        const response = await axios.get(`${API_BASE_URL}/search.json`,{
            params: {
                q: query,
                ...options  //for extra parameters
            },
        });
        return response.data.docs || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}

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
  
  
export const fetchBookById = async (workId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/works/${workId}.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      throw error;
    }
  };

export const getAuthorByKey = async (authorKey) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/${authorKey}.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching author data:", error);
      throw error;
    }
  };
  
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
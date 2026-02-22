// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// export const getTeacherSummary = (search = "", page = 1) =>
//   API.get(`summary/?search=${search}&page=${page}`);

// export const getWeeklyTrends = () => API.get("weekly-trends/");

// export const getTeacherDetail = (teacherId) => API.get(`teacher/${teacherId}/`);


import axios from 'axios';

// Update this if your backend runs on a different port
const API_URL = 'http://localhost:8000/api'; 

// 1. Fetches the main table data with all filters
export const getTeacherSummary = (searchTerm, page, grade, subject, timeRange) => {
    return axios.get(`${API_URL}/summary/`, {
        params: {
            search: searchTerm,
            page: page,
            grade: grade,
            subject: subject,
            timeRange: timeRange
        }
    });
};

// 2. Fetches the chart data with all filters
export const getWeeklyTrends = (grade, subject, timeRange) => {
    return axios.get(`${API_URL}/weekly-trends/`, {
        params: {
            grade: grade,
            subject: subject,
            timeRange: timeRange
        }
    });
};

// 3. Fetches the specific data for the "View" modal
export const getTeacherDetail = (teacherId) => {
    return axios.get(`${API_URL}/teacher/${teacherId}/`);
};
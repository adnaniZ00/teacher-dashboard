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
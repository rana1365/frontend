export const apiUrl = 'http://127.0.0.1:8000/api'


export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'))
    return data.token;
}

export const userToken = () => {
    const data = localStorage.getItem('userInfo');
    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        return parsed?.token || null;
    } catch (error) {
        console.error("Error parsing userInfo:", error);
        return null;
    }
};

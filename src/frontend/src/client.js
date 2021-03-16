import fetch from 'unfetch';

/* The Request will be proxy threw the Request and allowing the Frontend Origin to communicate with the Backend Origin */
/* Property in the package.json: "proxy": "http://localhost:8080" */
export const getAllStudents = () => fetch("api/v1/students").then(checkStatus);

export const addNewStudent = (student) => fetch("api/v1/students", {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(student)
});

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    /* Converting non-2XX HTTP Response into Error */
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

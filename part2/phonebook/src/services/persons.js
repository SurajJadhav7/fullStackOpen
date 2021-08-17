import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const promise = axios.get(baseUrl);
    return promise.then(response => response.data);
};

const addNew = person => {
    const promise = axios.post(baseUrl, person);
    return promise.then(response => response.data);
}

const deletePerson = id => {
    const promise = axios.delete(`${baseUrl}/${id}`);
    return promise.then(response => response.data);
};

const personsService={ getAll, addNew, deletePerson };
export default personsService;
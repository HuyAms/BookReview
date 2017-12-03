"user strict"

const endPointUrl = "http://localhost:8080/BookReview/";
const token = localStorage.getItem('token');
const headers = new Headers({'authorization':token});

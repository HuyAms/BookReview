"user strict";

const endPointUrl = "http://10.114.34.135:8080/BookReview/";
const token = localStorage.getItem('token');
const headers = new Headers({'authorization':token});

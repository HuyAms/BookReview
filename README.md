# BOOK HOUSE 
*a project by THM team*

**1. Purpose:** This project is to create a small social network where people can post reviews on different book articles. Users can also choose their favorite books and put comments on the review from other users.

**2. Team member:** Tuan Le, Minh Tran & Huy Dinh Trinh

**3. Work division:**

    Minh Tran: UI/UX
      - Mockup
      - User experience
      - HTML
      - CSS
      
    Tuan Le: Frontend developer
      - HTML
      - CSS (mainly responsive)
      - Javascript
      
    Huy Trinh: Backend developer
      - Server: REST Api with JavaEE
      - Database: MariaDB

**4. User groups:**

**User can**
- Read and write reviews about a book
- Vote for other reviews and comment their own thought on other reivews
- Find which book they want to read easily by finding books according to their favourite category 
- Get latest books news

**Author can**
- Promote their own books

**Book sellers can**
- Find and sell HOT books

# FUNCTIONALITY

**1. Login page:**
- User can **sign up** or **login** (check for existing username) with password (will be **hashed**)
- Give user a **token** to keep track of login state and grant permisson
- **Auto redirect** to main page if user has already logged in

**2. Main page:**
- Start with **newsfeed** to see news related to books (newsfeed are now only controlled by the server)
- **Browse** books that have been posted by using category filter
- **Posting** requires from the user: Book info, picture of the book, user's review on the book and category the book belongs to.
- **Uploaded images** will be added timestamps in the name to avoid duplicate names.
- **Full post** (by clicking on the book's cover) shows the uploaded picture of the book, book's info, the user's review and other users' comments in the comment section
- Users can **like** (once per post) and **comment** on the posts
- Each post (book) has tracks on the number of likes, views and comments
- Books with the highest views, likes and comments will be displayed in the **spotlight** section
- **Auto redirect** to login page when the user signs out.
 
### Example codes
- Backend (REST api):
```java
@GET
    @Path("mostComment")
    @Produces({MediaType.APPLICATION_JSON})
    public Response findMostComment(@HeaderParam("authorization") String token) {
       
        Long userId = TokenUtil.decodeToken(token);
        if (userId != null) {
            Query query = em.createQuery("select p FROM Post p order by size(p.commentCollection) DESC" );
            System.out.println(query.getResultList());
            List<Post> post = (List<Post>)query.getResultList();
            Post mostRatePost = post.get(0);
            return Response.ok(mostRatePost).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(ErrorUtil.unAuthorized("Invalid token"))
                    .build();
        }
    }
```

- Frontend (get most commented book):
```javascript
const getMostCommentBook = () => {
  const url = endPointUrl + `webresources/posts/mostComment`;
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(json).then((data) => {
    if (data.hasOwnProperty('error')) {
      alert(data.error);
    } else {
      const id = data.postid;
      const author = data.bookAuthor;
      const title = data.bookTitle;
      const imgUrl = data.path;
      const review = data.review;
      const view = data.view;
 
      //show book reivew
      document.querySelector('#mostCommentCover').innerHTML = `<img src="${imgUrl}" alt="${title}">`;
      document.querySelector('#mostCommentTitle').innerHTML = `${title} <br /><span>by ${author}</span>`;
      document.querySelector('#mostCommentReview').innerHTML = review;
  }).catch((error) => {
    console.log('error: ' + error);
  });
}
```

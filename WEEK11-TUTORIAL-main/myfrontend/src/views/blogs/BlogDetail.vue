<template>
  <div class="container is-widescreen" >
    <section class="hero">
      <div class="hero-body">
        <p class="title">{{blogs.title}}</p>
      </div>
    </section>
    <section class="section" id="app" v-for="blog in blogs" :key="blog.id">
      <div class="content">
        <div class="card has-background-light">
          <% for (let img of images) { %>
          <div class="card-image pt-5">
            <div class="columns">
              <div class="column">
                <figure class="image">
                  <img
                    src="<%= img.file_path ? img.file_path: 'https://bulma.io/images/placeholders/480x480.png'%>"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
            </div>
          </div>
          <% } %>
          <div class="card-content">
            <div class="content"><%= blog.content %></div>
            <div class="container">
              <p class="subtitle">Comments</p>
              <% for (comment of comments) { %>
              <div class="box">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img
                        src="<%= comment.file_path ? comment.file_path:'https://bulma.io/images/placeholders/128x128.png'%>"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content">
                      <p><%= comment.comment %></p>
                      <p class="is-size-7"><%= comment.comment_date %></p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <a class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
              <% } %>
              <form
                method="POST"
                action="<%= `/${blog.id}/comments/` %>"
                enctype="multipart/form-data"
              >
                <div class="field">
                  <label class="label">Add Comment</label>
                  <div class="control">
                    <textarea
                      class="textarea"
                      name="comment"
                      placeholder="Add Comment Here"
                    ></textarea>
                  </div>
                </div>
                <!-- up file img-->
                <input name="myImage" type="file" />
                <input class="button is-primary" type="submit" value="Submit" />
              </form>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" href="/">To Home Page</a>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>
<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">My Stories</p>
      </div>
    </section>
    <section class="section" id="app">
      <div class="content">
        <form method="GET" action="/">
          <div class="columns">
            <div class="column is-4 is-offset-2">
              <input class="input" type="text" name="search" placeholder="ค้นชื่อบทความ" value="">
            </div>
            <div class="column is-2">
              <input class="button" type="submit" value="Search">
            </div>
            <div class="column is-2">
              <router-link to="/blog/create">
                <input class="button" type="button" value="Create New Blog">
              </router-link>
            </div>
          </div>
        </form>

      </div>
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="blog in blogs" :key="blog.id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img :src="blog.file_path ? `http://localhost:3000/${blog.file_path}` : 'https://bulma.io/images/placeholders/640x360.png'"
                    alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ blog.title }} </div>
                <div class="content">
                  <span v-if="blog.content.length > 200">
                    {{ blog.content.substring(0, 197) + "..." }}
                  </span>
                  <span v-else>
                    {{ blog.content }}
                  </span>
                </div>
              </div>
              <footer class="card-footer">
                <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="card-footer-item"> Read more...
                </router-link>
                <!-- <router-link :to="`/blog/${blog.id}`" class="card-footer-item"> Read more...
                </router-link> -->
                <a class="card-footer-item" @click="likeBlog2(blog)" >
                  <span class="icon-text">
                    <span>{{ blog.like }}</span>
                    <span class="icon">
                      <i class="far fa-heart"></i>
                    </span>
                    <span>Like</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blogs: null,
      search: this.$route.query.search,
    }
  },
  created() {
    axios.get("http://localhost:3000/", { params: { search: this.search } })
      .then((response) => {
        this.blogs = response.data.blogs;
        // console.log(this.blogs)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // likeBlog(blog) {
    //   axios.post(`http://localhost:3000/blogs/addlike/${blog.id}`)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    async likeBlog2(blog) {
      try {
        const response = await axios.post(`http://localhost:3000/blogs/addlike/${blog.id}`);
        console.log(response.data.blogs);
        this.blogs = response.data.blogs



      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
</style>

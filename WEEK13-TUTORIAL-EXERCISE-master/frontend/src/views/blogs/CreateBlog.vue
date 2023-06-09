<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Create new Blog</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Title</label>
        <div class="control">
          <input v-model="$v.titleBlog.$model" :class="{'is-danger': $v.titleBlog.$error}" class="input" type="text" placeholder="Text input" />
        </div>
        <template v-if="$v.titleBlog.$error">
          <p class="help is-danger" v-if="!$v.titleBlog.required">This field is required</p>
          <p class="help is-danger" v-if="!$v.titleBlog.alpha">must be letters only</p>
          <p class="help is-danger" v-if="!$v.titleBlog.minLength">must be at least 10 letters</p>
          <p class="help is-danger" v-if="!$v.titleBlog.maxLength">must not more than 25 letters</p>
      </template>
      </div>

      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea v-model="$v.content.$model" :class="{'is-danger': $v.content.$error}" class="input" placeholder="Textarea"></textarea>
        </div>
        <template v-if="$v.content.$error">
          <p class="help is-danger" v-if="!$v.content.required">This field is required</p>
          <p class="help is-danger" v-if="!$v.content.minLength">must be at least 50 letters</p>
        </template>
      </div>
      
      <div class="field">
        <label class="label">Reference</label>
        <div class="control">
          <input v-model="$v.reference.$model" :class="{'is-danger': $v.reference.$error}" class="input" type="url" placeholder="e.g. https://www.google.com">
        </div>
        <template v-if="$v.reference.$error">
          <p class="help is-danger" v-if="!$v.reference.required">This field is required</p>
          <p class="help is-danger" v-if="!$v.reference.url">must be URL</p>
        </template>
      </div>

      <div class="control mb-3">
        <label class="radio">
          <input
            v-model="$v.statusBlog.$model"
            :class="{ 'is-danger': $v.statusBlog.$error }"
            type="radio"
            name="answer"
            value="status_private"
          />
          Private
        </label>
        <label class="radio">
          <input
            v-model="$v.statusBlog.$model"
            :class="{ 'is-danger': $v.statusBlog.$error }"
            type="radio"
            name="answer"
            value="status_private"
          />
          Public
        </label>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="pinnedBlog" type="checkbox" />
            Pinned
          </label>
        </div>
      </div>

      <hr>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">วันที่โพสต์</label>
            <div class="control">
              <input class="input" type="date" v-model="start_date">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">วันสิ้นสุดโพสต์</label>
            <div class="control">
              <input class="input" type="date" v-model="end_date">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitBlog" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { required,  url, minLength, maxLength, alpha,} from 'vuelidate/lib/validators'

function checkStatus(value){
  return value == "status_private" || value == "status_public"
}

export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [], // array of image
      titleBlog: "",
      contentBlog: "",
      pinnedBlog: false,
      statusBlog: "status_public",
      reference: "",
      start_date: "",
      end_date: ""
    };
  },
  validations: {
    titleBlog: {
      required: required,
      alpha,
      minLength: minLength(10),
      maxLength: maxLength(25),
    },
    content:{
      required: required,
      minLength: minLength(50),
    },
    reference: {
      required: required,
      url: url,
    },
    statusBlog:{
      required: required,
      checkStatus: checkStatus,
    }
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBlog() {
      let formData = new FormData();
      formData.append("title", this.titleBlog);
      formData.append("content", this.contentBlog);
      formData.append("pinned", this.pinnedBlog ? 1 : 0);
      // formData.append("reference", this.reference);
      // formData.append("start_date", this.start_date);
      // formData.append("end_date", this.end_date);
      formData.append("status", this.statusBlog);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });

      // Note ***************
      // ตอนเรายิง Postmant จะใช้ fromData
      // ตอนยิงหลาย ๆ รูปพร้อมกันใน Postman จะเป็นแบบนี้

      // title   | "This is a title of blog"
      // comment | "comment in blog"
      // ...
      // myImage | [select file 1]
      // myImage | [select file 2]
      // myImage | [select file 3]

      // จะสังเกตุว่าใช้ myImage เป็น key เดียวกัน เลยต้องเอามา loop forEach
      // พอไปฝั่ง backend มันจะจัด file ให้เป็น Array เพื่อเอาไปใช้งานต่อได้

      axios
        .post("http://localhost:3001/blogs", formData)
        .then((res) => this.$router.push({name: 'home'}))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>
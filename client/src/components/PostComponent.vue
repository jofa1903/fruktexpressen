<template>
<div class="main-container">
  <div class="container">
    <h1>Skriv in din favoritfrukt</h1>
    <div class="create-post">
      <input type="text" v-model="text">
      <button v-on:click="createPost">Lägg till</button>
    </div>
    
    <!-- Create post -->
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >

      <!-- Edit post -->
      <p class="text"
        v-if ="!post.editmode"
        v-on:click="enterEditmode(post)"
        v-bind:class="{finishedTask: post.isFinished}"
        >
        {{post.text}}
      </p>
      <input class="update-field"
        v-else
        v-model="post.text"
        >
        <!-- Delete post -->
        <button class="delete-button"
        v-on:click="deletePost(post._id)">Ta bort</button>
        <!-- Update post -->
      <button class="update-button"
        v-on:click="updatePost(post._id, post.text)">Uppdatera</button>
        <p>Klicka på texten för att ändra</p>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
data(){
  return{
    posts: [],
    error: '',
    text: ''
  }
},
// get post 
async created(){
  try {
    this.posts = await PostService.getPosts();

    }catch(err){
      this.error = err.message;
  }
},
methods: {
  async createPost(){
    await PostService.insertPost(this.text);
    this.posts = await PostService.getPosts();
  },
  async deletePost(id){
    await PostService.deletePost(id);
    this.posts = await PostService.getPosts();
  },
async updatePost(id, text) {
      await PostService.updatePost(id, text);
      this.posts = await PostService.getPosts();
    },
    enterEditmode(post) {
      post.editmode = true;
      this.posts = [...this.posts];
    },
  },
}


</script>

<style>
body{
  background-color: #D2B0A7;
  height:100vh;
}

h1{
  font-family: 'Pacifico', cursive;
  color:white;
}
div.container { max-width: 800px;
 margin: 0 auto;
  }

div.post { 
position: relative; 
border: 1px solid #979797; 
background-color: #fafafa; 
padding: 10px 10px 30px 10px; 
margin-bottom: 15px;
border-radius:5px; 
}


p.text { font-size: 22px;
  font-size: 3em;
  margin-bottom: 0;
  font-family: 'Pacifico', cursive;
  padding:20px;
  }

input[type=text] {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  color: black;
  transition: width 1.4s ease-in-out;
  width:100%;
  font-size:1.5em;
  font-family: 'Pacifico', cursive;
  border: 1px solid #979797; 
  border-radius:5px;
}


.update-field{
   padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  color: black;
  transition: width 1.4s ease-in-out;
  width:100%;
  font-size:1.5em;
  font-family: 'Pacifico', cursive;
}

button{
  padding-left:30px;
  padding-right:30px;
  padding-top:10px;
  padding-bottom:10px;
  margin:10px;
  border-radius:5px;
  font-family: 'Pacifico', cursive;
}

</style>

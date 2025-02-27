/* Add your Application JavaScript */
// Instantiate our main Vue Instance

const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/api/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const upload_form={
    name: 'UploadForm',
    template: `
    <h2>Upload Form</h2>
    <br>
    <form action="" id="uploadForm" @submit.prevent="uploadPhoto" method="post" enctype="multipart/form-data">
  <div class="form-group">
  <label for="photo"><b>Photo</b></label>
  <input type="file" class="form-control" placeholder="Choose File" name="photo">
  <br>
  <label for="description"><b>Description</b></label>
  <textarea class="form-control" placeholder="Enter Photo Description" name="description" ></textarea>
  
  </div>

  <button type="submit" name="btnsub" class="btn btn-primary">Upload file</button>
</form>

    `,
    data() {
        return {};
    },methods: {
        uploadPhoto(){
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
        fetch("/api/upload", {
        method: 'POST',
        body: form_data,
        headers: {
            'X-CSRFToken': token
             },
             credentials: 'same-origin'
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (jsonResponse) {
        // display a success message
        console.log(jsonResponse);
        window.location.reload();
        
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    }
};

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/api/upload", component: upload_form },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


function Profile(name, bio, img, repos, stars, followers, following){
  this.name = name;
  this.bio = bio;
  this.image = img;
  this.repos = repos;
  this.stars = stars;
  this.followers = followers;
  this.following = following;
}





inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response) {
      data = response.data;
      name = data.name;
      location = data.location;
      profileurl = data.html_url;
      blog = data.blog;
      bio = data.bio;
      img = data.avatar_url;
      repos = data.public_repos;
      stars = data.starred_url.length;
      followers = data.followers;
      following = data.following;
      generateHTML(name, location, profileurl, blog, bio, img, repos, followers, following)
      const firstObject = new Profile(name, bio, img, repos, stars, followers, following)
      console.log(data);
    });
  });


  
function generateHTML(name, location, profileurl, blog, bio, img, repos, followers, following) {
  html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="./assets/bootstrap-social.css"/>
      <title>Document</title>
  </head>
  <body>
      
  <div class="container">
      <div class="row">
          <div class="col text-center">
              <img src="${img}" class="rounded mt-5" alt="profile-picture">
              <br>
              <h1>${name}</h1>
              <br>
              <a class="btn btn-github my-2 my-sm-0 mr-1" href="${profileurl}" type="submit">GitHub</a>
              <a class="btn btn-primary mr-1" href="${blog}">Blog</a>
              <a class="btn btn-primary" href="https://www.google.com/maps/place/${location}/">Location</a>
          </div>
      </div>
  
      <div class="row mt-4">
          <div class="col-sm-3">
              <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Followers: ${followers}</h5>
              </div>
              </div>
          </div>
          <div class="col-sm-3">
              <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Following: ${following}</h5>
              </div>
              </div>
          </div>
          <div class="col-sm-3">
                  <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">Public Repositories: ${repos}</h5>
                  </div>
                  </div>
          </div>
          <div class="col-sm-3">
              <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Stars: ${stars}</h5>
              </div>
              </div>
          </div>
      </div>
  
  </div>
  
  
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"></script>
  </body>
  </html>`;
  fs.writeFile("portfolio.html", html, err => {
    if (err) {
      console.error(err);
      return;
    }
  });
        }

// fs.writeFile("portfolio.html", html, err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });
  

# Tech Blog
  
  # Table of Content
  1. [Title](#Title)
  2. [Criteria](#Criteria)
  3. [Description](#Description)
  4. [Installation](#Installation)
  5. [Usage](#Usage)
  6. [Links](#Links)
  7. [License](#License)
  8. [Contribution](#Contribution)
  9. [Tests](#Tests)
  10. [Github](#Github)
  11. [E-mail](#Email)  
  
  ##Acceptance Criteria
  All acceptance criteria was met.
  ## Description
  AS A developer who writes about tech, I WANT a CMS-style blog site. SO THAT I can publish articles, blog posts, and my thoughts and opinions.AS A developer who writes about tech, I WANT a CMS-style blog site. SO THAT I can publish articles, blog posts, and my thoughts and opinions.
  
  ## Installation
  I used `express-handlebars`, `MySQL2`, `Sequelize`, `dotenv package`, `bcrypt package`,`express-session`, `connect-session-sequelize` and `NPM install` for bassic functioning. 
  
  ## Usage
  Help as a blog site for Tech.

  ## Links
  ![ScreenshotA](https://user-images.githubusercontent.com/77940481/120876729-8b63ee80-c580-11eb-9fd7-2ebeab14f4f9.JPG) ![ScreenshotB](https://user-images.githubusercontent.com/77940481/120876730-8d2db200-c580-11eb-8a91-d5e3d388d46f.JPG) ![ScreenshotC](https://user-images.githubusercontent.com/77940481/120876731-8f900c00-c580-11eb-8539-6c09bae0e679.JPG) ![ScreenshotD](https://user-images.githubusercontent.com/77940481/120876733-91f26600-c580-11eb-8bf6-ad25b1b894ef.JPG) ![ScreenshotE](https://user-images.githubusercontent.com/77940481/120876735-93bc2980-c580-11eb-9a0b-5309b7438c93.JPG) ![Screenshot](https://user-images.githubusercontent.com/77940481/120876737-9585ed00-c580-11eb-9af5-7c64e322366c.JPG)
  
  ## License
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  ## Contribution
  N/A
  
  ## Tests
  No test needed.
  
  ## Github
  https://github.com/dereatom
  
  ## E-mail
  dereje@gmail.com

  ## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```
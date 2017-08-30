
const style =
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`

// html for login page
const loginPage =
  `
  <div class='annotate-sidebar'>
  <div class='hero'>
    <h1 class='title marginTop centerText'>
      Please login to access this extension
    </h1>
    <h1 class='title centerText'>
    <a
      class='button
        is-dark
        is-large
        is-focused'
      href='http://localhost:1337/login'
      target='_blank'
      rel='noopener'>
      Login
    </a>
    </h1>
  </div>
  </div>
  `

// if not logged in, render login page
export default function renderLoginPrompt() {
  $('head').append(style)
  $('body').append(loginPage)
}




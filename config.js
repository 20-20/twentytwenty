const app = require('APP'), {env} = app

module.exports = {
  clientID: `917356370239-l124ctr60safa5t7egeh966qrreim6nf.apps.googleusercontent.com`,
  clientSecret: `XbZ1tUCjK7yaQskh8a0cKHNf`,
  callbackURL: `${app.baseUrl}/api/auth/login/google`
}

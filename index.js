
// All dependencies for Facebook and Google Authentication
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy= require("passport-facebook");
const keys = require("./config/keys");

// ---> Google Authentication <---

passport.use(new GoogleStrategy({
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthSecret,
    callbackURL: "/auth/google/callback"
}, (accessToken, profile, refreshToken, done) => {
    console.log("|||||||||||||||||||||||");
    console.log(accessToken);
    console.log("-----------------------");
    console.log(profile);
    console.log("-----------------------");
    console.log(refreshToken);
    console.log("-----------------------");
    console.log(done);
    console.log("-----------------------");

}))

// ---> Facebook Authentication <---

// passport.use(new FacebookStrategy({
//     clientID: keys.facebookAuthClientID,
//     callbackURL: "/auth/facebook/callback"
// }, (accessToken, profile, refreshToken) => {

// }))

const app = express();

// ---> Google Authentication Routes <---

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

app.get("/auth/google/callback", passport.authenticate("google"));

// ---> Facebook Authentication Routes <---

// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get("/auth/facebook/callback");


const PORT = process.env.PORT || 5000;

// starting local server
app.listen(PORT, () => {
    console.log("app listening on port " + PORT);
});
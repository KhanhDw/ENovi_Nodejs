require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Cấu hình Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            console.log("Google Profile11:", profile); // Xem Google trả về gì
            return done(null, profile);
        }
    )
);

// Serialize và Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;

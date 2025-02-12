import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (__accessToken, __refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
        };
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

passport.serializeUser<Express.Request['user']>((user, done) => {
  done(null, user);
});

passport.deserializeUser<Express.Request['user']>((user, done) => {
  done(null, user);
});

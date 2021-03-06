const bcrypt = require("bcrypt");
const {User} =require("../db/models");
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const {JWT_SECRET} = require("../db/config/key");

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    } else {
      try {
        const user = await User.findByPk(jwtPayload.id);
        return done(null, user); // if there is no user, this will throw a 401
      } catch (error) {
        return done(error);
      }
    }
    }
);


exports.localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({
          where: { username }, 
        });
        let passwordsMatch = user ? await bcrypt.compare(password, user.password) : false;
         return done(null, passwordsMatch ? user : false);

      } catch (error) {
        done(error);
      }
  });


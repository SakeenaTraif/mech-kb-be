const bcrypt = require("bcrypt");
const {User} =require("../db/models");
const LocalStrategy = require("passport-local").Strategy;

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


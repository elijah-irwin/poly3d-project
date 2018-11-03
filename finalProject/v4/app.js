// requiring packages we need to make the app function
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Model3D       = require("./schemas/models.js"),
    seedDB        = require("./seed.js"),
    Comment       = require("./schemas/comments.js"),
    User          = require("./schemas/users.js");

// connecting to the database
mongoose.connect("mongodb://localhost/poly3d", {useNewUrlParser: true});

// enables the body parser for json 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// calling our seedDB function to populate the db with test data
seedDB();

// ========== PASSPORT (LOGIN) STUFF ================
app.use(require("express-session")({
  secret: "Noice",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===================================================

app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  next();
});

// home page route
// localhost:3000
app.get("/", function(req,res) {
  res.render("home.ejs");
});

// models page route
// localhost:3000/models
app.get("/models", function(req,res) {
  // searching for all the models in the database
  Model3D.find({}, function(error, allModels) {
    if(error) console.log(error);
    else {
      res.render("models/models.ejs", {models: allModels});
    }
  });
});

// post route for adding newmodel to the array
app.post("/models", function(req,res) {
  var title = req.body.title;
  var image = req.body.image;
  var description = req.body.description;
  var newModel = {title: title, image: image, description: description};
  Model3D.create(newModel, function(error, new3dModel) {
    if(error) console.log(error);
    else {
      res.redirect("/models");
    }
  });
});

// add new model page route
// localhost:3000/models/new
app.get("/models/new", function(req,res) {
  res.render("models/newModel.ejs");
});

// route that will show more info about a specific model
app.get("/models/:id", function(req,res) {
  Model3D.findById(req.params.id).populate("comments").exec(function(error, foundModel) {
    if(error) console.log(error);
    else {
      res.render("models/show.ejs", {model: foundModel});
    }
  });
});

// ========== Comment Routes ==========
app.get("/models/:id/comments/new", isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error, model) {
    if(error) console.log(error);
    else res.render("comments/newComment.ejs", {model:model});
  });
});

app.post("/models/:id/comments", isLoggedIn, function(req,res) {
  Model3D.findById(req.params.id, function(error,model) {
    if(error) {
      console.log(error);
      res.redirect("/models");
    } else {
      Comment.create(req.body.comment, function(error,comment) {
        if(error) console.log(error);
        else {
          model.comments.push(comment);
          model.save();
          res.redirect("/models/" + model._id);
        }
      });
    }
  });
});
// ===================================


// ========= Authentication Routes ==========

// show register form
app.get("/register", function(req,res) {
  res.render("register.ejs");
});

// handle sign up request
app.post("/register", function(req,res) {
  
  // create new User with username from form data
  var newUser = new User({username: req.body.username});

  // register the new user with that new User object and the password
  // from the form data
  User.register(newUser, req.body.password, function(error,user) {
    if(error) {
      console.log(error);
      return res.render("register.ejs");
    }

    // if register sucessful, redirect to the models page
    passport.authenticate("local")(req,res,function() {
      res.redirect("/models")
    });
  });
});

// login form
app.get("/login", function(req,res) {
  res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/models",
    failureRedirect: "/login"
  }), function(req,res) {
});

// logout route
app.get("/logout", function(req,res) {
  req.logout();
  res.redirect("/models");
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}


// listen function for the app to determine where to host the server
// localhost:3000
app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.")
});
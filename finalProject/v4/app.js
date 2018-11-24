// requiring packages we need to make the app function
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    seedDB        = require("./seed.js"),
    User          = require("./schemas/users.js");

var modelRoutes   = require("./routes/models.js"),
    commentRoutes = require("./routes/comments.js"),
    authRoutes    = require("./routes/auth.js"),
    uploadRoutes    = require("./routes/uploads.js");

// connecting to the database
mongoose.connect("mongodb://localhost/poly3d", {useNewUrlParser: true});

// enables the body parser for json 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// calling our seedDB function to populate the db with test data
// seedDB();

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

// makes each route have access to current user data
app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  next();
});

// requiring our newly refactored routes
app.use(modelRoutes);
app.use(commentRoutes);
app.use(authRoutes);
app.use(uploadRoutes);

// home page route
// localhost:3000
app.get("/", function(req,res) {
  res.render("home.ejs");
});

// listen function for the app to determine where to host the server
// localhost:3000
app.listen(3000, process.env.IP, function() {
  console.log("Server has started sucessfully.")
});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cron = require('node-cron');
const searchRouter = require('./routes/movies/searchRoute');
const trendingRouter = require('./routes/movies/trendingRoute');
const streamMovieRouter = require('./routes/movies/streamMovie');
const latestMovieRouter = require('./routes/movies/latestMovie');
const recommendationsMovies = require('./routes/movies/recommendationsMovies');
const movieDetails = require("./routes/movies/movieDetails")
const {subscribeOneTokenToTopic} = require("./fireBaseNotificationSystem")
// const recentEpisodesRouter = require('./routes/anime/recentEpisodes');
// const searchAnime = require("./routes/anime/searchAnime")
// const animeDetails = require("./routes/anime/animeDetails")
// const getAnimeEpisodes = require("./routes/anime/getAnimeEpisodes")
// const streamAnimeEpisodeRoute = require("./routes/anime/streamAnimeEpisode") 
// const searchAnimeAnimefy = require("./routes/anime/animefy/searchAnimefy")
// const StreamAnimeAnimefy = require("./routes/anime/animefy/streamAnime")
// const StreamAnimeParadise = require("./routes/anime/animeParadise/search")
const {compareMovies, compareEpisodes} = require("./module/checkForNewContent")

const getSeasons = require("./routes/series/getSeasons")
const streamSeries = require("./routes/series/streamSeries")

const seriesDetails = require("./routes/series/seriesDetails")

const addToWatchLater = require("./routes/users/watchLater") 

const checkContentExists = require("./routes/users/checkContentExists")

const recentActivities = require("./routes/users/recent")

const viewedEpisodes = require("./routes/users/viewedEpisodes")

const favoritesRouter = require("./routes/users/favorites")

const userAthentication = require("./routes/users/userAthentication")

const {getRecentAddedMovies} = require("./module/checkForNewContent")

const {getTheNewContentController} = require("./controller/getTheNewContent")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Make sure you register the router here
app.use('/user', userAthentication);


app.post("/subscribe",async function (req,res){
try{
  const notifToken = req.body.notifToken;
  const subscribtion = await  subscribeOneTokenToTopic(notifToken,"streamVerseNotificationSystem")
res.status(201).send(subscribtion)
}catch(error){
  console.log(error);
  
}
})

app.get('/', getRecentAddedMovies);

app.get('/recently_added', async function(req, res){
try{
 const data = await getTheNewContentController()
 res.status(200).send(data)
}catch(error){
  console.error(error)
  res.status(500).send("an error occured")
}

});

app.use('/favorites', favoritesRouter);
app.use('/viewed', viewedEpisodes);

app.use('/recent_Activities/get', recentActivities);

app.use('/watchLater/get', checkContentExists);
app.use('/watchLater', addToWatchLater);
app.use('/series/season', getSeasons);
app.use('/series/stream', streamSeries);
app.use('/movies/details', movieDetails);
app.use('/tv/details', seriesDetails);
app.use('/movies/search', searchRouter); // Corrected to use the root path for the router
app.use('/movies/trending', trendingRouter);
app.use('/movies/stream', streamMovieRouter);
app.use('/movies/recommendations', recommendationsMovies);
app.use('/movies', latestMovieRouter);
// app.use('/anime/search', searchAnime);
// app.use('/anime/info', animeDetails);
// app.use('/anime/episodes', getAnimeEpisodes);
// app.use('/anime/episodes/stream', streamAnimeEpisodeRoute); 
// app.use('/anime/animefy', searchAnimeAnimefy); 
// app.use('/anime/animefy/stream', StreamAnimeAnimefy);
// app.use('/anime/animefy/stream', StreamAnimeAnimefy);
// app.use('/anime/recentEpisodes', recentEpisodesRouter);

// app.use('/anime/paradise', StreamAnimeParadise);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

cron.schedule('0 * * * *', async () => {
  console.log('Cron job started: Fetching data from API...');

  try {
  response = await  compareMovies()
    console.log('API response:', response);
  } catch (error) {
    console.error('Error fetching from API:', error.message);
  }
});

cron.schedule('30 * * * *', async () => {
  console.log('Cron job started: Fetching data from API...');

  try {
  response = await  compareEpisodes()
    console.log('API response:', response);
  } catch (error) {
    console.error('Error fetching from API:', error.message);
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

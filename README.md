# liriNodeApp
node app that can return tweets, songs, and movie from command line

#Set-Up:
This App requires the NPM libraries: require, fs, twitter, node-spotify-api, and dotenv
This App also requires the following keys:

twitter:
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret


spotify:
  id,
  secret
  
 Create a file called .env and paste the following:

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

Use:
1. The app will take the following 4 commands:

    1
    my-tweets
    this will show my most recent 20 tweets
    
    2
    spotify-this-song
    this will return the top 10 closest songs to your search term
    
    3
    movie-this
    this will return the top hit from your movie search term. It will include data like casts and ratings
    
    4
    do-what-it-says
    this will follow any commands correctly written in the random.txt file
 
2. spotify-this-song and movie-this can take values of songs and movies, respectively, but they MUST BE IN QUOTES. There will be suggestions if your input is invalid

Examples:
 node liri.js movie-this 'home alone'
 node liri.js my-tweets



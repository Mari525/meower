import { tweetsData } from "./data";

function getTweets() {
  let tweets = ""

  tweetsData.forEach(function(tweet){
    tweets += `
      <li class="tweet">
        <img src="../img/${tweet.profilePic}" alt="Profile pic" class="tweet__img profile-pic">
        <p class="tweet__handle">
          ${tweet.handle}
        </p>
        <p class="tweet__text">
          ${tweet.tweetText}
        </p>
        <div class="tweet__btns">
          <button class="tweet__btn">
            ${tweet.replies.length}
          </button>
          <button class="tweet__btn">
            ${tweet.likes}
          </button>
          <button class="tweet__btn">
            ${tweet.retweets}
          </button>
        </div>
      </li>
      `
  })
  return tweets
}

function render() {
  document.getElementById('tweets-list').innerHTML = getTweets()
}

render()
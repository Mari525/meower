import { tweetsData } from "./data";
import { v4 as uuidv4 } from 'uuid';

document.addEventListener('click', function(e){
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  }
  else if (e.target.id === 'tweet-btn') {
    addTweet()
  }
})

function handleLikeClick(tweetId) {
  const tweetObject = tweetsData.filter(function(tweet) {
    return tweet.uuid === tweetId
  })[0]
  if (tweetObject.isLiked) {
    tweetObject.likes--
  }
  else {
    tweetObject.likes++
  }
  tweetObject.isLiked = !tweetObject.isLiked
  render()
}

function handleRetweetClick(tweetId) {
  const tweetObject = tweetsData.filter(function(tweet){
    return tweet.uuid === tweetId
  })[0]
  if (tweetObject.isRetweeted) {
    tweetObject.retweets--
  }
  else {
    tweetObject.retweets++
  }
  tweetObject.isRetweeted = !tweetObject.isRetweeted
  render()
}

function handleReplyClick(tweetId) {
  document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')
  document.getElementById(`${tweetId}`).classList.toggle('tweet__btn--reply')
}

function addTweet() {
  const tweetInput = document.getElementById('tweet-input')
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@RandomCoolName`,
      profilePic: `cat.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4()
    })
    render()
  }

}

function getTweets() {
  let tweets = ""

  tweetsData.forEach(function(tweet){
    let liked = ""
    let retweeted = ""
    let replies = ""

    if (tweet.isLiked === true) {
      liked = "tweet__btn--liked"
    }
    if (tweet.isRetweeted === true) {
      retweeted = "tweet__btn--retweeted"
    }

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function(reply){
        replies += `
          <li class="tweet">
            <img class="tweet__img profile-pic" src="../img/${reply.profilePic}">
            <p class="tweet__handle">${reply.handle}</p>
            <p class="tweet__text">${reply.tweetText}</p>
          </li>
        `
      })
    }

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
          <button class="tweet__btn" id="${tweet.uuid}" data-reply="${tweet.uuid}">
          <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.993 511.993" style="enable-background:new 0 0 511.993 511.993;" xml:space="preserve"><g><g><path d="M472.513,110.243c-43.59-53.679-115.097-85.28-201.362-88.981c-91.803-3.967-173.4,24.776-223.902,78.793 C12.409,137.327-4.07,182.381,0.855,226.92c9.637,87.419,91.669,131.062,122.125,144.364l-1.482,103.197 c-0.098,6.753,3.976,12.894,10.258,15.423c1.979,0.799,4.055,1.189,6.114,1.189c4.455,0,8.812-1.81,11.971-5.191l87.481-93.613 c6.176-6.62,5.83-16.985-0.781-23.153c-6.611-6.194-16.985-5.839-23.152,0.781l-58.534,62.625l1.038-72.013 c0.106-7.037-4.322-13.364-10.968-15.707c-1.012-0.364-102.176-36.863-111.503-121.495c-3.86-34.893,9.549-70.727,37.759-100.898 c43.971-47.024,116.331-71.969,198.567-68.437c76.77,3.292,139.749,30.607,177.331,76.903 c25.043,30.829,36.26,67.425,30.811,100.393c-13.746,83.097-90.374,132.712-204.965,132.712c-9.052,0-16.39,7.33-16.39,16.382 s7.339,16.39,16.39,16.39c130.023,0,220.947-61.364,237.285-160.133C517.194,194.423,503.457,148.348,472.513,110.243z"></path></g></g></svg>
            ${tweet.replies.length}
          </button>
          <button class="tweet__btn ${liked}" data-like="${tweet.uuid}">
            <svg width="20px" height="20px" viewBox="0 -19 353.81368 353" xmlns="http://www.w3.org/2000/svg"><path d="m174.84375 315.222656c.636719.21875 1.292969.367188 1.957031.453125.625-.097656 1.242188-.246093 1.839844-.445312 100.445313-40.78125 192.632813-128.664063 172.347656-233.242188-4.90625-24.285156-15.863281-44.679687-31.683593-58.972656-15.699219-14.183594-35.515626-21.683594-57.300782-21.683594-25.257812 0-53.109375 10.527344-80.550781 30.445313-2.832031 2.054687-6.675781 2.03125-9.484375-.0625-27.84375-20.773438-55.074219-31.308594-80.929688-31.308594-21.835937 0-41.617187 7.527344-57.207031 21.769531-15.800781 14.429688-26.625 35.097657-31.300781 59.75-14.625 76.253907 32.988281 177.925781 172.3125 233.296875zm0 0"></path></svg>
            ${tweet.likes}
          </button>
          <button class="tweet__btn ${retweeted}" data-retweet="${tweet.uuid}">
          <svg width="23px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M614.2 334.8C610.5 325.8 601.7 319.1 592 319.1H544V176C544 131.9 508.1 96 464 96h-128c-17.67 0-32 14.31-32 32s14.33 32 32 32h128C472.8 160 480 167.2 480 176v143.1h-48c-9.703 0-18.45 5.844-22.17 14.82s-1.656 19.29 5.203 26.16l80 80.02C499.7 445.7 505.9 448 512 448s12.28-2.344 16.97-7.031l80-80.02C615.8 354.1 617.9 343.8 614.2 334.8zM304 352h-128C167.2 352 160 344.8 160 336V192h48c9.703 0 18.45-5.844 22.17-14.82s1.656-19.29-5.203-26.16l-80-80.02C140.3 66.34 134.1 64 128 64S115.7 66.34 111 71.03l-80 80.02C24.17 157.9 22.11 168.2 25.83 177.2S38.3 192 48 192H96V336C96 380.1 131.9 416 176 416h128c17.67 0 32-14.31 32-32S321.7 352 304 352z"/></svg>
            ${tweet.retweets}
          </button>
        </div>
        <ul class="tweet__replies hidden" id="replies-${tweet.uuid}">
          ${replies}
        </ul>
      </li>
      `
  })
  return tweets
}

function render() {
  document.getElementById('tweets-list').innerHTML = getTweets()
}

render()
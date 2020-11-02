var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var dot = require("./lib/dot");
var track = require("./lib/tracking");
require("./lazyLoading");

//var { firebase, uiConfig, auth } = require('./firebase')
var channel = require("./pubsub");
var authService = require('./authService')
var bookService = require("./bookService");
var {
  renderBook,
  renderList,
  renderCovers,
  createCover,
  filterBooks,
  renderProfile
} = require("./catalog");
var { getFilters, setFilters, enableFilters } = require("./filters");

var hash = require("./hash");
hash.define({
  year: Number,
  book: String,
  years: [Number],
  tags: [String],
  view: String,
  reset: Boolean
});

/*

State flow:
mobile filters -> filters -> hash -> rendering

The hash is always the source of truth.

*/

var defaults = {
  view: "covers",
  year: 2019
};

const tagIndex = window.conciergeData.tags.reduce((accum, tag, i) => ({
  ...accum,
  [tag]: i
}))

const compare = (a, b) => a > b ? 1 : a < b ? -1 : 0
const compareTags = (a, b) => compare(tagIndex[a], tagIndex[b])

const isEmail = s => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)
const isTwitterHandle = s => s.startsWith('@')
const isMissingHttp = s => !s.startsWith('http')
const isNotUrl = s => !s.includes('.')

// hashes update filters (usually redundant) and render the main panel
channel.on("hashchange", async function(params, pastParams = {}) {
  var bodyData = document.body.dataset;
  var existing = getFilters();
  // hash params override existing filters override defaults
  var merged = Object.assign({}, defaults, existing, params);
  console.log('hashchange merged',merged)
  bodyData.mode = merged.view;
  bodyData.year = merged.year;
  bodyData.tags = (merged.tags || []).length;
  //console.log('hashchange bodyData',bodyData)

  setFilters(merged);
  // profile rendering
  if (merged.profile)
  {
    let u = authService.getUser()

    console.log('profile view',u)
    //console.log(firebase.user)
    track("profile", u.uid);
    var back = hash.serialize({
      year: merged.year,
      view: merged.view,
      tags: merged.tags.sort(compareTags),
      reset: !pastParams.year // don't restore focus if this is the starting view
    });
    enableFilters(false);
    renderProfile({ back, user: u });
    //renderProfile({ book, next, previous, back, hash, reviewer });
    return
  }

  // single book rendering
  if (merged.book) {
    // get book data
    var [book, books] = await Promise.all([
      bookService.getDetail(merged.year, merged.book),
      bookService.getYear(merged.year, merged.view)
    ]);
    // find the location of this book in the current filter view
    var shelf = filterBooks(books, merged.tags);
    var shelved = shelf.filter(b => b.id == book.id).pop();
    var index = shelf.indexOf(shelved);
    // generate next and previous links
    var previous = shelf[index > 0 ? index - 1 : shelf.length - 1];
    var next = shelf[(index + 1) % shelf.length];
    previous = hash.serialize({ year: merged.year, book: previous.id });
    next = hash.serialize({ year: merged.year, book: next.id });
    // generate a back link from the year
    var back = hash.serialize({
      year: merged.year,
      view: merged.view,
      tags: merged.tags.sort(compareTags),
      reset: !pastParams.year // don't restore focus if this is the starting view
    });
    // look up the reviewer from the table
    // convert twitter handles and www
    var reviewer = window.conciergeData.reviewers[book.reviewer] || {};
    if (reviewer.link) {
      reviewer.link = (isTwitterHandle(reviewer.link) ? 'https://twitter.com/'
        : isEmail(reviewer.link) ? 'mailto:'
        : isNotUrl(reviewer.link) ? 'https://twitter.com/@'
        : isMissingHttp(reviewer.link) ? 'http://'
        : '') + reviewer.link
    }
    track("book-selected", `${book.title} by ${book.author}`);
    renderBook({ book, next, previous, back, hash, reviewer });
    document.body.setAttribute("data-mode", "book");
  } else {
    console.log('where we go?')
    // filtered view rendering
    document.body.classList.add("loading");
    // disable filtering during load to prevent spamming
    enableFilters(false);

    var { year, tags, view } = merged;

    // did the year change? If so, remove those books
    if (merged.year != pastParams.year) {
      $(".book-container").forEach(el => el.parentElement.removeChild(el));
    }

    books = await bookService.getYear(year, view);

    if (view == "list") {
      await renderList(books, year, tags);
    } else {
      await renderCovers(books, year, tags);
    }

    if (!merged.reset && pastParams.book && pastParams.year == merged.year) {
      var clicked = $.one(`[data-id="${pastParams.book}"] a`);
      if (clicked) {
        // give it a frame to do layout
        requestAnimationFrame(() => {
          clicked.focus();
          clicked.scrollIntoView({ block: "center", behavior: "smooth" });
        });
      }
    }
    document.body.classList.remove("loading");
    enableFilters(true);
  }
});

// on startup, check for a pre-existing hash
var startup = hash.parse();
// years is guaranteed to be an array because of the define() above
if (startup.year || startup.tags) {
  // if found, force a render from the hash, which will update filters accordingly
  hash.force();
} else {
  // otherwise, set the hash from the initial filter state to kick off a render
  var filter = getFilters();
  hash.replace(filter);
}
$.one('#btn-auth-login').onclick = (e)=>{
  //console.log(e)
  e.preventDefault()
  firebase.ui.start('#firebase-auth-window', uiConfig)
}


$.one('#btn-auth-logout').onclick = (e)=>{
  e.preventDefault()
  auth.signOut()
}

  console.log('bind auth-user')
channel.on("auth-user", function(user) {
  console.log('on auth-user')
  if (user)
  {
    $.one('#btn-auth-login').style.display = 'none'
    $.one('#btn-auth-logout').style.display = 'inline'
    $.one('#btn-auth-profile').style.display = 'inline'
  } else {
    $.one('#btn-auth-login').style.display = 'inline'
    $.one('#btn-auth-logout').style.display = 'none'
    $.one('#btn-auth-profile').style.display = 'none'
  }
})

// filters update the hash
channel.on("filterchange", function(state) {
  hash.replace(state);
});

document.body.addEventListener("click", function(e) {
  var target = e.target;
  if (target.dataset.track) {
    track("clicked-link", target.dataset.track, target.href);
  }
});

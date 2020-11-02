import Vue from 'vue'
    
export default Vue.component('topbar',{
  template: `
    <header class="hero">
      <!-- <a href="https://npr.org/books" class="books-home">
        Diverse Picture Book Finder
      </a> -->
      <h1>A&nbsp;Thousand Worlds</h1>
      <p class="bylines">
        COLORFUL READS X COLORFUL PEOPLE: Picture books curated by leaders in the industry
      </p>

      <p class="about-link">
        <a id="btn-auth-login" href="#login">Log In</a>
        <a id="btn-auth-logout" href="#logout">Log Out</a>
        <a id="btn-auth-profile" href="#profile=1">Profile</a>
        <a href="about.html">About</a>
      </p>
      <div id="firebase-auth-window"></div>

      <!-- <h3>Filters</h3> -->
      <fieldset class="years" aria-label="Select a year">
        <div style="display: none">
          
          <input type="radio" name="year-radio" id="year-2020" value="2020" checked=checked>
          <label for="year-2020">2020</label>
          
        </div>
      </fieldset>
    </header>
  `
})

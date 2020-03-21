const apiKey = 'dxelgnrN6hJaLjXuJPRFcM4OXmWuzLekg9wPp0te';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getParks(key, max=10) {

    let stateCode = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID',
    'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV',
    'NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
    'VT','VA','WA','WV','WI','WY'];

    const maxResults = $('#js-max-results').val();
    const abbreviation = $('#code').val().split((/[\s,]+/));
  
    console.log(abbreviation);
    const params = {
      api_key: apiKey,
      limit: maxResults,
      stateCode:abbreviation
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();   
      getParks();
    });
  }

  // Description Website URL
  
function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-list').empty();

  
    for (let i = 0; i < responseJson.data.length; i++){
      $('.results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Link</a>
        </li>`

      )};

//display the results section  
  $('#results').removeClass('hidden');
 };
$(watchForm);
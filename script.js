const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// to change value we use let
// let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
 if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
 }
}


// Another API 
async function getQuote() {
    loading();
    // resolve CORS
    const proxyUrl = 'https://arcane-harbor-58557.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        data = await response.json();
        // no author
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Salem Eid';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // resize text 
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //stop loader, show quote
        complete();

    } catch (error) {
        console.log('whoops, no quote',error);
    }
    
}

// Tweet Quote
function tweetQuote() {
    const author = data.quoteAuthor;
    const quote = data.quoteText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, ' _blank');
}

// Event listeners

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on load

getQuote();

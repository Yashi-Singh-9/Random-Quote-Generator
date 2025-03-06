async function getQuote() {
  const adviceText = document.getElementById("advice-text");
  const authorSpan = document.querySelector(".author");

  // Using a CORS Proxy for ZenQuotes
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const apiUrl = "https://zenquotes.io/api/random?t=" + new Date().getTime(); // Prevents caching

  try {
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      if (!response.ok) throw new Error("Failed to fetch quote");

      const data = await response.json();
      const quotes = JSON.parse(data.contents);
      const randomQuote = quotes[0]; // ZenQuotes returns an array

      // Updating the DOM
      adviceText.textContent = `"${randomQuote.q}"`;
      authorSpan.textContent = `- ${randomQuote.a}`;

      // Update Twitter Share Button
      updateTwitterButton(randomQuote.q, randomQuote.a);
  } catch (error) {
      adviceText.textContent = "Oops! Something went wrong. Try again.";
      authorSpan.textContent = "";
      console.error("Error fetching quote:", error);
  }
}

// Function to update Twitter Share Link
function updateTwitterButton(quote, author) {
  const tweetButton = document.querySelector(".fa-twitter");
  const tweetText = `"${quote}" - ${author}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  // Update the button to open Twitter share
  tweetButton.onclick = function () {
      window.open(tweetUrl, "_blank");
  };
}

// Ensure the button works properly
document.getElementById("new-quote").addEventListener("click", getQuote);

// Fetch an initial quote on page load
getQuote();

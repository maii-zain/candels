document.addEventListener("DOMContentLoaded", function() {
    // Array of quotes
    const quotes = [
        "Let your light shine so brightly that others can see their way out of the dark.",
        "Just as one candle lights another and can light thousands of other candles, so one heart illuminates another heart and can illuminate thousands of other hearts.\n \"Leo Tolstoy\"",
        "Wisdom holds a candle to experience, but you’ve got to take the candle and walk alone. -Lauren Kate",
        "Do not worry if all the candles in the world flicker and die. We have the spark that starts the fire. – Rumi",
        "Happiness is like a cozy candle flame – it warms the heart"
        // Add more quotes as needed
    ];
    

    let currentQuoteIndex = 0;
    let currentImageIndex = 0;

    // Function to update the quote
    function updateQuote() {
        document.getElementById("quote").textContent = quotes[currentQuoteIndex];
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }

    // Function to update the slider
    function updateSlider() {
        const images = document.querySelectorAll("#slider-container img");
        images[currentImageIndex].style.display = "none";
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = "block";
    }

    // Initial call to update quote and start the interval
    updateQuote();
    setInterval(updateQuote, 2000);

    // Initial call to update slider and start the interval
    updateSlider();
    setInterval(updateSlider, 2000);
});

// Web Search Demo Script
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Demo search data
    const demoData = [
        { title: 'Introduction to Web Development', url: 'https://example.com/web-dev', description: 'Learn the basics of HTML, CSS, and JavaScript for web development.' },
        { title: 'JavaScript Fundamentals', url: 'https://example.com/js-basics', description: 'Master JavaScript programming concepts and best practices.' },
        { title: 'CSS Styling Guide', url: 'https://example.com/css-guide', description: 'Comprehensive guide to styling web pages with CSS.' },
        { title: 'HTML Structure and Semantics', url: 'https://example.com/html-semantics', description: 'Understanding proper HTML structure and semantic elements.' },
        { title: 'Web Search Algorithms', url: 'https://example.com/search-algo', description: 'How search engines work and index web content.' }
    ];

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        // Simple search implementation
        const results = demoData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        displayResults(results, query);
    }

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `<p>No results found for "${query}".</p>`;
            return;
        }

        const resultsHTML = results.map(item => `
            <div class="search-result">
                <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
                <p class="url">${item.url}</p>
                <p class="description">${item.description}</p>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <h2>Search Results for "${query}" (${results.length} results)</h2>
            ${resultsHTML}
        `;
    }

    // Event listeners
    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        performSearch(query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            performSearch(query);
        }
    });

    // Add some basic styling
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        h1 {
            color: #333;
            text-align: center;
        }
        
        #search-input {
            width: 70%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-right: 10px;
        }
        
        #search-button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        #search-button:hover {
            background-color: #0056b3;
        }
        
        .search-result {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .search-result h3 {
            margin: 0 0 5px 0;
        }
        
        .search-result h3 a {
            color: #1a0dab;
            text-decoration: none;
        }
        
        .search-result h3 a:hover {
            text-decoration: underline;
        }
        
        .search-result .url {
            color: #006621;
            font-size: 14px;
            margin: 5px 0;
        }
        
        .search-result .description {
            color: #545454;
            margin: 5px 0 0 0;
        }
    `;
    document.head.appendChild(style);

    // Show initial message
    searchResults.innerHTML = '<p>Enter a search term to get started. Try searching for "web", "JavaScript", or "CSS".</p>';
}); 
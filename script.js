// Initial rendering logic – to be refactored during the lab

function addStations(stations){
  // Loop through each station in the array
  stations.forEach(function(station) {
    // Call the DOM helper function to add each station to the page
    addStationElement(station);
  });
}


// 🧪 TEAM FEATURES

// 💌 Wishlist Renderer
function renderWishlist() {
  // TODO: Use forEach to display items in wishlist
}

// ❌ Search Feedback
function searchStations(query) {
  // Filter stations array based on query
  const matchingStations = stations.filter(function(station) {
    // Check if the station name includes the search query (case-insensitive)
    return station.name.toLowerCase().includes(query.toLowerCase());
  });
  
  // Check if no stations were found
  if (matchingStations.length === 0) {
    // Display error message when no results found
    const feedbackSection = document.getElementById("search-feedback");
    feedbackSection.innerHTML = `<p style="color: red;">No stations found for "${query}". Please try a different search term.</p>`;
    
    // Clear the station list since no results
    const stationList = document.getElementById("station-list");
    stationList.innerHTML = "";
  } else {
    // Clear any previous error messages
    const feedbackSection = document.getElementById("search-feedback");
    feedbackSection.innerHTML = "";
    
    // Clear the current station list
    const stationList = document.getElementById("station-list");
    stationList.innerHTML = "";
    
    // Display the matching stations
    matchingStations.forEach(function(station) {
      addStationElement(station);
    });
  }
}

// Function to handle search button click and Enter key press
function handleSearch() {
  // Get the search input element
  const searchInput = document.getElementById("search-input");
  
  // Get the search query from the input
  const query = searchInput.value.trim();
  
  // Get the current location filter value
  const locationFilter = document.getElementById("location-filter");
  const selectedLocation = locationFilter.value;
  
  // Use the combined filter function
  filterStations(selectedLocation, query);
}

// 🌟 Random Featured Station
function pickFeaturedStation() {
  // TODO: Use Math.random to select and display a station
}

// 🏙️ Group by City
function groupStationsByCity() {
  // TODO: Loop through stations and group under each city
}

// 🔄 Filter Toggle
function toggleFilteredStations() {
  // TODO: Add toggle logic to filter stations dynamically
}

// Function to handle location filter dropdown change
function handleLocationFilter() {
  // Get the selected location value
  const locationFilter = document.getElementById("location-filter");
  const selectedLocation = locationFilter.value;
  
  // Get current search query to maintain search while filtering
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim();
  
  // Filter stations by location and search query
  filterStations(selectedLocation, searchQuery);
}

// Combined function to filter stations by both location and search query
function filterStations(location, searchQuery) {
  // Start with all stations
  let filteredStations = stations;
  
  // Filter by location if a location is selected
  if (location !== "") {
    filteredStations = filteredStations.filter(function(station) {
      return station.location === location;
    });
  }
  
  // Filter by search query if there is one
  if (searchQuery !== "") {
    filteredStations = filteredStations.filter(function(station) {
      return station.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
  
  // Clear any previous error messages
  const feedbackSection = document.getElementById("search-feedback");
  feedbackSection.innerHTML = "";
  
  // Clear the current station list
  const stationList = document.getElementById("station-list");
  stationList.innerHTML = "";
  
  // Check if any stations match the filters
  if (filteredStations.length === 0) {
    // Display error message when no results found
    let errorMessage = "No stations found";
    if (location !== "" && searchQuery !== "") {
      errorMessage = `No stations found for "${searchQuery}" in ${location}`;
    } else if (location !== "") {
      errorMessage = `No stations found in ${location}`;
    } else if (searchQuery !== "") {
      errorMessage = `No stations found for "${searchQuery}"`;
    }
    feedbackSection.innerHTML = `<p style="color: red;">${errorMessage}. Please try different filters.</p>`;
  } else {
    // Display the filtered stations
    filteredStations.forEach(function(station) {
      addStationElement(station);
    });
  }
}

// Function to populate location dropdown from station data
function populateLocationDropdown() {
  // Get the dropdown element
  const locationFilter = document.getElementById("location-filter");
  
  // Create an array to store unique locations
  const uniqueLocations = [];
  
  // Loop through all stations to find unique locations
  stations.forEach(function(station) {
    // Check if this location is already in our array
    if (!uniqueLocations.includes(station.location)) {
      // Add the location to our array if it's not already there
      uniqueLocations.push(station.location);
    }
  });
  
  // Sort the locations alphabetically for better user experience
  uniqueLocations.sort();
  
  // Add each unique location as an option to the dropdown
  uniqueLocations.forEach(function(location) {
    // Create a new option element
    const option = document.createElement("option");
    
    // Set the value and text content
    option.value = location;
    option.textContent = location;
    
    // Add the option to the dropdown
    locationFilter.appendChild(option);
  });
}

// Function to toggle between light and dark themes
function toggleTheme() {
  console.log('toggleTheme called');
  
  // Get the current theme from the document element
  const currentTheme = document.documentElement.getAttribute('data-theme');
  console.log('Current theme:', currentTheme);
  
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  
  // Switch between themes - check for both 'dark' and null/undefined/empty
  if (currentTheme === 'dark') {
    // Switch to light mode
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
      themeToggle.textContent = '🌙 Dark Mode';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', 'light');
    console.log('Switched to light mode');
  } else {
    // Switch to dark mode (covers null, undefined, 'light', or any other value)
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
      themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', 'dark');
    console.log('Switched to dark mode');
  }
}

// Function to load saved theme on page load
function loadSavedTheme() {
  console.log('loadSavedTheme called');
  
  // Get saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  console.log('Saved theme:', savedTheme);
  
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  console.log('Theme toggle button found:', !!themeToggle);
  
  // Set theme based on saved preference or default to light
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
      themeToggle.textContent = '☀️ Light Mode';
    }
    console.log('Set theme to dark');
  } else {
    // Default to light mode if no saved theme or saved theme is 'light'
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
      themeToggle.textContent = '🌙 Dark Mode';
    }
    console.log('Set theme to light');
  }
  
  // Log the final state
  console.log('Final data-theme attribute:', document.documentElement.getAttribute('data-theme'));
}

// Wait for DOM to be fully loaded before setting up all functionality
document.addEventListener('DOMContentLoaded', function() {
  // Load the saved theme first
  loadSavedTheme();
  
  // Populate the location filter dropdown
  populateLocationDropdown();
  
  // Load stations on page start
  addStations(stations);
  
  // Set up search input event listener
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    // Listen for Enter key press in search input
    searchInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  }
  
  // Set up theme toggle event listener
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

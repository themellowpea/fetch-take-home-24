# Getting Started
Ensure you have the following installed:

- Node.js `@latest`
- npm/pnpm

```sh
pnpm install
pnpm run dev
```

# Overview
Welcome to my Dog Adoption Frontend Application! This simple app, powered by a backend provided by Fetch, allows users to search for dog information for adoption.
The app is deployed and available to be interacted with following this [link](https://fetch-take-home-24.vercel.app/).

## Features
- **User Authentication**: Log in by hitting an authentication endpoint.
- **Dashboard**: After logging in, users are redirected to a dashboard to search for available dogs by breed.
- **Search and Filter**:
  - Search dogs by breed.
  - Filter search results by minimum and maximum age.
- **Sorting**:
  - Sort results alphabetically by breed or name.
  - Sort results by age in ascending or descending order.
- **Pagination**: Display 25 search results per page.
- **Result Display**:
  - Results are shown in a grid below the search controls.
  - Click on a dog's image to reveal more information in a modal.
- **Favorites**: Add dogs to a favorites list (viewing the favorites list is currently unavailable).
- **Find a Match**: After selecting a favorite dog, click the Find Match button to find an adoption match. A match will be displayed in a modal, and users can continue to search for more dogs.

## Usage
### Logging In
- Navigate to the login page.
- Enter your credentials and hit the authentication endpoint to log in.
### Searching for Dogs
- Use the search bar to find dogs by breed.
- Apply filters to narrow down the results by age.
- Sort the results as needed, by name, age or breed.
### Viewing Dog Details
- Click on a dog's image in the grid to view more details in a modal.
### Adding to Favorites
- In the dog details modal, click the button to add the dog to your favorites list.
### Finding a Match
- Once you have selected at least one favorite dog, click the Find Match button.
- A match will be displayed in a modal.

# Acknowledgements
Thanks to Fetch for providing the backend support for this application.

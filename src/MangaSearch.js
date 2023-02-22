// import React, { useState } from 'react';
// import axios from 'axios';

// function MangaSearch() {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post(
//         'https://graphql.anilist.co',
//         {
//           query: `
//             query ($search: String) {
//               Page {
//                 media (search: $search, type: MANGA) {
//                   id
//                   title {
//                     english
//                   }
//                   coverImage {
//                     extraLarge
//                   }
//                   description
//                   averageScore
//                   genres
//                   favourites
//                 }
//               }
//             }
//           `,
//           variables: { search: searchText }
//         }
//       );

//       const mangaResults = result.data.data.Page.media.map((media) => ({
//         id: media.id,
//         title: media.title.english || media.title.romaji,
//         summary: media.description.replace(/(<([^>]+)>)/gi, ''),
//         image: media.coverImage.extraLarge,
//         score: media.averageScore,
//         genres: media.genres.join(', '),
//         favourites: media.favourites
//       }));
//       setSearchResults(mangaResults);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input type="text" value={searchText} onChange={handleInputChange} />
//         <button type="submit">Search</button>
//       </form>
//       {searchResults.length > 0 && (
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result.id}>
//               <h3>{result.title}</h3>
//               <img src={result.image} alt={result.title} />
//               <p>{result.summary}</p>
//               <p>Average Score: {result.score}</p>
//               <p>Genres: {result.genres}</p>
//               <p>Favourites: {result.favourites}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default MangaSearch;

import React, { useState } from 'react';
import axios from 'axios';

function MangaSearch() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        'https://graphql.anilist.co',
        {
          query: `
            query ($search: String) {
              Page {
                media (search: $search, type: MANGA) {
                  id
                  title {
                    english
                  }
                  coverImage {
                    extraLarge
                  }
                  description
                  averageScore
                  genres
                  favourites
                }
              }
            }
          `,
          variables: { search: searchText }
        }
      );

      const animeResults = result.data.data.Page.media.map((media) => ({
        id: media.id,
        title: media.title.english || media.title.romaji,
        summary: media.description.replace(/(<([^>]+)>)/gi, ''),
        image: media.coverImage.extraLarge,
        score: media.averageScore,
        genres: media.genres.join(', '),
        favourites: media.favourites
      }));
      setSearchResults(animeResults);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTitleClick = (index) => {
    const newResults = [...searchResults];
    newResults[index].showDetails = !newResults[index].showDetails;
    setSearchResults(newResults);
  };

  const handleImageClick = (index) => {
    const newResults = [...searchResults];
    newResults[index].showDetails = !newResults[index].showDetails;
    setSearchResults(newResults);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchText} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {searchResults.map((result, index) => (
            <li key={result.id} style={{ margin: '1em 0', border: '1px solid black', borderRadius: '5px', padding: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ cursor: 'pointer' }} onClick={() => handleTitleClick(index)}>
                {result.title}
              </h3>
              <img style={{ cursor: 'pointer' }} onClick={() => handleImageClick(index)} src={result.image} alt={result.title} />
              {result.showDetails && (
                <div style={{ marginTop: '1em' }}>
                  <p>{result.summary}</p>
                  <p>Average Score: {result.score}</p>
                  <p>Genres: {result.genres}</p>
                  <p>Favourites: {result.favourites}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MangaSearch;

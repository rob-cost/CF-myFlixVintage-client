import { useState, useEffect } from "react";

export const UseMovieAction = ({ movie, token, favoriteChange }) => {

  console.log(movie)
  

  const [isFavorite, setIsFavorite] = useState(false)
  const [toWatch, setToWatch] = useState(false)

  const username = JSON.parse(localStorage.getItem('user')).Username;
  const favMovies = JSON.parse(localStorage.getItem('user')).FavoriteMovies;
  const toWatchMovies = JSON.parse(localStorage.getItem('user')).ToWatch;

  

  useEffect(() => {
    setIsFavorite(favMovies.includes(movie.id))
    setToWatch(toWatchMovies.includes(movie.id))
  }, [favMovies, movie, toWatchMovies])

/*   if (!id) {
  return (
    <Container>
      <div>Movie not found</div>
    </Container>
  )
}; */

  /* ---- ADD MOVIE TO FAVORITE ---- */
  const addToFavorites = (event) => {
    event.preventDefault();

    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}/favorites/${movie.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + movie.id + ' added to favorites')

        // Fetch API to update the local storage
        fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setIsFavorite(true)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      }
      else {
        console.log('Movie not added')
      }
    }).catch((err) => {
      console.log('Not able to add movie' + err)
    })
  }


  /* ---- REMOVE MOVIE FROM FAVORITE ---- */
  const removeFromFavorites = (event) => {
    event.preventDefault();

    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}/favorites/${movie.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + movie.id + ' removed from favorites')

        // Fetch API and update local storage
        fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setIsFavorite(false)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      } else {
        console.log('Movie not removed')
      }
    })
      .catch((err) => {
        console.log('Not able to remove movie' + err)
      })
  }

  /* ---- ADD MOVIE TO TO WATCH LIST ---- */
  const addToWatch = (event) => {
    event.preventDefault();

    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}/towatch/${movie.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + movie.id + ' added to to watch list')

        // Fetch API to update the local storage
        fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setToWatch(true)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      }
      else {
        console.log('Movie not added')
      }
    }).catch((err) => {
      console.log('Not able to add movie' + err)
    })
  }


  /* ---- REMOVE MOVIE FROM TO WATCH LIST ---- */
  const removeFromToWatch = (event) => {
    event.preventDefault();

    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}/towatch/${movie.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + movie.id + ' removed from to watch list')

        // Fetch API and update local storage
        fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setToWatch(false)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      } else {
        console.log('Movie not removed')
      }
    })
      .catch((err) => {
        console.log('Not able to remove movie' + err)
      })
  }
  return {
    isFavorite,
    toWatch,
    addToFavorites,
    removeFromFavorites,
    addToWatch,
    removeFromToWatch
  }
};

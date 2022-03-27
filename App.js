// import AppLoading from "expo-app-loading";
import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  StatusBar,
  BackHandler,
} from "react-native";
import {
  DefaultTheme,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import Movie from "./Components/Movie";
import globalStyles, { primaryColor } from "./styles/global";
import Screen from "./Components/Screen";
import Loading from "./Components/Loading";
import getMovies from "./Components/getMovies";
import getMovieDetails from "./Components/getMovieDetails";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F7EC12",
  },
};

function MovieScreen({ id, onClose }) {
  const [isLoadingMovieDetails, setIsLoadingMovieDetails] =
    React.useState(true);
  const [movieDetails, setMovieDetails] = React.useState(null);
  React.useEffect(() => {
    setIsLoadingMovieDetails(true);
    setMovieDetails(null);
    if (id) {
      getMovieDetails(id)
        .then((r) => {
          setMovieDetails(r.data.film);
          setIsLoadingMovieDetails(false);
        })
        .catch((err) => {
          alert(
            "Unable to load movie details, please check your internet connection and try again!"
          );
          BackHandler.exitApp();
        });
    }
  }, [id]);

  return (
    <View>
      {id !== null && (
        <Portal>
          {isLoadingMovieDetails && <Loading visible={isLoadingMovieDetails} />}
          {!isLoadingMovieDetails && (
            <Screen visible={Boolean(movieDetails)} onClose={onClose}>
              <ScrollView
                style={{
                  height: "100%",
                }}
              >
                <Text
                  style={[
                    {
                      textAlign: "center",
                      color: primaryColor,
                      marginBottom: 5,
                    },
                    globalStyles.subHeading,
                  ]}
                >
                  {movieDetails.title}
                </Text>
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 18,
                    }}
                  >
                    Release Date :- {movieDetails.releaseDate}
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 18,
                    }}
                  >
                    Directed By :- {movieDetails.director}
                  </Text>
                  {movieDetails.producers.length > 1 ? (
                    <Text
                      style={{
                        color: primaryColor,
                        fontSize: 18,
                      }}
                    >
                      Producers :- {movieDetails.producers.join(", ")}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: primaryColor,
                        fontSize: 18,
                      }}
                    >
                      Producer :- {movieDetails.producers}
                    </Text>
                  )}
                  <Text
                    style={{
                      color: primaryColor,
                      paddingBottom: 10,
                      fontSize: 18,
                    }}
                  >
                    Opening Crawl :- {movieDetails.openingCrawl}
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      paddingBottom: 10,
                      fontSize: 18,
                    }}
                  >
                    Characters :-{" "}
                    {movieDetails.characterConnection.characters.map((e, i) => {
                      if (
                        i <
                        movieDetails.characterConnection.characters.length - 1
                      ) {
                        return e.name + ", ";
                      } else {
                        return e.name;
                      }
                    })}
                  </Text>
                </View>
              </ScrollView>
            </Screen>
          )}
        </Portal>
      )}
    </View>
  );
}

export default function App(props) {
  const [movies, setMovies] = React.useState([]);
  const [loadingMovies, setLoadingMovies] = React.useState(true);
  const [currMovieId, setCurrMovieId] = React.useState(null);

  function changeCurrMovieId(new_id) {
    setCurrMovieId(new_id);
  }

  const renderMovies = ({ item }) => {
    return <Movie {...item} onPress={() => changeCurrMovieId(item.id)} />;
  };

  React.useEffect(() => {
    getMovies()
      .then((movies) => {
        setMovies(movies.data.allFilms.films);
        setLoadingMovies(false);
      })
      .catch((err) => {
        alert(
          "Unable to load movies, please check your internet connection and try again!"
        );
        BackHandler.exitApp();
      });
  }, [props]);

  return (
    <PaperProvider>
      <View>
        {loadingMovies && (
          <Portal>
            <Loading visible={loadingMovies} />
          </Portal>
        )}
        {!loadingMovies && (
          <SafeAreaView
            style={{
              marginTop: StatusBar.currentHeight || 0,
            }}
          >
            <Text
              style={[
                {
                  color: primaryColor,
                  textAlign: "center",
                  marginTop: 15,
                  marginBottom: 10,
                },
                globalStyles.heading,
              ]}
            >
              Star Wars Movies
            </Text>
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id}
              renderItem={renderMovies}
            />
          </SafeAreaView>
        )}
      </View>
      <Portal>
        <MovieScreen id={currMovieId} onClose={() => setCurrMovieId(null)} />
      </Portal>
    </PaperProvider>
  );
}

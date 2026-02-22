import { useRef, useState } from "react";
import { musicData } from "../Data/musicData";

const Music = ({ cart, setCart }) => {
  const genres = ["pop", "hiphop", "rock", "rnb", "electronic"];

  const scrollRefs = useRef({});
  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  // Add to Cart
  const addToCart = (song) => {
    if (!cart.some((item) => item.id === song.id)) {
      setCart([...cart, song]);
    }
  };

  // Play
  const handlePlay = (song) => {
    if (playingId === song.id) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(song.preview);
    audioRef.current = audio;
    audio.play();
    setPlayingId(song.id);

    setTimeout(() => {
      audio.pause();
      setPlayingId(null);
    }, 20000);
  };

  // Scroll Controls
  const scrollLeft = (genre) => {
    scrollRefs.current[genre]?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = (genre) => {
    scrollRefs.current[genre]?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const heroSong = musicData[0];

  return (
    <div className="music-page">

      {/* ================= HERO ================= */}
      <div
        className="music-hero"
        style={{ backgroundImage: `url(${heroSong.image})` }}
      >
        <div className="music-hero-overlay">
          <h1>{heroSong.title}</h1>
          <p>{heroSong.artist}</p>

          <div className="music-actions">
            <button
              className="play-btn"
              onClick={() => handlePlay(heroSong)}
            >
              {playingId === heroSong.id ? "❚❚" : "▶"}
            </button>

            <button
              className="cart-btn"
              onClick={() => addToCart(heroSong)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ================= GENRE ROWS ================= */}
      {genres.map((genre) => {
        const songs = musicData.filter(
          (song) => song.genre === genre
        );

        return (
          <div key={genre} className="row-section">
            <h2 className="row-title">{genre.toUpperCase()}</h2>

            <div className="row-wrapper">
              <button
                className="scroll-btn left"
                onClick={() => scrollLeft(genre)}
              >
                ◀
              </button>

              <div
                className="music-row"
                ref={(el) => (scrollRefs.current[genre] = el)}
              >
                {songs.map((song) => (
                  <div key={song.id} className="music-card">
                    <img src={song.image} alt={song.title} />

                    <div className="music-details">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                      <p>${song.price}</p>

                      <div className="music-actions">
                        <button
                          className="play-btn"
                          onClick={() => handlePlay(song)}
                        >
                          {playingId === song.id ? "❚❚" : "▶"}
                        </button>

                        <button
                          className="cart-btn"
                          onClick={() => addToCart(song)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="scroll-btn right"
                onClick={() => scrollRight(genre)}
              >
                ▶
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Music;
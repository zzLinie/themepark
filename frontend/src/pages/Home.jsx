import Header from "../components/header";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="hero-container">
      <div class="banner">
          <div class="scrolling-text">
            Welcome to the  Themepark, where every corner is filled with thrills, magic, and excitement! whether you’re seeking adrenaline-pumping rides, immersive experiences, or family-friendly fun, AdventureWorld has something for everyone.
          </div>
        </div>
      </div>
    </div>
  );
}

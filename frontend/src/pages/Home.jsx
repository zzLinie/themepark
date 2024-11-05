import Header from "../components/header";
import "./home.css";
import "./login.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="hero-container">
        <h1>Welcome to The Theme Park</h1>
      </div>
    </div>
  );
}

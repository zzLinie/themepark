import Header from "../components/header";
import DiningCard from "../components/diningCard";
import diningImage from "../assets/images/placeholder-image.webp";

export default function Dining() {
  return (
    <div>
      <Header />
      <h1>Restaurants & Dining</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam porro
        dignissimos dolore dolor maiores. Aut optio rem ipsa nostrum, provident,
        obcaecati assumenda asperiores, eveniet dolore consectetur beatae! Illo,
        fuga nesciunt?
      </p>
      <div>
        <h2>Filter By Dining Type</h2>
        <select name="dining" id="dining">
          <option value="all">All Resturants</option>
          <option value="kids">Mexican Food</option>
          <option value="kids">Italian Food</option>
          <option value="kids">Snacks & Beverages</option>
          <option value="family">Desserts</option>
        </select>
      </div>
      <DiningCard
        diningImage={diningImage}
        diningLocation={"123 santana drive"}
        diningName={"Resturant Name 1"}
        diningProducts={"products here"}
        diningOverview={"burger and fries"}
      />
      <DiningCard
        diningImage={diningImage}
        diningLocation={"123 university lane"}
        diningName={"Resturant Name 2"}
        diningProducts={"products here"}
        diningOverview={"ice cream"}
      />
      <DiningCard
        diningImage={diningImage}
        diningLocation={"123 hospital avenue"}
        diningName={"Resturant Name 3"}
        diningProducts={"products here"}
        diningOverview={"hot dogs"}
      />
    </div>
  );
}

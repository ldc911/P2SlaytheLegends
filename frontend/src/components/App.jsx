import Home from "../pages/Home";
import "../assets/css/App.css";

// random image background
function pic() {
  // http://ddragon.leagueoflegends.com/cdn/img/champion/splash/

  const bgm = [
    "http://i.imgur.com/Z0qJG.png",
    "http://i.imgur.com/AOkCD.png",
    "https://static.planetminecraft.com/files/resource_media/screenshot/1143/2011-10-30_131700_732517.jpg",
  ];
  document.body.style.background = `no-repeat url(${
    bgm[Math.floor(Math.random() * bgm.length)]
  }) `;
}
pic();

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

import Home from "../pages/Home";
import "../assets/css/App.css";
import api from "../services/api";

// random image background
const pic = () => {
  const splashs = [];
  api.getChampions().then((json) => {
    // recupere la liste json
    splashs.push(json.data);
    // met les premiere keys de json dans un array
    const bgm = Object.keys(splashs[0]);
    // Change le style background
    document.body.style.background = `no-repeat fixed url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
      bgm[Math.floor(Math.random() * bgm.length)]
    }_0.jpg) 50% 50% / cover #ffffff`;
  });
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

import "../../assets/css/AboutRiot/Bds.css";

export default function Bds() {
  return (
    <div className="Bds-wiki">
      <section>
        <h1>Les Bandes Dessinées</h1>
        <hr />
        <br />
        <p>
          <a
            href="https://universe.leagueoflegends.com/fr_FR/comic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://universe.leagueoflegends.com/esimages/comicImage__3KEic.png"
              alt="BD Riot games"
            />
          </a>
          Riot a créé un univers complet de bandes dessinées et de récits basés
          autour de chaque champion.
        </p>
        <p>
          Un abonnement à une newsletter permet également de connaitre les
          sorties des dernieres BDs.
        </p>

        <button type="button">Plus d'informations</button>
      </section>
      <hr />
      <br />
    </div>
  );
}

import "../../assets/css/AboutRiot/Bds.css";

export default function Bds() {
  return (
    <div className="Bds-wiki">
      <section>
        <h1>Les Bandes Déssinées</h1>
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
          Riot possèdes aussi tout un univers de bandes déssinées et de récits
          basé autour de chaque champions.
        </p>
        <p>
          Ils ont même une Newsletter à la quelle vous pouvez vous abonner pour
          connaitre les sorties des dernieres BDs.
        </p>

        <button type="button">Plus d'informations</button>
      </section>
      <hr />
      <br />
    </div>
  );
}

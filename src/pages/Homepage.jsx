import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section className="container">
        <h1>
          Você viaja pelo mundo.
          <br />O Explora Mundo acompanha suas aventuras.
        </h1>
        <h2>
          Um mapa-múndi que rastreia seus passos em todas as cidades que você
          possa imaginar. Nunca esqueça suas experiências maravilhosas e mostre
          aos seus amigos como você percorreu o mundo.
        </h2>
        <Link to="/login" className="cta">
          Comece a rastrear agora
        </Link>
      </section>
    </main>
  );
}

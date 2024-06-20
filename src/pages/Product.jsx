import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section className="container">
        <img
          className={styles.productImg}
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>Sobre o Explora Mundo.</h2>
          <p>
            acreditamos que cada viagem é uma nova história esperando para ser
            contada e guardada. Nossa missão é ajudar você a registrar suas
            aventuras de forma prática e emocionante, para que cada momento
            vivido seja lembrado com carinho e detalhes.
          </p>
          <p>
            Junte-se a nós e comece a criar seu diário de viagem hoje mesmo.
            Explore, viva e guarde suas aventuras com o Explora Mundo!
          </p>
        </div>
      </section>
    </main>
  );
}

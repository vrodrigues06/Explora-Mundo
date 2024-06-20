// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section className="container">
        <div>
          <h2>
            Assine por Apenas
            <br />
            R$18 ao Mês!
          </h2>
          <p>
            um serviço completo para documentar suas aventuras. Capture seus
            destinos, compartilhe histórias e crie memórias inesquecíveis. É a
            forma mais fácil de transformar suas viagens em recordações para
            toda a vida.
          </p>
        </div>
        <img
          className={styles.productImg}
          src="img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}

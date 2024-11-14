import { Container } from "react-bootstrap";
import Article from "../components/Article";

export default function Articles() {
   const testArticles = [
      {
          title: "Artikel 1",
          text: "Dies ist der Text für Artikel 1.",
          image: "https://example.com/image1.jpg",
          price: 19.99,
          product_id: "prod_001"
      },
      {
          title: "Artikel 2",
          text: "Dies ist der Text für Artikel 2.",
          image: "https://example.com/image2.jpg",
          price: 29.99,
          product_id: "prod_002"
      },
      {
          title: "Artikel 3",
          text: "Dies ist der Text für Artikel 3.",
          image: "https://example.com/image3.jpg",
          price: 39.99,
          product_id: "prod_003"
      },
      {
          title: "Artikel 4",
          text: "Dies ist der Text für Artikel 4.",
          image: "https://example.com/image4.jpg",
          price: 49.99,
          product_id: "prod_004"
      },
      {
          title: "Artikel 5",
          text: "Dies ist der Text für Artikel 5.",
          image: "https://example.com/image5.jpg",
          price: 59.99,
          product_id: "prod_005"
      }
   ];

   return (
      <Container>
         {testArticles.map(article => <Article data={article} key={article.product_id} />)}
      </Container>
   );
}
import { Card, Container } from 'react-bootstrap';

export default function Article({ data }) {
   return (
      <Card>
         <Card.Img src='../logo.svg' />
         <Card.Title>{data.title}</Card.Title>
         <Card.Text>{data.text}</Card.Text>
      </Card>
   );
}
import { Card, Container } from 'react-bootstrap';

export default function Article({ data }) {
   return (
      <Card className='product p-lg-4 p-md-3 p-2'>
         <Card.Img className='p-1' src="2922280_27002.jpg" />
         <Card.Title>{data.title}</Card.Title>
         <Card.Text>{data.text}</Card.Text>
      </Card>
   );
}
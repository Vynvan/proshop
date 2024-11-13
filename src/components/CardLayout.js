import { Children, cloneElement, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

function CardLayout({ children, asDiv, childrenAsArticle }) {
   // Verwandle die Kinder in ein Array, falls es nur ein Kind ist
   const childrenArray = Children.toArray(children);
   const [visibleChildren, setVisibleChildren] = useState({});

   useEffect(() => {
      if (childrenArray.length > 0) {
         // Setze den Sichtbarkeitsstatus für jedes Kind
         const newVisibleChildren = {};
         childrenArray.forEach((_, index) => {
            if (visibleChildren[index] === undefined) {
               newVisibleChildren[index] = true;
            }
         });
         setVisibleChildren(prev => ({ ...prev, ...newVisibleChildren }));
      }
   }, [childrenArray]);

   return (
      <Container as={asDiv ? 'div' : 'main'} className='flex-grow-1'>
         {childrenArray.map((child, index) => (
            visibleChildren[index] !== false && 
            <Card
               as={childrenAsArticle ? 'article' : 'section'}
               className="mb-5 justify-content-center text-start shadow"
               key={index}>
               {cloneElement(child, {
                  setVisible: value => setVisibleChildren(prev => ({ ...prev, [index]: value }))
               })}
            </Card>
         ))}
      </Container>
   );
}

export default CardLayout;

import { Children, cloneElement, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

/**
 * @module Components
 */

/**
 * CardLayout component that arranges its children within a Bootstrap Container.
 * Each child is wrapped in a Card component, and visibility of each child can be controlled.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Card components.
 * @param {boolean} [props.asDiv=false] - Determines if the Container should be rendered as a 'div' instead of the default 'main'.
 * @param {boolean} [props.childrenAsArticle=false] - Determines if each Card should be rendered as an 'article' instead of the default 'section'.
 * @returns {JSX.Element} The rendered CardLayout component.
 */
function CardLayout({ children, asDiv, childrenAsArticle }) {
   const childrenArray = Children.toArray(children);
   const [visibleChildren, setVisibleChildren] = useState({});

   useEffect(() => {
      if (childrenArray.length > 0) {
         const newVisibleChildren = {};
         childrenArray.forEach((_, index) => {
            if (visibleChildren[index] === undefined) {
               newVisibleChildren[index] = true;
            }
         });
         setVisibleChildren(prev => ({ ...prev, ...newVisibleChildren }));
      }
   }, [children]);

   return (
      <Container as={asDiv ? 'div' : 'main'} className='flex-grow-1'>
         {childrenArray.map((child, index) => (
            visibleChildren[index] !== false && 
            <Card as={childrenAsArticle ? 'article' : 'section'} 
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

import { Card, Row } from 'react-bootstrap';

/**
 * @module Components
 */

/**
 * A common footer component to hold the copyright and for the web nessesary links.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function Footer() {
   return (
      <Card as="footer" className="mt-4 px-5 py-4 bg-white shadow complete-width">
         <Row className="align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto">
                  <div className="small m-0">Copyright &copy; Matthias Arndt 2024</div>
            </div>
            <div className="col-auto">
                  <a className="small" href="#!">Privacy</a>
                  <span className="mx-1">&middot;</span>
                  <a className="small" href="#!">Terms</a>
                  <span className="mx-1">&middot;</span>
                  <a className="small" href="#!">Contact</a>
            </div>
         </Row>
      </Card>
   );
}

export default Footer;

import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavigationTabs.css";

export default function NavigationTabs(props) {
  return (
    <>
      <Nav defaultActiveKey={props.defaultActiveKey}>
        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/companies"
        >
          <Nav.Item>
            <Nav.Link href="/companies">Companies</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/deals"
        >
          <Nav.Item>
            <Nav.Link href="/deals">Deals</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/dashboard"
        >
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
    </>
  );
}

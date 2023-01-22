import styled from "styled-components";
import Widget from "./Widget";

function Logo() {
  return (
    <Container>
      <ProductName>R E V I B I N G</ProductName>
    </Container>
  );
}

const Container = styled(Widget)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 15px;
`;

const ProductName = styled.div`
  color: white;
  font-size: 48px;
`;

export default Logo;

import styled from "styled-components";
import Widget from "./Widget";

function Logo() {
  return (
    <Container>
      <ProductName>
        REVIBING
        <With>x</With>
        <Center>
          <img src="https://www.google.com/logos/doodles/2023/lunar-new-year-2023-6753651837109569.2-s.png" />
        </Center>
      </ProductName>
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

const With = styled.div`
  font-size: 30px;
  margin-left: 20px;
  color: ${(props) => props.theme.widget.colour.subText};
`;

const ProductName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 20px;
`;

export default Logo;

import styled from "styled-components";
import Widget from "./Widget";

function Logo() {
  return (
    <Container>
      <ProductName>
        <Name>
          <div className="center">
            <h1>
              <span>Revibing</span>
              <span>Revibing</span>
              <span>Revibing</span>
            </h1>
          </div>
        </Name>
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

const Name = styled.div`
  position: relative;
  width: 180px;

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: prespective(1000px) translate(-50%, -50%);
    transform: skewY(15deg);
    transition: 0.5s;
  }

  .center:hover {
    transform: prespective(1000px) translate(-50%, -50%);
    transform: skewY(0deg);
  }

  .center h1 span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 40px;
    color: #fff;
    transform-style: preserve-3d;
    transition: 0.8s;
  }
  .center h1 span:nth-child(1) {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  .center h1 span:nth-child(2) {
    color: #5e17eb;
    transform: translate(-50%, -50%) skewX(-60deg);
    left: -5px;
    clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
  }

  .center h1 span:nth-child(3) {
    transform: translate(-50%, -50%) skewY(0deg);
    left: -10px;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }

  .center:hover h1 span:nth-child(2),
  .center:hover h1 span:nth-child(3) {
    transform: translate(-50%, -50%) skewX(0deg);
    left: 0;
    color: #fff;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 20px;
`;

export default Logo;

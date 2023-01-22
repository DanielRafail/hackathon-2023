import styled from "styled-components";

type IProps = {
  children?: React.ReactNode;
  className?: string;
};

function Widget(props: IProps) {
  const { children, className } = props;

  return <Container className={className}>{children}</Container>;
}

const Container = styled.div`
  background: ${(props) => props.theme.widget.colour.background};
  border-radius: 15px;
  color: ${(props) => props.theme.widget.colour.mainText};
`;

export default Widget;

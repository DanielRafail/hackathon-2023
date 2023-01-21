import styled from "styled-components";

type IProps = {
    children?: React.ReactNode
    className?: string
}

function Header(props: IProps) {
    const { children, className } = props;

    return (
        <Container className={className}>
            {children}
        </Container>
    );
}

const Container = styled.div`
    font-size: 28px;
`

export default Header;

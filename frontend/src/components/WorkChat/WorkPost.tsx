import styled from "styled-components";

export type IWorkPost = {
    id: string,
    userIcon: string,
    userName: string,
    time: string,
    postText: string,
    images: string[],
    channel: string
}

function Post(props: IWorkPost) {
    const { userIcon, userName, time, postText, images, channel } = props;

    return (
        <Container>
            <UserIcon src={userIcon}/>
            <Content>
                <Details>
                    <User>
                        <div>{userName} <InChannel>#{channel}</InChannel></div>
                    </User>
                    <Time>{time}</Time>
                </Details>
                <PostText>{postText}</PostText>
                {
                    images.map(x => <PostedImage src={x}/>)
                }
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    font-size: 16px;
    column-gap: 20px;
    padding-right: 10px;
    width: 100%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 100%;
`

const Details = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`

const PostedImage = styled.img`
    border-radius: 5px;
    max-width: calc(100% - 1px);
`

const PostText = styled.div`
    color: ${props => props.theme.widget.colour.subText};
`

const UserIcon = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`

const Time = styled.div`
    font-size: 14px;
`

const User = styled.div`
    
`

const InChannel = styled.span`
    color: ${props => props.theme.widget.colour.subSubText};
    font-size: 14px;
`

export default Post;
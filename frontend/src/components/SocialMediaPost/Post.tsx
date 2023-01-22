import { Heart, MessageCircle, Repeat, ThumbsUp, Twitter } from "react-feather";
import styled from "styled-components";

export type IPost = {
    id: string,
    userIcon: string,
    userName: string,
    userHandler: string,
    time: string,
    postText: string,
    numberOfComments: string,
    numberOfShares: string,
    numberOfLikes: string,
    images: string[],
    source: string
}

function Post(props: IPost) {
    const { userIcon, userName, userHandler, time, postText, numberOfComments, numberOfLikes, numberOfShares, images, source  } = props;

    let stats:any = "";
    let icon:any = "";

    if (source === "Twitter") {
        
        stats = <Stats>
            <TwitterStat>
                <MessageCircle size={16}/>
                {numberOfComments}
            </TwitterStat>
            <TwitterStat>
                <Repeat size={16}/>
                {numberOfShares}
            </TwitterStat>
            <TwitterStat>
                <Heart size={16}/>
                {numberOfLikes}
            </TwitterStat>
        </Stats>;

        icon = <Twitter size={16}/>
    } else if (source === "Reddit") {
        stats = <Stats>
            <TwitterStat>
                <MessageCircle size={16}/>
                {numberOfComments}
            </TwitterStat>
            <TwitterStat>
                <ThumbsUp size={16}/>
                {numberOfLikes}
            </TwitterStat>
        </Stats>;
    }

    return (
        <Container>
            <UserIcon src={userIcon}/>
            <Content>
                <Details>
                    <User>
                        <div>{userName}</div>
                        <UserHandle>{userHandler}</UserHandle>
                    </User>
                    <Time>{time}</Time>
                </Details>
                <div>{postText}</div>
                {
                    images.map(x => <PostedImage src={x}/>)
                }
                <Footer>
                    {stats}
                    <div>{source}</div>
                </Footer>
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
    row-gap: 15px;
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

const UserHandle = styled.div`
    font-size: 14px;
    color: ${props => props.theme.widget.colour.subText};
`

const Stats = styled.div`
    display: flex;
    column-gap: 15px;
`

const Footer = styled.div`
    align-items: center;
    color: ${props => props.theme.widget.colour.subText};
    display: flex;
    justify-content: space-between;
    font-size: 14px;
`

const TwitterStat = styled.div`
    align-items: center;
    column-gap: 4px;
    display: flex;
`

export default Post;
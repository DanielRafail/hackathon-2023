import styled from "styled-components";

export type IWorkPost = {
    id: string,
    userIcon: string,
    userName: string,
    time: string,
    postText: string,
    images: string[]
}

function Post(props: IWorkPost) {
    const { userIcon, userName, time, postText, images } = props;

    return (
        <Container>
            <UserIcon src={userIcon}/>
            <Content>
                <Details>
                    <User>
                        <div>{userName}</div>
                    </User>
                    <Time>{time}</Time>
                </Details>
                <div>{postText}</div>
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

export default Post;
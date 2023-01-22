import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import Post, { IPost } from "./Post";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useEffect, useState } from "react";

type IProps = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
}

function SocialMedia(props: IProps) {
    const { socket } = props;    
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        if (socket) {
            socket.on("SocialMediaPost", (data: IPost[]) => {
                console.log(data);
                setPosts([...posts, ...data]);
            });
        }
    }, [socket]);


    return (
        <Container>
            <Header>Social Feeds</Header>
            <PostContainer>
                <Posts>
                    {posts.map(x => <Post key={x.id} {...x}/>)}
                </Posts>
            </PostContainer>
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
`

const PostContainer = styled.div`
    overflow-y: auto;

    /* width */
    ::-webkit-scrollbar {
    width: 3px;
    margin-left: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: ${props => props.theme.calendar.events.colour.background}
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`

export default SocialMedia;
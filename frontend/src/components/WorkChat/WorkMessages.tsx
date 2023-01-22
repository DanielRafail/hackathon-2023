import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import WorkPost, { IWorkPost } from "./WorkPost";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useEffect, useState } from "react";

type IProps = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
}

function WorkMessages(props: IProps) {
    const { socket } = props;
    const [posts, setPosts] = useState<IWorkPost[]>([]);

    useEffect(() => {
        if (socket) {
            socket.on("WorkMessage", (data: IWorkPost[]) => {
                const newPostValue = posts;
                data.forEach(item => {
                    if(item.postText.toLowerCase().includes("#workfromhome")){
                        item.images = []
                    }
                    newPostValue.push((item))
                });
                setPosts([...newPostValue]);
            });
        }
    }, [socket]);

    return (
        <Container>
            <Header>Discord Messages</Header>
            <PostContainer>
                <Posts>
                    {posts.map(x => <WorkPost key={x.id} {...x} />)}
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
    flex-direction: column-reverse;
    row-gap: 15px;
`

export default WorkMessages;
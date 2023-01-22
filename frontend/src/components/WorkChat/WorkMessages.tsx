import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import WorkPost, { IWorkPost } from "./WorkPost";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useEffect, useState } from "react";
import FallingEmojis from "./emojis.jsx"
import React from "react";

type IProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
};

function WorkMessages(props: IProps) {
    const { socket } = props;
    const [posts, setPosts] = useState<IWorkPost[]>([]);
    const [emojis, setEmojis] = useState(false)

    useEffect(() => {
        if (socket) {
            socket.on("WorkMessage", (data: IWorkPost[]) => {
                data.map((x, i) => {
                    const hasEmoji = /\p{Emoji}/u.test(x.postText)
                    if (hasEmoji && !emojis) {
                        setEmojis(true);
                        window.setTimeout(function () {
                            setEmojis(false);
                        }, 3500);
                    }
                    return null
                })

                const newPostValue = posts;
                data.forEach(item => newPostValue.push((item)));
                setPosts([...newPostValue]);
            });
        }
    }, [socket]);

    return (
        <Container>
            <Header>Discord Messages</Header>
            <PostContainer id="discord-container">
                {emojis ? <FallingEmojis /> : <React.Fragment />}
                <Posts>
                    {posts.map((x, i) => <WorkPost key={i} {...x} />)}
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
  grid-row: 6 / 11;
`;

const PostContainer = styled.div`
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
    margin-left: 20px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.calendar.events.colour.background};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column-reverse;
  row-gap: 15px;
`;

export default WorkMessages;

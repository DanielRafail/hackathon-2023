import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import Post, { IPost } from "./Post";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createRef, useEffect, useState } from "react";

type IProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
};

function SocialMedia(props: IProps) {
  const { socket } = props;
  const [posts, setPosts] = useState<IPost[]>([]);

  const container = createRef();

  const Scroll = (previousHeight: number) => {
    const instance = container.current as any;
    let height: number = instance.scrollTop + 1;
    instance.scrollTop = height;

    if (instance.scrollTop == previousHeight && previousHeight >= 1) {
      instance.scrollTop = 0;
    }

    setTimeout(() => Scroll(instance.scrollTop), 200);
  };

  useEffect(() => {
    setTimeout(() => Scroll(-100), 150);
  }, [container]);

  useEffect(() => {
    if (socket) {
      socket.on("SocialMediaPost", (data: IPost[]) => {
        const newPostValue = posts;
        data.forEach((item) => newPostValue.push(item));
        setPosts([...newPostValue]);
      });
    }
  }, [socket]);

  return (
    <Container>
      <Header>Social Feeds</Header>
      <PostContainer ref={container as any}>
        <Posts>
          {posts.map((x, i) => (
            <Post key={i} {...x} />
          ))}
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
  grid-row: 2 / 11;
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
  flex-direction: column;
  row-gap: 15px;
`;

export default SocialMedia;

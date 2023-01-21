import styled from "styled-components";
import Widget from "../Widget";
import Header from "../Header";
import Post from "./Post";


type IProps = {

}

function SocialMedia(props: IProps) {
    const {  } = props;

    return (
        <Container>
            <Header>Social Feeds</Header>
            <PostContainer>
                <Posts>
                    {posts.map(x => <Post key={x.userName + x.time} {...x}/>)}
                </Posts>
            </PostContainer>
        </Container>
    );
}

const posts = [{
    userIcon: "https://scontent.fyhu1-1.fna.fbcdn.net/v/t1.6435-1/56931901_2368123013212582_2495977440426328064_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5VBpRjX7EWsAX8OtGpt&_nc_ht=scontent.fyhu1-1.fna&oh=00_AfDczjdr9xQk8hTXCVW1w5RsN9eRMbXW5AYsD2GmrG99xQ&oe=63F3CF3E",
    userName: "Markese Brown",
    userHandler: "@markeseBrown",
    time: "12 min",
    postText: "The new Iphone 16 is out which means its time for my new review!!! Please check it out now on my youtube page and give your feedback!",
    numberOfComments: "12",
    numberOfShares: "3",
    numberOfLikes: "18",
    images: ["https://pbs.twimg.com/media/Fm32CldXwAMVutA?format=jpg&name=small"],
    source: "Twitter"
},
{
    userIcon: "https://scontent.fyhu1-1.fna.fbcdn.net/v/t1.6435-1/56931901_2368123013212582_2495977440426328064_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=5VBpRjX7EWsAX8OtGpt&_nc_ht=scontent.fyhu1-1.fna&oh=00_AfDczjdr9xQk8hTXCVW1w5RsN9eRMbXW5AYsD2GmrG99xQ&oe=63F3CF3E",
    userName: "Markese Brown",
    userHandler: "@markeseBrown",
    time: "12 min",
    postText: "The new Iphone 16 is out which means its time for my new review!!! Please check it out now on my youtube page and give your feedback!",
    numberOfComments: "12",
    numberOfShares: "3",
    numberOfLikes: "18",
    images: [],
    source: "Twitter"
},
];

const Container = styled(Widget)`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    height: 800px;   
    padding: 15px;
    width: 500px;
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
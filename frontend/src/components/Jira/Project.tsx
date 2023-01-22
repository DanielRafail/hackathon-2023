import styled from "styled-components";

export type IMilestone = {
  description: string;
  id: string;
  issuesCount: number;
  issuesUnresolvedCount: number;
  name: string;
  overdue: boolean;
  releaseDate: string;
};

type ProgressStatus = "good" | "warning" | "alert";

function Project(props: {
  name: string;
  avatarUrls: any;
  milestone: IMilestone;
}) {
  const { name, avatarUrls, milestone } = props;
  const width =
    100 - (milestone.issuesUnresolvedCount / milestone.issuesCount) * 100;

  let progressStatus: ProgressStatus = "good";

  if (width < 33) {
    progressStatus = "alert";
  } else if (width < 66) {
    progressStatus = "warning";
  }

  return (
    <Container>
      <Information>
        <Name>
          <img
            src={avatarUrls["16x16"]}
            width="16"
            height={"16"}
            style={{ margin: "0.5rem", marginLeft: 0 }}
          ></img>{" "}
          {name} / {milestone.name}{" "}
        </Name>
        <DateAndCircle>
          <EndDate>Target: {milestone.releaseDate}</EndDate>
        </DateAndCircle>
      </Information>
      <Description>{milestone.description}</Description>
      <Track>
        <Text>{`${milestone.issuesCount - milestone.issuesUnresolvedCount}/${
          milestone.issuesCount
        } (${width}%)`}</Text>
        <Progress statusColour={progressStatus} width={width + "%"}></Progress>
      </Track>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.div`
  align-items: center;
  display: flex;
`;

const DateAndCircle = styled.div`
  align-items: center;
  display: flex;
  column-gap: 2px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.widget.colour.subText};
  font-size: 16px;
`;

const Circle = styled.div<{ statusColour: ProgressStatus }>`
  background: ${(props) => props.theme.jira.project.colour[props.statusColour]};
  box-shadow: 0px 0px 4px 1px
    ${(props) => props.theme.jira.project.colour[props.statusColour]};
  border-radius: 100px;
  height: 10px;
  width: 10px;
  padding: 4px;
`;

const EndDate = styled.div`
  border-radius: 5px;
  color: ${(props) => props.theme.widget.colour.subText};
  font-size: 16px;
  padding: 4px;
`;

const Text = styled.div`
  position: absolute;
  font-size: 14px;
  top: 4px;
  left: 45%;
  z-index: 4;
`;

const Track = styled.div`
  align-items: center;
  background: ${(props) => props.theme.main.colour.background};
  border-radius: 10px;
  height: 25px;
  justify-content: center;
  margin: 0px 5px;
  position: relative;
  width: calc(100% - 5px);
`;

const Progress = styled.div<{
  statusColour: "good" | "warning" | "alert";
  width: string;
}>`
  background: ${(props) => props.theme.jira.project.colour[props.statusColour]};
  box-shadow: 0px 0px 5px 1px
    ${(props) => props.theme.jira.project.colour[props.statusColour]};
  position: absolute;
  height: 25px;
  border-radius: 10px;
  width: ${(props) => props.width};
  top: 0px;
`;

export default Project;

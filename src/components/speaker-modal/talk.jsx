import React from 'react';
import styled, { withTheme } from 'styled-components';

import {
  DownloadIcon,
  WatchIcon
} from '../icons';


const TalkContainer = styled.li`
`;

const Title = styled.div`
  font-family: Rubik, Arial, sans-serif;
  font-size: 24px;
  line-height: 36px;
  color: #545454;
`;

const MediaMaterials = styled.div`
  margin-top: 13px;
`;

const Link = styled.div`
  display: inline-block;
  vertical-align: bottom;
  font-family: Oxygen, Arial, sans-serif;
  font-size: 18px;
  line-height: 18px;
  color: #909090;
  margin-right: 36px;
`;

const Text = styled.span`
  margin-left: 12px;
`;



const Talk = (props) =>
  <TalkContainer>
    <Title>{props.title}</Title>
    <MediaMaterials>
      <Link><WatchIcon width="25" /><Text>Video</Text></Link>
      <Link><DownloadIcon width="14" height="18" /><Text>Presentation</Text></Link>
    </MediaMaterials>
  </TalkContainer>

export default Talk;
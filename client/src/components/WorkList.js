import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const WorkList = () => {
  return (
    <div>
      <Segment.Group>
        <Segment>Lista de Projectos</Segment>
        <Segment.Group>
          <List divided animated selection verticalAlign='middle'>
            <List.Item>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                <List.Description as='a'>Updated 10 mins ago</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                <List.Description as='a'>Updated 10 mins ago</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment.Group>
      </Segment.Group>
    </div>
  );
};

export default WorkList;

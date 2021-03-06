import * as React from 'react';
import {
  Button,
  Container,
  Label,
  List,
  Segment,
  Transition
} from 'semantic-ui-react';
import Card from './Card';

interface Props {
  clearScore: () => void;
  stats: [
    {
      winner: string;
      gameNumber: number;
      totalMoves: number;
      boxOrder: [number];
    }
  ];
}

interface State {
  active: string;
  filteredList: [object];
}

class ScoreCard extends React.Component<Props, State> {
  // default active state
  public state = {
    active: 'Total Games',
    filteredList: this.props.stats
  };

  public filterList = (stats, content) => {
    if (content === 'Total Games') {
      return stats;
    }
    if (content === 'Draws') {
      return stats.filter(x => x.winner === 'draw');
    }
    if (content === 'X Wins') {
      return stats.filter(x => x.winner === 'X');
    }
    if (content === 'O Wins') {
      return stats.filter(x => x.winner === 'O');
    }
    return stats;
  };

  public activeChange = (e, { content }) => {
    const { stats } = this.props;
    const list = this.filterList(stats, content);
    this.setState({
      active: content,
      filteredList: list
    });
  };

  public render() {
    return (
      <Card>
        <Container textAlign="center">
          <h2>Score Card</h2>
          <Segment basic textAlign="center">
            <Button onClick={this.props.clearScore}>Clear Score</Button>
          </Segment>

          <Label.Group>
            <Label
              as="a"
              content="Total Games"
              detail={this.props.stats.length || 0}
              color={this.state.active === 'Total Games' ? 'blue' : null}
              onClick={this.activeChange}
            />
            <Label
              as="a"
              content="Draws"
              detail={
                this.props.stats.filter(x => x.winner === 'draw').length || 0
              }
              color={this.state.active === 'Draws' ? 'blue' : null}
              onClick={this.activeChange}
            />
            <Label
              as="a"
              content="X Wins"
              detail={
                this.props.stats.filter(x => x.winner === 'X').length || 0
              }
              color={this.state.active === 'X Wins' ? 'blue' : null}
              onClick={this.activeChange}
            />
            <Label
              as="a"
              content="O Wins"
              detail={
                this.props.stats.filter(x => x.winner === 'O').length || 0
              }
              color={this.state.active === 'O Wins' ? 'blue' : null}
              onClick={this.activeChange}
            />
          </Label.Group>
        </Container>

        <Transition.Group
          duration={200}
          as={List}
          celled
          verticalAlign="middle"
          animated
        >
          {Object.entries(
            this.filterList(this.props.stats, this.state.active)
          ).map((value, key) => (
            <List.Item key={key}>
              <ScoreCardItem {...value[1]} gameNumber={Number(value[0]) + 1} />
            </List.Item>
          ))}
        </Transition.Group>

        <Segment basic textAlign="center">
          <Button onClick={this.props.clearScore}>Clear Score</Button>
        </Segment>
      </Card>
    );
  }
}

const ScoreCardItem = props => (
  <List.List>
    <List.Content>
      <List.Item>
        Game:
        {props.gameNumber}
      </List.Item>
      <List.Item>
        Total Moves:
        {props.totalMoves}
      </List.Item>
      <List.Item>Board Order: {props.boxOrder}</List.Item>
      <List.Item>
        Winner:
        {props.winner}
      </List.Item>
      <button onClick={() => props.scoreClicked(props.boxOrder)}>board</button>
    </List.Content>
  </List.List>
);

export default ScoreCard;

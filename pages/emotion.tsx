import { css } from '@emotion/css';
import { Animated, Basic, bounce, Combined } from '../shared/styles';

const Home = () => (
  <div>
    <Basic>Cool Styles</Basic>
    <Combined>
      With <code>:hover</code>.
    </Combined>
    <Animated animation={bounce}>Let's bounce.</Animated>
    <div className={css`
      background-color: lightblue; margin: 8px; height: 10px;
    `}>
      <h3>Hi</h3>
    </div>
  </div>
);

export default Home;
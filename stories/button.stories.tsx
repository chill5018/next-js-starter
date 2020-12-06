import React from 'react';
import { Button } from '@storybook/react/demo';

export default {
  argTypes: { onClick: { action: 'clicked' } },
  title: 'Button',
};

const TemplateWithText = args => <Button {...args}>Hello Button</Button>;

const TemplateWithEmoji = args => (
  <Button {...args}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withText = TemplateWithText.bind({});

withText.args = {};

export const withSomeEmoji = TemplateWithEmoji.bind({});

withSomeEmoji.args = {};

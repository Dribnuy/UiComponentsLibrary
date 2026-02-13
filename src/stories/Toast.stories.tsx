import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastContainer } from '../components/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to display in the toast',
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type of toast notification',
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Auto dismiss duration in milliseconds (0 = no auto dismiss)',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    show: {
      control: 'boolean',
      description: 'Show or hide the toast',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <ToastContainer position="bottom-right">
          <Story />
        </ToastContainer>
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully!',
    type: 'success',
    show: true,
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    message: 'Failed to save changes. Please try again.',
    type: 'error',
    show: true,
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    message: 'Your session will expire in 5 minutes.',
    type: 'warning',
    show: true,
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    message: 'New updates are available for your application.',
    type: 'info',
    show: true,
    duration: 0,
  },
};

export const AutoDismiss3s: Story = {
  args: {
    message: 'This notification will disappear in 3 seconds',
    type: 'info',
    show: true,
    duration: 3000,
  },
};

export const AutoDismiss5s: Story = {
  args: {
    message: 'This notification will disappear in 5 seconds',
    type: 'success',
    show: true,
    duration: 5000,
  },
};

export const WithoutCloseButton: Story = {
  args: {
    message: 'This notification cannot be manually closed',
    type: 'info',
    show: true,
    closable: false,
    duration: 0,
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a longer notification message that demonstrates how the toast component handles multiple lines of text gracefully with proper spacing and alignment.',
    type: 'warning',
    show: true,
    duration: 0,
  },
};

export const Interactive: Story = {
  args: {
    message: '',
  },
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <button
          onClick={() => setShow(true)}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Show Toast
        </button>
        <Toast
          message="You clicked the button!"
          type="success"
          show={show}
          duration={3000}
          onClose={() => setShow(false)}
        />
      </div>
    );
  },
};

export const MultipleToasts: Story = {
  args: {
    message: '',
  },
  render: () => {
    const [toasts, setToasts] = useState([
      { id: 1, show: true },
      { id: 2, show: true },
      { id: 3, show: true },
    ]);

    return (
      <div>
        <Toast
          message="First notification - Success!"
          type="success"
          show={toasts[0]?.show}
          duration={0}
          onClose={() => {
            const newToasts = [...toasts];
            newToasts[0].show = false;
            setToasts(newToasts);
          }}
        />
        <Toast
          message="Second notification - Info"
          type="info"
          show={toasts[1]?.show}
          duration={0}
          onClose={() => {
            const newToasts = [...toasts];
            newToasts[1].show = false;
            setToasts(newToasts);
          }}
        />
        <Toast
          message="Third notification - Warning"
          type="warning"
          show={toasts[2]?.show}
          duration={0}
          onClose={() => {
            const newToasts = [...toasts];
            newToasts[2].show = false;
            setToasts(newToasts);
          }}
        />
      </div>
    );
  },
};
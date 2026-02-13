import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel'],
    },
    clearable: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    success: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

export const PasswordWithValue: Story = {
  args: {
    label: 'Password',
    type: 'password',
    defaultValue: 'supersecret123',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    clearable: true,
    defaultValue: 'React components',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    clearable: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    success: true,
    defaultValue: 'johndoe123',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    fullWidth: true,
    clearable: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot edit this',
    disabled: true,
    defaultValue: 'Read only value',
  },
};

export const AllFeatures: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    clearable: true,
    defaultValue: 'mypassword123',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};



export const HookFormExample = {
  render: () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: { email: '' }
    });

    const onSubmit = (data: any) => alert(JSON.stringify(data));

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Email (Validation)"
          placeholder="test@example.com"
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
          })}
          error={errors.email?.message}
        />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Submit</button>
      </form>
    );
  }
};
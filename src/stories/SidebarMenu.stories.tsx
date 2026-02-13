import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, User, Settings, Folder, FileText, Smartphone, Monitor, Tablet, ShirtIcon, Users } from 'lucide-react';
import { SidebarMenu, MenuItem } from '../components/SidebarMenu';

const meta = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const simpleItems: MenuItem[] = [
  { id: '1', label: 'Home', icon: <Home size={20} />, href: '/' },
  { id: '2', label: 'Profile', icon: <User size={20} />, href: '/profile' },
  { id: '3', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
];

const nestedItems: MenuItem[] = [
  { id: '1', label: 'Home', icon: <Home size={20} />, href: '/' },
  {
    id: '2',
    label: 'Projects',
    icon: <Folder size={20} />,
    children: [
      { id: '2-1', label: 'Web Development', icon: <FileText size={20} />, href: '/projects/web' },
      { id: '2-2', label: 'Mobile Apps', icon: <FileText size={20} />, href: '/projects/mobile' },
      { id: '2-3', label: 'Design Systems', icon: <FileText size={20} />, href: '/projects/design' },
    ],
  },
  {
    id: '3',
    label: 'Settings',
    icon: <Settings size={20} />,
    children: [
      { id: '3-1', label: 'Profile', href: '/settings/profile' },
      { id: '3-2', label: 'Security', href: '/settings/security' },
      { id: '3-3', label: 'Notifications', href: '/settings/notifications' },
    ],
  },
];

const deeplyNestedItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: <Home size={20} />, href: '/' },
  {
    id: '2',
    label: 'Products',
    icon: <Folder size={20} />,
    children: [
      {
        id: '2-1',
        label: 'Electronics',
        children: [
          { id: '2-1-1', label: 'Computers', icon: <Monitor size={20} />, href: '/products/electronics/computers' },
          { id: '2-1-2', label: 'Phones', icon: <Smartphone size={20} />, href: '/products/electronics/phones' },
          { id: '2-1-3', label: 'Tablets', icon: <Tablet size={20} />, href: '/products/electronics/tablets' },
        ],
      },
      {
        id: '2-2',
        label: 'Clothing',
        children: [
          { id: '2-2-1', label: 'Men', icon: <ShirtIcon size={20} />, href: '/products/clothing/men' },
          { id: '2-2-2', label: 'Women', icon: <ShirtIcon size={20} />, href: '/products/clothing/women' },
          { id: '2-2-3', label: 'Kids', icon: <Users size={20} />, href: '/products/clothing/kids' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Account',
    icon: <User size={20} />,
    children: [
      { id: '3-1', label: 'Profile', href: '/account/profile' },
      { id: '3-2', label: 'Orders', href: '/account/orders' },
      { id: '3-3', label: 'Wishlist', href: '/account/wishlist' },
    ],
  },
];

export const Simple: Story = {
  args: {
    items: simpleItems,
    isOpen: true,
    onClose: () => {},
    title: "Navigation",
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          Open Menu
        </button>
        <SidebarMenu items={simpleItems} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Navigation" />
      </div>
    );
  },
};

export const WithNestedItems: Story = {
  args: {
    items: nestedItems,
    isOpen: true,
    onClose: () => {},
    title: "Menu",
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          Open Menu
        </button>
        <SidebarMenu items={nestedItems} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Menu" />
      </div>
    );
  },
};

export const DeeplyNested: Story = {
  args: {
    items: deeplyNestedItems,
    isOpen: true,
    onClose: () => {},
    title: "E-Commerce",
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          Open Menu
        </button>
        <SidebarMenu
          items={deeplyNestedItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="E-Commerce"
        />
      </div>
    );
  },
};

export const CustomWidth: Story = {
  args: {
    items: nestedItems,
    isOpen: true,
    onClose: () => {},
    title: "Wide Menu",
    width: 400,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          Open Menu
        </button>
        <SidebarMenu
          items={nestedItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Wide Menu"
          width={400}
        />
      </div>
    );
  },
};


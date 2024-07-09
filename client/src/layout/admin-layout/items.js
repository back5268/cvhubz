import { Squares2X2Icon, AcademicCapIcon, PresentationChartBarIcon, UsersIcon, CircleStackIcon, Cog6ToothIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const icons = {
  Squares2X2Icon,
  AcademicCapIcon,
  PresentationChartBarIcon,
  UsersIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon
};

export const items = [
  { label: 'Dashboard', icon: icons.Squares2X2Icon, type: 'item', route: '' },
  { label: 'Quản lý công ty', icon: icons.PresentationChartBarIcon, type: 'item', route: '/companies' },
  { label: 'Quản lý người dùng', icon: icons.UsersIcon, type: 'item', route: '/users' },
  { label: 'Quản lý vị trí', icon: icons.CircleStackIcon, type: 'item', route: '/locations' },
  { label: 'Quản lý danh mục', icon: icons.CircleStackIcon, type: 'item', route: '/categories' },
  { label: 'Quản lý công việc', icon: icons.PaperAirplaneIcon, type: 'item', route: '/jobs' },
  { label: 'Quản lý mẫu CV', icon: icons.Cog6ToothIcon, type: 'item', route: '/templates' },
  { label: 'Danh sách ứng tuyển', icon: icons.PaperAirplaneIcon, type: 'item', route: '/job-registers' },
];

import { Categories, Compamies, Dashboard, JobRegister, Jobs, Locations, Templates, Users } from '@view/admin';
import { SignIn, SignUp } from '@view/auth';
import { About, Home, Job, WebCompanies, WebTemplates } from '@view/web';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },

  { path: '/', element: Home, public: true, layout: 'web' },
  { path: '/companies', element: WebCompanies, public: true, layout: 'web' },
  { path: '/templates', element: WebTemplates, public: true, layout: 'web' },
  { path: '/about', element: About, public: true, layout: 'web' },
  { path: '/jobs/:slug', element: Job, public: true, layout: 'web' },

  { path: '/admin', element: Dashboard, layout: 'admin' },
  { path: '/admin/users', element: Users, layout: 'admin' },
  { path: '/admin/companies', element: Compamies, layout: 'admin' },
  { path: '/admin/locations', element: Locations, layout: 'admin' },
  { path: '/admin/categories', element: Categories, layout: 'admin' },
  { path: '/admin/jobs', element: Jobs, layout: 'admin' },
  { path: '/admin/templates', element: Templates, layout: 'admin' },
  { path: '/admin/job-registers', element: JobRegister, layout: 'admin' },
];

export default routes;

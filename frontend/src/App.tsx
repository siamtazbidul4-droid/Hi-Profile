import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { ServicesPage } from './pages/ServicesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

// Admin Pages
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminProfileManager } from './pages/admin/AdminProfileManager';
import { AdminProjectsManager } from './pages/admin/AdminProjectsManager';
import { AdminBlogManager } from './pages/admin/AdminBlogManager';
import { AdminSkillsManager } from './pages/admin/AdminSkillsManager';
import { AdminServicesManager } from './pages/admin/AdminServicesManager';
import { AdminTestimonialsManager } from './pages/admin/AdminTestimonialsManager';
import { AdminMessagesManager } from './pages/admin/AdminMessagesManager';
import { AdminSettingsManager } from './pages/admin/AdminSettingsManager';
import { AdminDatabaseDiagnostic } from './pages/admin/AdminDatabaseDiagnostic';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes wrapped in MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin CMS Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardOverview />} />
                <Route path="profile" element={<AdminProfileManager />} />
                <Route path="projects" element={<AdminProjectsManager />} />
                <Route path="blog" element={<AdminBlogManager />} />
                <Route path="skills" element={<AdminSkillsManager />} />
                <Route path="services" element={<AdminServicesManager />} />
                <Route path="testimonials" element={<AdminTestimonialsManager />} />
                <Route path="messages" element={<AdminMessagesManager />} />
                <Route path="settings" element={<AdminSettingsManager />} />
                <Route path="database" element={<AdminDatabaseDiagnostic />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { ToastProvider } from './context/ToastContext';
// import { ThemeProvider } from './context/ThemeContext';

// // Layouts
// import { MainLayout } from './layouts/MainLayout';
// import { AdminLayout } from './layouts/AdminLayout';

// // Public Pages
// import { HomePage } from './pages/HomePage';
// import { AboutPage } from './pages/AboutPage';
// import { ProjectsPage } from './pages/ProjectsPage';
// import { ProjectDetailPage } from './pages/ProjectDetailPage';
// import { SkillsPage } from './pages/SkillsPage';
// import { ServicesPage } from './pages/ServicesPage';
// import { TestimonialsPage } from './pages/TestimonialsPage';
// import { BlogPage } from './pages/BlogPage';
// import { BlogPostPage } from './pages/BlogPostPage';
// import { ContactPage } from './pages/ContactPage';
// import { AdminLoginPage } from './pages/AdminLoginPage';

// // Admin Pages
// import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
// import { AdminProfileManager } from './pages/admin/AdminProfileManager';
// import { AdminProjectsManager } from './pages/admin/AdminProjectsManager';
// import { AdminBlogManager } from './pages/admin/AdminBlogManager';
// import { AdminSkillsManager } from './pages/admin/AdminSkillsManager';
// import { AdminServicesManager } from './pages/admin/AdminServicesManager';
// import { AdminTestimonialsManager } from './pages/admin/AdminTestimonialsManager';
// import { AdminMessagesManager } from './pages/admin/AdminMessagesManager';
// import { AdminSettingsManager } from './pages/admin/AdminSettingsManager';
// import { AdminDatabaseDiagnostic } from './pages/admin/AdminDatabaseDiagnostic';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <ToastProvider>
//         <AuthProvider>
//           <BrowserRouter>
//             <Routes>
//               {/* Public Routes wrapped in MainLayout */}
//               <Route element={<MainLayout />}>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/projects" element={<ProjectsPage />} />
//                 <Route path="/projects/:slug" element={<ProjectDetailPage />} />
//                 <Route path="/skills" element={<SkillsPage />} />
//                 <Route path="/services" element={<ServicesPage />} />
//                 <Route path="/testimonials" element={<TestimonialsPage />} />
//                 <Route path="/blog" element={<BlogPage />} />
//                 <Route path="/blog/:slug" element={<BlogPostPage />} />
//                 <Route path="/contact" element={<ContactPage />} />
//               </Route>

//               {/* Admin Login Route */}
//               <Route path="/admin/login" element={<AdminLoginPage />} />

//               {/* Protected Admin CMS Routes */}
//               <Route path="/admin" element={<AdminLayout />}>
//                 <Route index element={<AdminDashboardOverview />} />
//                 <Route path="profile" element={<AdminProfileManager />} />
//                 <Route path="projects" element={<AdminProjectsManager />} />
//                 <Route path="blog" element={<AdminBlogManager />} />
//                 <Route path="skills" element={<AdminSkillsManager />} />
//                 <Route path="services" element={<AdminServicesManager />} />
//                 <Route path="testimonials" element={<AdminTestimonialsManager />} />
//                 <Route path="messages" element={<AdminMessagesManager />} />
//                 <Route path="settings" element={<AdminSettingsManager />} />
//                 <Route path="database" element={<AdminDatabaseDiagnostic />} />
//               </Route>

//               {/* Catch-all */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </BrowserRouter>
//         </AuthProvider>
//       </ToastProvider>
//     </ThemeProvider>
//   );
// }

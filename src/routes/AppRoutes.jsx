import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../Layout';

// Page Components
import { Home } from '../pages/Home';
import { DropdownPage } from '../pages/DropdownPage';
import { CarouselPage } from '../pages/CarouselPage';

import { TodoPage } from '../pages/TodoPage';
import { ModalPage } from '../pages/ModalPage';
import { SearchPage } from '../pages/SearchPage';
import { DynamicFormPage } from '../pages/DynamicFormPage';
import { PaginationPage } from "../pages/PaginationPage";
import { ThemeTogglePage } from '../pages/ThemeTogglePage';
import { DragDropListPage } from '../pages/DragDropListPage';
import { InstagramScrollPage } from '../pages/InstagramScrollPage';
import { CinemaSeatBookingPage } from '../pages/CinemaSeatBookingPage';
import { FileUploadPage } from '../pages/FileUploadPage';
import { ToastPage } from '../pages/ToastPage';
import { ReusableTablePage } from '../pages/ReusableTablePage';
import { LoginPage } from '../pages/LoginPage';
import { UndoRedoPage } from '../pages/UndoRedoPage';
import { RatingPage } from '../pages/RatingPage';
import { AccordionPage } from '../pages/AccordionPage';
import { TabsPage } from '../pages/TabsPage';
import { ProgressBarPage } from '../pages/ProgressBarPage';
import { CalendarPage } from '../pages/CalendarPage';
import { FileExplorerPage } from '../pages/FileExplorerPage';
import { AutocompletePage } from '../pages/AutocompletePage';
import { OtpInputPage } from '../pages/OtpInputPage';
import { StepperPage } from '../pages/StepperPage';
import { KanbanBoardPage } from '../pages/KanbanBoardPage';
import { PopoverTooltipPage } from '../pages/PopoverTooltipPage';
import { TagInputPage } from '../pages/TagInputPage';
import { VirtualizedListPage } from '../pages/VirtualizedListPage';
import LoginProtectedRoute from './LoginProtectedRoute';


import Login from "../components/Login/Login";
import Dashboard from "../components/Login/Dashboard";

import { navItems } from '../data/content';
import { PractisePage } from '../pages/PractisePage';
import { SimpleInfiniteScrollPage } from '../pages/SimpleInfiniteScrollPage';
import { CustomHookPage } from '../pages/CustomHookPage';
import { AboutPage } from '../pages/AboutPage';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout wrapper for consistent navbar/sidebar */}
      <Route path="/" element={<Layout />}>
        {/* Default redirect to /todo */}
        <Route index element={<Navigate to="/dropdown" replace />} />
        <Route path="/dropdown" element={<DropdownPage />} />
        <Route path="/custom-hook" element={<CustomHookPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reusable-table" element={<ReusableTablePage />} />
        <Route path="/undo-redo" element={<UndoRedoPage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/accordion" element={<AccordionPage />} />
        <Route path="/tabs" element={<TabsPage />} />
        <Route path="/progress-bar" element={<ProgressBarPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/file-explorer" element={<FileExplorerPage />} />
        <Route path="/autocomplete" element={<AutocompletePage />} />
        <Route path="/otp-input" element={<OtpInputPage />} />
        <Route path="/stepper" element={<StepperPage />} />
        <Route path="/kanban-board" element={<KanbanBoardPage />} />
        <Route path="/popover-tooltip" element={<PopoverTooltipPage />} />
        <Route path="/tag-input" element={<TagInputPage />} />
        <Route path="/virtualized-list" element={<VirtualizedListPage />} />

        {/* Public pages */}
        <Route path="todo" element={<TodoPage />} />
        <Route path="carousel" element={<CarouselPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="simple-infinite-scroll" element={<SimpleInfiniteScrollPage />} />

        {/* Protected modal page */}
        <Route path="modal" element={<ModalPage />} />
        <Route path="dynamic-form" element={<DynamicFormPage />} />
        <Route path="pagination" element={<PaginationPage />} />
        <Route path='theme-toggle' element={<ThemeTogglePage />} />
        <Route path='drag-drop-list' element={<DragDropListPage />} />

        <Route path='instagram-scroll' element={<InstagramScrollPage />} />
        <Route path='cinema-seat-booking' element={<CinemaSeatBookingPage />} />
        <Route path='file-upload' element={<FileUploadPage />} />
        <Route path='toast' element={<ToastPage />} />



        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <LoginProtectedRoute>
              <Dashboard />
            </LoginProtectedRoute>
          }
        />

        <Route path="/practise" element={<PractisePage />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
};


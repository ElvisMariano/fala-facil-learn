
import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardTab from "@/components/admin/dashboard/DashboardTab";
import UsersTab from "@/components/admin/users/UsersTab";
import LessonsTab from "@/components/admin/lessons/LessonsTab";
import ActivitiesTab from "@/components/admin/activities/ActivitiesTab";
import ForumTab from "@/components/admin/forum/ForumTab";
import AnalyticsTab from "@/components/admin/analytics/AnalyticsTab";
import SettingsTab from "@/components/admin/settings/SettingsTab";
import { 
  usersData, 
  lessonsData, 
  analyticsData, 
  notificationsData, 
  activitiesData, 
  forumPostsData 
} from "@/components/admin/data/AdminData";

// Admin panel tabs
type TabType = "dashboard" | "users" | "lessons" | "activities" | "forum" | "analytics" | "settings";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Corrigindo o tipo de função para compatibilidade com o componente AdminSidebar
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader 
        mobileMenuOpen={mobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
        notificationsData={notificationsData} 
      />
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          mobileMenuOpen={mobileMenuOpen} 
        />
        <main className="flex-1 p-6 md:ml-64">
          {activeTab === "dashboard" && (
            <DashboardTab 
              setActiveTab={handleTabChange}
              usersData={usersData}
              lessonsData={lessonsData}
              analyticsData={analyticsData}
              notificationsData={notificationsData}
            />
          )}
          {activeTab === "users" && (
            <UsersTab 
              usersData={usersData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "lessons" && (
            <LessonsTab 
              lessonsData={lessonsData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "activities" && (
            <ActivitiesTab 
              activitiesData={activitiesData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "forum" && (
            <ForumTab 
              forumPostsData={forumPostsData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "analytics" && (
            <AnalyticsTab 
              analyticsData={analyticsData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;

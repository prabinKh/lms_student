import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon, CheckCircleIcon, ClockIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { DialogTitle } from "@/components/ui/dialog"; // adjust the path as needed

export default function DashboardPage() {
  // Mock data for demonstration
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      instructor: "Dr. Alan Smith",
      progress: 68,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructor: "Dr. Maria Johnson",
      progress: 42,
      image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=200",
    },
    {
      id: 3,
      title: "Introduction to Psychology",
      instructor: "Prof. James Williams",
      progress: 89,
      image: "https://images.unsplash.com/photo-1576669801518-8bbdb5176f95?q=80&w=200",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Programming Assignment #3",
      course: "Introduction to Computer Science",
      dueDate: "2025-04-15",
      status: "pending",
    },
    {
      id: 2,
      title: "Mathematical Proofs",
      course: "Advanced Mathematics",
      dueDate: "2025-04-10",
      status: "pending",
    },
    {
      id: 3,
      title: "Psychological Case Study",
      course: "Introduction to Psychology",
      dueDate: "2025-04-05",
      status: "completed",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm exams will be held from April 20 to April 24. Please check your course pages for specific dates and times.",
      date: "2025-03-25",
    },
    {
      id: 2,
      title: "System Maintenance",
      content: "The system will be down for maintenance on April 2 from 2 AM to 5 AM. We apologize for any inconvenience.",
      date: "2025-03-28",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your learning progress.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Enrolled Courses
              </CardTitle>
              <BookOpenIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">
                Across 2 departments
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Assignments
              </CardTitle>
              <ClipboardDocumentCheckIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignments.filter(a => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {assignments.filter(a => a.status === "completed").length} completed this week
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Average Progress
              </CardTitle>
              <CheckCircleIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2% from last week
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Next Deadline
              </CardTitle>
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Apr 5</div>
              <p className="text-xs text-muted-foreground">
                Psychological Case Study
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Due Soon</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden course-card">
                  <div className="aspect-video w-full relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {course.progress}% complete
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="assignments" className="space-y-4">
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{assignment.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {assignment.course}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}>
                        {assignment.status === "completed" ? "Completed" : "Due Soon"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span>
                        Due: {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="announcements" className="space-y-4">
            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{announcement.title}</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

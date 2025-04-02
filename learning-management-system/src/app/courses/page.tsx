"use client";

import React, { useState } from "react";
import Link from "next/link";  // Import Link component
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog"; // adjust the path as needed

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Add the coursesData array here
const coursesData = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Smith",
    description: "Learn the foundational concepts of computer science and programming.",
    department: "Computer Science",
    level: "Beginner",
    duration: "12 weeks",
    enrolled: 1243,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Dr. Maria Johnson",
    description: "Deep dive into advanced mathematical concepts and problem-solving techniques.",
    department: "Mathematics",
    level: "Advanced",
    duration: "16 weeks",
    enrolled: 856,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=500",
  },
  {
    id: 3,
    title: "Introduction to Psychology",
    instructor: "Prof. James Williams",
    description: "Explore the human mind and behavior through psychological theories and research.",
    department: "Psychology",
    level: "Beginner",
    duration: "10 weeks",
    enrolled: 1879,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1576669801518-8bbdb5176f95?q=80&w=500",
  },
  {
    id: 4,
    title: "Data Science and Machine Learning",
    instructor: "Dr. Emily Chen",
    description: "Learn how to analyze data and build machine learning models for real-world applications.",
    department: "Computer Science",
    level: "Intermediate",
    duration: "14 weeks",
    enrolled: 2156,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500",
  },
  {
    id: 5,
    title: "World History: Ancient Civilizations",
    instructor: "Dr. Robert Anderson",
    description: "Explore the rise and fall of major ancient civilizations around the world.",
    department: "History",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 943,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=500",
  },
  {
    id: 6,
    title: "Marketing in the Digital Age",
    instructor: "Prof. Sarah Johnson",
    description: "Learn modern marketing strategies and techniques for the digital landscape.",
    department: "Business",
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 1458,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500",
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  // Filter courses based on search query, department, and level
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = selectedDepartment === "All Departments" || course.department === selectedDepartment;

    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;

    return matchesSearch && matchesDepartment && matchesLevel;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* ... previous code remains the same ... */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden course-card">
                <div className="aspect-video w-full relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        {course.department} · {course.level}
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <div className="text-sm flex items-center">
                      <AcademicCapIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <StarIcon className="w-4 h-4 mr-1 text-warning" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

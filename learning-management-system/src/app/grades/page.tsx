"use client";

import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,

  
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

// Mock data for grades
const gradesData = {
  termGPA: 3.75,
  cumulativeGPA: 3.68,
  courses: [
    {
      id: 1,
      code: "CS101",
      title: "Introduction to Computer Science",
      grade: "A",
      percentage: 92,
      credits: 4,
      gradePoints: 4.0,
    },
    {
      id: 2,
      code: "MATH201",
      title: "Advanced Mathematics",
      grade: "B+",
      percentage: 89,
      credits: 3,
      gradePoints: 3.5,
    },
    {
      id: 3,
      code: "PSYC101",
      title: "Introduction to Psychology",
      grade: "A-",
      percentage: 91,
      credits: 3,
      gradePoints: 3.7,
    },
    {
      id: 4,
      code: "DS220",
      title: "Data Science and Machine Learning",
      grade: "Pending",
      percentage: null,
      credits: 4,
      gradePoints: null,
    },
    {
      id: 5,
      code: "HIST110",
      title: "World History: Ancient Civilizations",
      grade: "A",
      percentage: 94,
      credits: 3,
      gradePoints: 4.0,
    },
    {
      id: 6,
      code: "MKT240",
      title: "Marketing in the Digital Age",
      grade: "B",
      percentage: 85,
      credits: 3,
      gradePoints: 3.0,
    },
  ],
  previousTerms: [
    {
      id: 1,
      term: "Fall 2024",
      gpa: 3.62,
      courses: 5,
      credits: 16,
    },
    {
      id: 2,
      term: "Spring 2024",
      gpa: 3.75,
      courses: 5,
      credits: 15,
    },
    {
      id: 3,
      term: "Fall 2023",
      gpa: 3.56,
      courses: 6,
      credits: 18,
    },
  ],
  assignments: [
    {
      id: 1,
      title: "Programming Assignment #1",
      course: "Introduction to Computer Science",
      grade: 95,
      maxGrade: 100,
    },
    {
      id: 2,
      title: "Programming Assignment #2",
      course: "Introduction to Computer Science",
      grade: 88,
      maxGrade: 100,
    },
    {
      id: 3,
      title: "Midterm Exam",
      course: "Introduction to Computer Science",
      grade: 92,
      maxGrade: 100,
    },
    {
      id: 4,
      title: "Math Problem Set #1",
      course: "Advanced Mathematics",
      grade: 87,
      maxGrade: 100,
    },
    {
      id: 5,
      title: "Math Problem Set #2",
      course: "Advanced Mathematics",
      grade: 91,
      maxGrade: 100,
    },
    {
      id: 6,
      title: "Psychology Case Study",
      course: "Introduction to Psychology",
      grade: 93,
      maxGrade: 100,
    },
    {
      id: 7,
      title: "Research Paper",
      course: "Introduction to Psychology",
      grade: 89,
      maxGrade: 100,
    },
  ],
};

const getGradeColor = (grade: string | null) => {
  if (!grade || grade === "Pending") return "text-muted-foreground";

  const gradeMap: Record<string, string> = {
    "A+": "text-success",
    "A": "text-success",
    "A-": "text-success",
    "B+": "text-success/80",
    "B": "text-success/70",
    "B-": "text-info",
    "C+": "text-info/80",
    "C": "text-warning",
    "C-": "text-warning/80",
    "D+": "text-warning/70",
    "D": "text-destructive/80",
    "F": "text-destructive",
  };

  return gradeMap[grade] || "text-muted-foreground";
};

const getPercentageColor = (percentage: number | null) => {
  if (percentage === null) return "text-muted-foreground";

  if (percentage >= 90) return "text-success";
  if (percentage >= 80) return "text-success/70";
  if (percentage >= 70) return "text-info";
  if (percentage >= 60) return "text-warning";
  return "text-destructive";
};

export default function GradesPage() {
  const completedCourses = gradesData.courses.filter(course => course.grade !== "Pending");
  const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
  const totalGradePoints = completedCourses.reduce(
    (sum, course) => sum + (course.gradePoints || 0) * course.credits,
    0
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
          <p className="text-muted-foreground">
            View your academic performance and grades across all courses.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Current Term GPA
              </CardTitle>
              <div className="w-4 h-4 rounded-full bg-success"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradesData.termGPA.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Spring 2025
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Cumulative GPA
              </CardTitle>
              <div className="w-4 h-4 rounded-full bg-info"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradesData.cumulativeGPA.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Based on {totalCredits} credits
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Credits Completed
              </CardTitle>
              <div className="w-4 h-4 rounded-full bg-warning"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
              <p className="text-xs text-muted-foreground">
                This term
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Credits
              </CardTitle>
              <div className="w-4 h-4 rounded-full bg-accent"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCredits + gradesData.previousTerms.reduce((sum, term) => sum + term.credits, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Overall program
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="currentTerm" className="space-y-4">
          <TabsList>
            <TabsTrigger value="currentTerm">Current Term</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="currentTerm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spring 2025 Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradesData.courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell className={getGradeColor(course.grade)}>
                          {course.grade}
                        </TableCell>
                        <TableCell className={getPercentageColor(course.percentage)}>
                          {course.percentage !== null ? `${course.percentage}%` : "-"}
                        </TableCell>
                        <TableCell>
                          {course.grade !== "Pending" ? (
                            <CheckCircleIcon className="w-5 h-5 text-success" />
                          ) : (
                            <ExclamationCircleIcon className="w-5 h-5 text-warning" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {completedCourses.map((course) => (
                      <div key={course.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{course.code}</span>
                          <span className={getGradeColor(course.grade)}>{course.grade}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: `${course.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GPA Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...gradesData.previousTerms].reverse().map((term) => (
                      <div key={term.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{term.term}</span>
                          <span>{term.gpa.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-info h-full"
                            style={{ width: `${(term.gpa / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Spring 2025 (Current)</span>
                        <span className="text-success">{gradesData.termGPA.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-success h-full"
                          style={{ width: `${(gradesData.termGPA / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradesData.assignments.map((assignment) => {
                      const percentage = (assignment.grade / assignment.maxGrade) * 100;
                      return (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{`${assignment.grade}/${assignment.maxGrade}`}</TableCell>
                          <TableCell className={getPercentageColor(percentage)}>
                            {percentage.toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Term</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Courses</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Spring 2025 (Current)</TableCell>
                      <TableCell className="text-success">{gradesData.termGPA.toFixed(2)}</TableCell>
                      <TableCell>{totalCredits}</TableCell>
                      <TableCell>{gradesData.courses.length}</TableCell>
                    </TableRow>
                    {gradesData.previousTerms.map((term) => (
                      <TableRow key={term.id}>
                        <TableCell className="font-medium">{term.term}</TableCell>
                        <TableCell>{term.gpa.toFixed(2)}</TableCell>
                        <TableCell>{term.credits}</TableCell>
                        <TableCell>{term.courses}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-primary">{gradesData.cumulativeGPA.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">Cumulative GPA</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-primary">
                      {totalCredits + gradesData.previousTerms.reduce((sum, term) => sum + term.credits, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Total Credits</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-primary">
                      {gradesData.previousTerms.length + 1}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Terms Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

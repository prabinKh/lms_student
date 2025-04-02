"use client";

import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  DocumentTextIcon, 
  ExclamationCircleIcon,
  ChevronDownIcon,
  ArrowUpTrayIcon, // Replace UploadIcon with ArrowUpTrayIcon
  DocumentIcon, // Replace FileIcon with DocumentIcon
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

// Define File Upload Interface
interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
}

// Define Assignment Type
interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  submittedFiles?: FileUpload[];
  submittedText?: string;
}

// Mock data for assignments
const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: "Programming Assignment #3",
    course: "Introduction to Computer Science",
    dueDate: "2025-04-15",
    description: "Complete the implementation of a linked list with insertion, deletion, and traversal operations.",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Mathematical Proofs",
    course: "Advanced Mathematics",
    dueDate: "2025-04-10",
    description: "Solve the given set of mathematical proofs using the techniques learned in class.",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    title: "Psychological Case Study",
    course: "Introduction to Psychology",
    dueDate: "2025-04-05",
    description: "Analyze the provided case study and write a report on the psychological principles observed.",
    status: "completed",
    priority: "medium",
  },
  {
    id: 4,
    title: "Data Analysis Project",
    course: "Data Science and Machine Learning",
    dueDate: "2025-04-20",
    description: "Clean and analyze the provided dataset and create visualizations to present your findings.",
    status: "pending",
    priority: "high",
  },
  {
    id: 5,
    title: "Historical Research Paper",
    course: "World History: Ancient Civilizations",
    dueDate: "2025-04-25",
    description: "Write a research paper on one of the ancient civilizations discussed in class.",
    status: "pending",
    priority: "low",
  },
  {
    id: 6,
    title: "Marketing Strategy Analysis",
    course: "Marketing in the Digital Age",
    dueDate: "2025-04-12",
    description: "Analyze the marketing strategy of a modern tech company and present your findings.",
    status: "completed",
    priority: "medium",
  },
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsData);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<{[key: number]: string}>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [submitMode, setSubmitMode] = useState<"submit" | "hold">("submit");
  const [submittedFiles, setSubmittedFiles] = useState<FileUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Dropdown state for symbols and calculator
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  // Reference for dropdown menus
  const symbolsRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Comprehensive mathematical symbols
  const mathSymbols = [
    '+', '-', '×', '÷', '=', '≠',
    '∫', '∑', '∏', '√', '∞', 
    '≈', '±', '≤', '≥', 
    'π', 'e', 
    'sin', 'cos', 'tan', 
    'arcsin', 'arccos', 'arctan',
    'log', 'ln', 'exp',
    'α', 'β', 'γ', 'δ', 'Δ',
    '∈', '∉', '∀', '∃', '∧', '∨', '¬'
  ];

  const calculatorButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        symbolsRef.current && !symbolsRef.current.contains(event.target as Node) &&
        calculatorRef.current && !calculatorRef.current.contains(event.target as Node)
      ) {
        setIsSymbolsOpen(false);
        setIsCalculatorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: FileUpload[] = Array.from(files).map(file => {
      // Create preview for images
      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : undefined;

      return {
        id: `file-${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: preview
      };
    });

    setSubmittedFiles(prev => [...prev, ...newFiles]);
  };

  // Remove uploaded file
  const removeFile = (fileId: string) => {
    setSubmittedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Toggle assignment status
  const toggleAssignmentStatus = (id: number) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, status: assignment.status === "completed" ? "pending" : "completed" }
        : assignment
    ));
  };

  // Open assignment details modal
  const openAssignmentDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailModalOpen(true);
    setCurrentAnswer(submittedAnswers[assignment.id] || "");
    setSubmittedFiles([]);
  };

  // Add symbol to answer
  const addSymbolToAnswer = (symbol: string) => {
    setCurrentAnswer(prev => prev + symbol);
  };

  // Calculate answer
  const calculateAnswer = () => {
    try {
      const result = eval(currentAnswer);
      setCurrentAnswer(result.toString());
    } catch (error) {
      setCurrentAnswer("Error");
    }
  };

  // Handle submission
  const handleSubmit = () => {
    if (!selectedAssignment) return;

    if (submitMode === "submit") {
      // Update assignment with submitted content and files
      setAssignments(assignments.map(a => 
        a.id === selectedAssignment.id 
          ? { 
              ...a, 
              status: "completed",
              submittedText: currentAnswer,
              submittedFiles: submittedFiles
            } 
          : a
      ));

      // Store submitted answer and files
      setSubmittedAnswers(prev => ({
        ...prev,
        [selectedAssignment.id]: currentAnswer
      }));

      // Reset files
      setSubmittedFiles([]);
      setIsDetailModalOpen(false);
    } else {
      // Hold mode - keep answer and files
      setSubmittedAnswers(prev => ({
        ...prev,
        [selectedAssignment.id]: currentAnswer
      }));
    }
  };

  // Render file upload section
  const renderFileUpload = () => {
    return (
      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Attachment Files</h4>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fileInputRef.current?.click()}
          >
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            multiple
            onChange={handleFileUpload}
          />
        </div>

        {submittedFiles.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {submittedFiles.map(file => (
              <div 
                key={file.id} 
                className="border rounded-md p-2 relative flex flex-col items-center"
              >
                {file.preview ? (
                  <img 
                    src={file.preview} 
                    alt={file.name} 
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                ) : (
                  <DocumentIcon  className="w-12 h-12 text-muted-foreground mb-2" />
                )}
                <p className="text-xs truncate max-w-full">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-1 right-1 w-6 h-6 p-0"
                  onClick={() => removeFile(file.id)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground text-sm py-4">
            No files uploaded
          </div>
        )}
      </div>
    );
  };

  // Render submitted files
  const renderSubmittedFiles = (assignment: Assignment) => {
    if (!assignment.submittedFiles || assignment.submittedFiles.length === 0) {
      return <p className="text-muted-foreground">No files submitted</p>;
    }

    return (
      <div className="grid grid-cols-3 gap-3 mt-2">
        {assignment.submittedFiles.map(file => (
          <div 
            key={file.id} 
            className="border rounded-md p-2 flex flex-col items-center"
          >
            {file.preview ? (
              <img 
                src={file.preview} 
                alt={file.name} 
                className="w-full h-24 object-cover rounded-md mb-2"
              />
            ) : (
              <DocumentIcon  className="w-12 h-12 text-muted-foreground mb-2" />
            )}
            <p className="text-xs truncate max-w-full">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Render assignment input
  const renderAssignmentInput = () => {
    return (
      <div className="relative space-y-4">
        <div className="flex items-center justify-start space-x-2 mb-4 ml-60">
          {/* Symbols Dropdown */}
          <div className="relative" ref={symbolsRef}>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSymbolsOpen(!isSymbolsOpen);
                setIsCalculatorOpen(false);
              }}
              className="flex items-center"
            >
              Symbols <ChevronDownIcon className="ml-2 w-4 h-4" />
            </Button>
            {isSymbolsOpen && (
              <div className="absolute z-50 mt-2 w-64 max-h-64 overflow-y-auto bg-white border rounded-md shadow-lg p-2 grid grid-cols-4 gap-1">
                {mathSymbols.map((symbol) => (
                  <Button 
                    key={symbol} 
                    variant="ghost" 
                    size="sm"
                    onClick={() => addSymbolToAnswer(symbol)}
                    className="w-full"
                  >
                    {symbol}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Calculator Dropdown */}
          <div className="relative" ref={calculatorRef}>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsCalculatorOpen(!isCalculatorOpen);
                setIsSymbolsOpen(false);
              }}
              className="flex items-center"
            >
              Calculator <ChevronDownIcon className="ml-10 w-4 h-4" />
            </Button>
            {isCalculatorOpen && (
              <div className="absolute z-50 mt-2 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-4 gap-1">
                {calculatorButtons.map((button) => (
                  <Button 
                    key={button} 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      if (button === '=') {
                        calculateAnswer();
                      } else {
                        addSymbolToAnswer(button);
                      }
                    }}
                    className="w-full"
                  >
                    {button}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Expandable Textarea */}
        <textarea
          value={currentAnswer}
          onChange={(e) => {
            setCurrentAnswer(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows={1}
          placeholder="Enter your answer here..."
          className="w-full min-h-[50px] max-h-[200px] p-2 border rounded-md resize-none overflow-y-auto"
          style={{ 
            height: 'auto', 
            overflowY: 'hidden' 
          }}
        />

        {/* File Upload Section */}
        {renderFileUpload()}
      </div>
    );
  };

  // Status badge rendering
  const getStatusBadge = (status: string, priority: string) => {
    if (status === "completed") {
      return (
        <div className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center bg-success/10 text-success">
          <CheckCircleIcon className="w-3 h-3 mr-1" />
          <span>Completed</span>
        </div>
      );
    }

    const priorityColors = {
      high: "bg-destructive/10 text-destructive",
      medium: "bg-warning/10 text-warning",
      low: "bg-muted-foreground/30 text-muted-foreground",
    };

    return (
      <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center ${priorityColors[priority as keyof typeof priorityColors]}`}>
        <ExclamationCircleIcon className="w-3 h-3 mr-1" />
        <span>{priority} priority</span>
      </div>
    );
  };

  // Calculate days left for assignment
  const getDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Get due date label
  const getDueLabel = (dueDate: string) => {
    const daysLeft = getDaysLeft(dueDate);

    if (daysLeft < 0) {
      return <span className="text-destructive">Overdue by {Math.abs(daysLeft)} days</span>;
    } else if (daysLeft === 0) {
      return <span className="text-destructive">Due today</span>;
    } else if (daysLeft === 1) {
      return <span className="text-warning">Due tomorrow</span>;
    } else if (daysLeft <= 3) {
      return <span className="text-warning">Due in {daysLeft} days</span>;
    } else {
      return <span>Due in {daysLeft} days</span>;
    }
  };

  // Filtered assignments
  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const completedAssignments = assignments.filter(a => a.status === "completed");

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            Track and manage your assignments across all courses.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Pending Assignments Card */}
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {pendingAssignments.reduce((acc, curr) => {
                  if (!acc.includes(curr.course)) acc.push(curr.course);
                  return acc;
                }, [] as string[]).length} courses
              </p>
            </CardContent>
          </Card>

          {/* Completed Assignments Card */}
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircleIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAssignments.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          {/* Upcoming Deadline Card */}
          <Card className="col-span-1 md:col-span-1 dashboard-stat">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Deadline</CardTitle>
              <DocumentTextIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {pendingAssignments.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">
                    {format(new Date(pendingAssignments
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0].dueDate), 'MMM d')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pendingAssignments
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0].title}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">No pending assignments</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
          </TabsList>

          {/* Upcoming Assignments Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            {pendingAssignments.length > 0 ? (
              <div className="grid gap-4">
                {pendingAssignments
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((assignment) => (
                    <Card key={assignment.id}>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={`assignment-${assignment.id}`}
                              checked={assignment.status === "completed"}
                              onCheckedChange={() => toggleAssignmentStatus(assignment.id)}
                            />
                            <div>
                              <CardTitle className="text-base">{assignment.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">{assignment.course}</p>
                            </div>
                          </div>
                          {getStatusBadge(assignment.status, assignment.priority)}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm mb-3">{assignment.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span>
                              Due: {format(new Date(assignment.dueDate), 'MMMM d, yyyy')}
                              {' '}
                              ({getDueLabel(assignment.dueDate)})
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => openAssignmentDetails(assignment)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No upcoming assignments</h3>
                <p className="text-muted-foreground">
                  You've completed all your assignments. Great job!
                </p>
              </div>
            )}
          </TabsContent>

          {/* Completed Assignments Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedAssignments.length > 0 ? (
              <div className="grid gap-4">
                {completedAssignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`assignment-${assignment.id}`}
                            checked={true}
                            onCheckedChange={() => toggleAssignmentStatus(assignment.id)}
                          />
                          <div>
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          </div>
                        </div>
                        {getStatusBadge(assignment.status, assignment.priority)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-3">{assignment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span>
                            Completed on: {format(new Date(), 'MMMM d, yyyy')}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => openAssignmentDetails(assignment)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No completed assignments</h3>
                <p className="text-muted-foreground">
                  You haven't completed any assignments yet.
                </p>
              </div>
            )}
          </TabsContent>

          {/* All Assignments Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {assignments
                .sort((a, b) => {
                  if (a.status !== b.status) {
                    return a.status === "pending" ? -1 : 1;
                  }
                  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                })
                .map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`assignment-${assignment.id}`}
                            checked={assignment.status === "completed"}
                            onCheckedChange={() => toggleAssignmentStatus(assignment.id)}
                          />
                          <div>
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                          </div>
                        </div>
                        {getStatusBadge(assignment.status, assignment.priority)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-3">{assignment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span>
                            {assignment.status === "completed"
                              ? `Completed on: ${format(new Date(), 'MMMM d, yyyy')}`
                              : `Due: ${format(new Date(assignment.dueDate), 'MMMM d, yyyy')} (${getDueLabel(assignment.dueDate)})`
                            }
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => openAssignmentDetails(assignment)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Assignment Details Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl">
            {selectedAssignment && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedAssignment.title}</DialogTitle>
                  <DialogDescription>
                    {selectedAssignment.description}
                  </DialogDescription>
                </DialogHeader>
                
                {selectedAssignment.status === "completed" ? (
                  <div>
                    <h3 className="font-semibold mb-2">Submitted Answer:</h3>
                    <p className="p-2 bg-gray-100 rounded mb-4">
                      {selectedAssignment.submittedText || "No answer submitted"}
                    </p>
                    
                    <h3 className="font-semibold mb-2">Submitted Files:</h3>
                    {renderSubmittedFiles(selectedAssignment)}
                  </div>
                ) : (
                  <>
                    {renderAssignmentInput()}

                    {/* Submit Options */}
                    <div className="flex gap-2 mt-2">
                      <Button 
                        onClick={() => {
                          setSubmitMode("submit");
                          handleSubmit();
                        }} 
                        className={submitMode === "submit" ? "bg-primary" : ""}
                      >
                        Submit
                      </Button>
                      <Button 
                        onClick={() => {
                          setSubmitMode("hold");
                          handleSubmit();
                        }} 
                        variant="outline"
                        className={submitMode === "hold" ? "bg-secondary" : ""}
                      >
                        Hold
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
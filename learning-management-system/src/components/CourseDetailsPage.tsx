"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import {
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
  DocumentIcon,
  VideoCameraIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

// Course Data Structure
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
    curriculum: [
      { 
        week: 1, 
        topic: "Introduction to Programming Concepts",
        details: [
          "What is programming?",
          "Basic computer architecture",
          "Introduction to algorithms",
          "Setting up development environment"
        ]
      },
      { 
        week: 2, 
        topic: "Basic Data Structures",
        details: [
          "Arrays and lists",
          "Stacks and queues",
          "Basic data manipulation",
          "Performance considerations"
        ]
      },
      { 
        week: 3, 
        topic: "Algorithms Fundamentals",
        details: [
          "Sorting algorithms",
          "Search techniques",
          "Time and space complexity",
          "Algorithm design principles"
        ]
      }
    ],
    videos: [
      { 
        id: 1, 
        title: "What is Computer Science?", 
        duration: "45:30", 
        url: "https://example.com/video1",
        description: "An introductory lecture on computer science fundamentals"
      },
      { 
        id: 2, 
        title: "Programming Basics", 
        duration: "1:02:15", 
        url: "https://example.com/video2",
        description: "Learn the basic syntax and concepts of programming"
      }
    ],
    documents: [
      { 
        id: 1, 
        title: "Course Syllabus", 
        type: "PDF", 
        url: "https://example.com/syllabus.pdf",
        size: "2.5 MB"
      },
      { 
        id: 2, 
        title: "Assignment Guidelines", 
        type: "DOCX", 
        url: "https://example.com/assignments.docx",
        size: "1.2 MB"
      }
    ],
    codeRepositories: [
      { 
        id: 1, 
        title: "Week 1 Exercises", 
        description: "Basic programming exercises",
        language: "Python",
        url: "https://github.com/example/week1-exercises",
        code: `
# Basic Python Exercise
def hello_world():
    """Simple hello world function"""
    return "Hello, Computer Science!"

def calculate_average(numbers):
    """Calculate average of a list of numbers"""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# Example usage
print(hello_world())
numbers = [10, 20, 30, 40, 50]
print(f"Average: {calculate_average(numbers)}")
        `
      }
    ],
    quizzes: [
      { 
        id: 1, 
        title: "Programming Basics Quiz", 
        totalQuestions: 3,
        passingScore: 2,
        questions: [
          {
            question: "What is an algorithm?",
            options: [
              "A cooking recipe",
              "A step-by-step procedure to solve a problem",
              "A type of computer hardware",
              "A programming language"
            ],
            correctAnswer: 1
          },
          {
            question: "What does CPU stand for?",
            options: [
              "Computer Processing Unit",
              "Central Processing Unit",
              "Computer Personal Unit",
              "Central Personal Unit"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of these is NOT a programming language?",
            options: [
              "Python",
              "Java",
              "Excel",
              "JavaScript"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  }
];

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.courseId ? parseInt(params.courseId as string) : null;
  const course = coursesData.find(c => c.id === courseId);

  const [activeTab, setActiveTab] = useState("curriculum");
  
  // State for various interactions
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedCodeRepo, setSelectedCodeRepo] = useState<any>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [quizState, setQuizState] = useState<{
    currentQuestion: number;
    selectedAnswer: number | null;
    answers: number[];
    score: number;
  } | null>(null);

  if (!course) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Course Not Found</h2>
          <p className="text-muted-foreground">The course you are looking for does not exist.</p>
        </div>
      </MainLayout>
    );
  }

  // Curriculum Week Details Expansion
  const toggleWeekDetails = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  // Video Playback Handler
  const handleVideoWatch = (video: any) => {
    setSelectedVideo(video);
  };

  // Document Download Handler
  const handleDocumentDownload = (doc: any) => {
    window.open(doc.url, '_blank');
  };

  // Code Repository Viewer
  const handleCodeRepoView = (repo: any) => {
    setSelectedCodeRepo(repo);
  };

  // Quiz Interaction Handlers
  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      answers: [],
      score: 0
    });
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!quizState || quizState.selectedAnswer !== null) return;

    const currentQuestion = selectedQuiz.questions[quizState.currentQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState({
      ...quizState,
      selectedAnswer: answerIndex,
      score: isCorrect ? quizState.score + 1 : quizState.score
    });
  };

  const moveToNextQuestion = () => {
    if (!quizState || !selectedQuiz) return;

    const nextQuestionIndex = quizState.currentQuestion + 1;
    if (nextQuestionIndex < selectedQuiz.questions.length) {
      setQuizState({
        ...quizState,
        currentQuestion: nextQuestionIndex,
        selectedAnswer: null
      });
    } else {
      // Quiz completed
      alert(`Quiz completed! Your score: ${quizState.score}/${selectedQuiz.questions.length}`);
      setSelectedQuiz(null);
      setQuizState(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Course Header */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-video w-full relative rounded-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <AcademicCapIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 mr-2 text-warning" />
                <span>{course.rating} ({course.enrolled} enrolled)</span>
              </div>
            </div>
            
            <Button className="mt-4">Enroll Now</Button>
          </div>
        </div>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="curriculum">
              <AcademicCapIcon className="w-4 h-4 mr-2" /> Curriculum
            </TabsTrigger>
            <TabsTrigger value="videos">
              <VideoCameraIcon className="w-4 h-4 mr-2" /> Videos
            </TabsTrigger>
            <TabsTrigger value="documents">
              <DocumentIcon className="w-4 h-4 mr-2" /> Documents
            </TabsTrigger>
            <TabsTrigger value="code">
              <CodeBracketIcon className="w-4 h-4 mr-2" /> Code
            </TabsTrigger>
            <TabsTrigger value="quizzes">
              <QuestionMarkCircleIcon className="w-4 h-4 mr-2" /> Quizzes
            </TabsTrigger>
          </TabsList>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.curriculum.map((item) => (
                    <div 
                      key={item.week} 
                      className="flex flex-col p-3 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">Week {item.week}</span>
                          <p className="text-muted-foreground">{item.topic}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleWeekDetails(item.week)}
                        >
                          {expandedWeek === item.week ? "Hide Details" : "View Details"}
                          <ChevronDownIcon className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                      {expandedWeek === item.week && (
                        <div className="mt-4 pl-4 border-t pt-2">
                          <h4 className="font-semibold mb-2">Detailed Topics:</h4>
                          <ul className="list-disc list-inside text-sm">
                            {item.details.map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Course Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.videos.map((video) => (
                    <div 
                      key={video.id} 
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{video.title}</span>
                        <p className="text-muted-foreground">{video.duration}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVideoWatch(video)}
                      >
                        Watch Video
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Course Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.documents.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{doc.title}</span>
                        <p className="text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDocumentDownload(doc)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Code Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.codeRepositories.map((repo) => (
                    <div 
                      key={repo.id} 
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{repo.title}</span>
                        <p className="text-muted-foreground">
                          {repo.description} ({repo.language})
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCodeRepoView(repo)}
                      >
                        View Repository
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <Card>
              <CardHeader>
                <CardTitle>Course Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.quizzes.map((quiz) => (
                    <div 
                      key={quiz.id} 
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{quiz.title}</span>
                        <p className="text-muted-foreground">
                          {quiz.totalQuestions} questions | Pass Score: {quiz.passingScore}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startQuiz(quiz)}
                      >
                        Start Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>{selectedVideo?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-black flex items-center justify-center text-white">
            Video Player Placeholder
            <p>{selectedVideo?.duration}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Code Repository Modal */}
      <Dialog open={!!selectedCodeRepo} onOpenChange={() => setSelectedCodeRepo(null)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>{selectedCodeRepo?.title}</DialogTitle>
            <DialogDescription>{selectedCodeRepo?.description}</DialogDescription>
          </DialogHeader>
          <div className="h-[400px] w-full rounded-md border p-4 overflow-auto">
            <pre className="text-sm font-mono bg-gray-100 p-4 rounded">
              {selectedCodeRepo?.code}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => {
        setSelectedQuiz(null);
        setQuizState(null);
      }}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedQuiz?.title}</DialogTitle>
          </DialogHeader>
          {quizState && selectedQuiz && (
            <div>
              <div className="mb-4">
                <p className="font-semibold">
                  Question {quizState.currentQuestion + 1} of {selectedQuiz.questions.length}
                </p>
                <h3 className="text-lg mt-2">
                  {selectedQuiz.questions[quizState.currentQuestion].question}
                </h3>
              </div>
              <div className="space-y-2">
                {selectedQuiz.questions[quizState.currentQuestion].options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={
                      quizState.selectedAnswer !== null
                        ? index === selectedQuiz.questions[quizState.currentQuestion].correctAnswer
                          ? "default"
                          : quizState.selectedAnswer === index
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    className="w-full"
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizState.selectedAnswer !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {quizState.selectedAnswer !== null && (
                <Button 
                  className="mt-4 w-full"
                  onClick={moveToNextQuestion}
                >
                  Next Question
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
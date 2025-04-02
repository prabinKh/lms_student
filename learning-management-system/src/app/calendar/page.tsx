"use client";

import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Mock events data
const events = [
  {
    id: 1,
    title: "Programming Assignment #3",
    date: "2025-04-15",
    type: "assignment",
    course: "Introduction to Computer Science",
    description: "Complete the implementation of a linked list with insertion, deletion, and traversal operations.",
  },
  {
    id: 2,
    title: "Mathematical Proofs",
    date: "2025-04-10",
    type: "assignment",
    course: "Advanced Mathematics",
    description: "Solve the given set of mathematical proofs using the techniques learned in class.",
  },
  {
    id: 3,
    title: "Midterm Exam",
    date: "2025-04-20",
    type: "exam",
    course: "Introduction to Computer Science",
    description: "Covers all material from weeks 1-6 including data structures, algorithms, and programming concepts.",
  },
  {
    id: 4,
    title: "Guest Lecturer: Dr. Smith",
    date: "2025-04-08",
    type: "lecture",
    course: "Introduction to Psychology",
    description: "Special guest lecture on cognitive behavioral therapy applications in clinical settings.",
  },
  {
    id: 5,
    title: "Group Project Meeting",
    date: "2025-04-12",
    type: "meeting",
    course: "Data Science and Machine Learning",
    description: "Team meeting to discuss project milestones, data collection, and analysis approach.",
  },
  {
    id: 6,
    title: "Final Paper Submission",
    date: "2025-04-25",
    type: "assignment",
    course: "World History: Ancient Civilizations",
    description: "Submit your research paper on one of the ancient civilizations discussed in class.",
  },
];

const getEventTypeColor = (type: string) => {
  const colors = {
    assignment: "bg-primary/20 text-primary hover:bg-primary/30 border-primary/40",
    exam: "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/40",
    lecture: "bg-info/20 text-info hover:bg-info/30 border-info/40",
    meeting: "bg-warning/20 text-warning hover:bg-warning/30 border-warning/40",
  };

  return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground hover:bg-muted/80";
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="font-medium text-lg px-4 py-1">
            {format(currentDate, "MMMM yyyy")}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`day-${i}`} className="text-center font-medium text-sm py-2">
          {format(addDays(weekStart, i), "EEE")}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "yyyy-MM-dd");

        // Find events for this day
        const dayEvents = events.filter(event => event.date === formattedDate);

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] p-1 border border-border ${
              !isSameMonth(day, monthStart)
                ? "text-muted-foreground bg-muted/20"
                : isSameDay(day, new Date())
                ? "bg-accent/10 border-accent"
                : ""
            }`}
          >
            <div className="font-medium text-sm p-1">
              {format(day, "d")}
            </div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <button
                  key={event.id}
                  className={`w-full text-left text-xs p-1 rounded truncate border ${getEventTypeColor(event.type)}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.title}
                </button>
              ))}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  const renderEventSidebar = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const upcomingEvents = events
      .filter(event => event.date >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="p-3 border rounded-md cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{event.title}</h3>
                <div className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{event.course}</p>
              <p className="text-sm mt-1">{format(parseISO(event.date), "MMMM d, yyyy")}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {renderHeader()}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                {renderDays()}
                {renderCells()}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            {renderEventSidebar()}
          </div>
        </div>

        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle>Event Details</DialogTitle>
            </VisuallyHidden>
            <DialogHeader>
              <div className="text-lg font-semibold leading-none tracking-tight">
                {selectedEvent ? selectedEvent.title : "Event Details"}
              </div>
              <DialogDescription className="pt-4">
                {selectedEvent && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">{selectedEvent.course}</div>
                      <div className={`text-xs px-2 py-1 rounded ${getEventTypeColor(selectedEvent.type)}`}>
                        {selectedEvent.type}
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="text-sm font-medium">Date</div>
                      <div>{format(parseISO(selectedEvent.date), "MMMM d, yyyy")}</div>
                    </div>
                    <div className="py-2">
                      <div className="text-sm font-medium">Description</div>
                      <div className="text-sm mt-1">{selectedEvent.description}</div>
                    </div>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
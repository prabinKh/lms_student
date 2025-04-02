"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserIcon, EnvelopeIcon, PhoneIcon, AcademicCapIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    studentId: "S123456789",
    department: "Computer Science",
    yearOfStudy: "3rd Year",
    about: "I'm a Computer Science student interested in AI, machine learning, and web development.",
    profileImage: "/placeholder-user.jpg",
    notifications: {
      email: true,
      assignments: true,
      grades: true,
      announcements: true,
      reminders: false,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleNotificationChange = (checked: boolean | "indeterminate", name: string) => {
    setEditedUser({
      ...editedUser,
      notifications: {
        ...editedUser.notifications,
        [name]: checked === "indeterminate" ? false : checked,
      },
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    // In a real application, you would send this to an API
    setPasswordError("");
    setIsPasswordChanging(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader className="flex-row space-x-4 space-y-0 items-center">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <AcademicCapIcon className="h-4 w-4" />
                    <span>
                      {user.department} • {user.yearOfStudy}
                    </span>
                  </CardDescription>
                </div>
                <Button onClick={handleEditToggle}>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md">{user.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md">{user.email}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4" />
                      <span>Phone</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md">{user.phone}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="flex items-center gap-2">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>Student ID</span>
                    </Label>
                    <div className="p-2 border rounded-md">{user.studentId}</div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="flex items-center gap-2">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>Department</span>
                    </Label>
                    {isEditing ? (
                      <Select
                        value={editedUser.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Psychology">Psychology</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 border rounded-md">{user.department}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfStudy" className="flex items-center gap-2">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>Year of Study</span>
                    </Label>
                    {isEditing ? (
                      <Select
                        value={editedUser.yearOfStudy}
                        onValueChange={(value) => handleSelectChange("yearOfStudy", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 border rounded-md">{user.yearOfStudy}</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>About Me</span>
                  </Label>
                  {isEditing ? (
                    <textarea
                      id="about"
                      name="about"
                      value={editedUser.about}
                      onChange={(e) => setEditedUser({ ...editedUser, about: e.target.value })}
                      className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="p-2 border rounded-md min-h-[100px]">{user.about}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-notifications"
                      checked={user.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange(checked, "email")}
                    />
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="assignment-notifications"
                      checked={user.notifications.assignments}
                      onCheckedChange={(checked) => handleNotificationChange(checked, "assignments")}
                    />
                    <Label htmlFor="assignment-notifications">
                      New Assignments
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="grade-notifications"
                      checked={user.notifications.grades}
                      onCheckedChange={(checked) => handleNotificationChange(checked, "grades")}
                    />
                    <Label htmlFor="grade-notifications">
                      Grade Updates
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="announcement-notifications"
                      checked={user.notifications.announcements}
                      onCheckedChange={(checked) => handleNotificationChange(checked, "announcements")}
                    />
                    <Label htmlFor="announcement-notifications">
                      Course Announcements
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reminder-notifications"
                      checked={user.notifications.reminders}
                      onCheckedChange={(checked) => handleNotificationChange(checked, "reminders")}
                    />
                    <Label htmlFor="reminder-notifications">
                      Assignment Reminders
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setUser({ ...user, notifications: editedUser.notifications })}>
                  Save Notification Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>
                  Update your password and manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isPasswordChanging ? (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    {passwordError && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                        {passwordError}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="flex items-center gap-2">
                        <KeyIcon className="h-4 w-4" />
                        <span>Current Password</span>
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="flex items-center gap-2">
                        <KeyIcon className="h-4 w-4" />
                        <span>New Password</span>
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                        <KeyIcon className="h-4 w-4" />
                        <span>Confirm New Password</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button type="submit">Update Password</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsPasswordChanging(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          setPasswordError("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <KeyIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => setIsPasswordChanging(true)}>
                        Change Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

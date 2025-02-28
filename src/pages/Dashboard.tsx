
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, User, Goal, Calendar, Scale, Dumbbell } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

interface UserData {
  name: string;
  age: string;
  height: string;
  fitnessGoal: string;
  weightChangeGoal?: string;
  exerciseFrequency: string;
}

// Exercise data
const workoutData = [
  {
    title: "Push Workout",
    description: "Focus on chest, shoulders, and triceps",
    difficulty: "Beginner to Advanced",
    exercises: [
      { name: "Bench Press", sets: "3-4", reps: "8-12", description: "Lie on bench, push barbell upward" },
      { name: "Push-Ups", sets: "3", reps: "10-15", description: "Keep body straight, lower and push" },
      { name: "Shoulder Press", sets: "3", reps: "8-12", description: "Press weights overhead from shoulders" },
      { name: "Tricep Dips", sets: "3", reps: "10-12", description: "Lower body using triceps, then push up" }
    ]
  },
  {
    title: "Pull Workout",
    description: "Focus on back, biceps, and forearms",
    difficulty: "Beginner to Advanced",
    exercises: [
      { name: "Pull-Ups", sets: "3-4", reps: "6-12", description: "Hang and pull body upward" },
      { name: "Barbell Rows", sets: "3", reps: "8-12", description: "Bend forward, pull barbell to chest" },
      { name: "Bicep Curls", sets: "3", reps: "10-15", description: "Curl weight from hips to shoulders" },
      { name: "Face Pulls", sets: "3", reps: "12-15", description: "Pull rope attachment to face" }
    ]
  },
  {
    title: "Leg Workout",
    description: "Focus on quadriceps, hamstrings, and calves",
    difficulty: "Beginner to Advanced",
    exercises: [
      { name: "Squats", sets: "3-4", reps: "8-12", description: "Bend knees, lower body, then stand" },
      { name: "Lunges", sets: "3", reps: "10-12 each leg", description: "Step forward, lower body, alternate legs" },
      { name: "Leg Press", sets: "3", reps: "10-15", description: "Push weight platform with legs" },
      { name: "Calf Raises", sets: "3", reps: "15-20", description: "Raise heels off ground, lower slowly" }
    ]
  }
];

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<number | null>(null);
  
  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yoga-light">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yoga-dark mb-4">No profile data found</h1>
          <p className="text-yoga-secondary mb-6">Please complete your onboarding profile</p>
          <Link to="/onboarding" className="btn-primary">
            Go to Onboarding
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yoga-light flex">
      <DashboardSidebar />
      
      <div className="flex-1">
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-yoga-dark">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-yoga-secondary mt-2">
              Here's an overview of your fitness profile
            </p>
          </div>
          
          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-yoga-secondary/70 text-sm">Personal Info</p>
                  <h3 className="text-xl font-semibold text-yoga-dark mt-1">{userData.name}</h3>
                  <div className="mt-2 flex flex-col space-y-1">
                    <div className="flex items-center text-yoga-secondary">
                      <span className="text-sm">Age: {userData.age} years</span>
                    </div>
                    <div className="flex items-center text-yoga-secondary">
                      <span className="text-sm">Height: {userData.height} cm</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-yoga-primary/20 flex items-center justify-center">
                  <User size={20} className="text-yoga-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-yoga-secondary/70 text-sm">Fitness Goal</p>
                  <h3 className="text-xl font-semibold text-yoga-dark mt-1">{userData.fitnessGoal}</h3>
                  <div className="mt-2">
                    <div className="flex items-center text-yoga-secondary">
                      <span className="text-sm">Focus on sustainable progress</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-yoga-primary/20 flex items-center justify-center">
                  <Goal size={20} className="text-yoga-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-yoga-secondary/70 text-sm">Weight Goal</p>
                  <h3 className="text-xl font-semibold text-yoga-dark mt-1">
                    {userData.weightChangeGoal || "Not specified"}
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center text-yoga-secondary">
                      <span className="text-sm">Target for your journey</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-yoga-primary/20 flex items-center justify-center">
                  <Scale size={20} className="text-yoga-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-yoga-secondary/70 text-sm">Exercise Frequency</p>
                  <h3 className="text-xl font-semibold text-yoga-dark mt-1">
                    {userData.exerciseFrequency.split('(')[0].trim()}
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center text-yoga-secondary">
                      <span className="text-sm">{userData.exerciseFrequency.match(/\((.*?)\)/)?.[1] || ''}</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-yoga-primary/20 flex items-center justify-center">
                  <Calendar size={20} className="text-yoga-primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Exercise Workouts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yoga-dark">Choose Your Exercise</h2>
              <Link to="/exercises" className="text-yoga-primary text-sm flex items-center">
                View all <ArrowUpRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workoutData.map((workout, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow transition-shadow"
                >
                  <div className="h-40 bg-yoga-accent/20 flex items-center justify-center">
                    <Dumbbell size={40} className="text-yoga-primary/70" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-yoga-dark">{workout.title}</h3>
                      <span className="bg-yoga-primary/10 text-yoga-primary text-xs px-2 py-1 rounded">
                        {workout.difficulty}
                      </span>
                    </div>
                    <p className="text-yoga-secondary/70 text-sm mt-2">
                      {workout.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-yoga-secondary/70">{workout.exercises.length} exercises</span>
                      <button 
                        onClick={() => setActiveWorkout(activeWorkout === index ? null : index)}
                        className="text-yoga-primary flex items-center text-sm font-medium group-hover:underline"
                      >
                        {activeWorkout === index ? "Hide details" : "View details"} <ArrowUpRight size={14} className="ml-1" />
                      </button>
                    </div>
                    
                    {activeWorkout === index && (
                      <div className="mt-4 border-t border-yoga-accent/20 pt-4">
                        <h4 className="font-medium text-yoga-dark mb-2">Exercises:</h4>
                        <div className="space-y-3">
                          {workout.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="bg-yoga-light/50 p-3 rounded-lg">
                              <div className="flex justify-between">
                                <span className="font-medium text-yoga-dark">{exercise.name}</span>
                                <span className="text-xs text-yoga-secondary bg-white px-2 py-1 rounded-full">
                                  {exercise.sets} sets × {exercise.reps}
                                </span>
                              </div>
                              <p className="text-xs text-yoga-secondary mt-1">{exercise.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

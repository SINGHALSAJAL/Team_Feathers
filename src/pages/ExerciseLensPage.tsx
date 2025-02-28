import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Camera, PlayCircle, StopCircle, ChevronDown } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

const ExerciseLensPage = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [showExerciseDropdown, setShowExerciseDropdown] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [trackingResult, setTrackingResult] = useState<null | {
    accuracy: number;
    reps: number;
    feedback: string;
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const exercises = [
    "Push-up",
    "Squat",
    "Plank",
    "Lunges",
    "Bicep Curl",
    "Shoulder Press"
  ];

  // Check if device has cameras on component mount
  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        
        if (!hasCamera) {
          setHasCameraPermission(false);
          toast.error("No camera detected on your device");
        }
      } catch (error) {
        console.error("Error checking camera:", error);
      }
    };
    
    checkCameraAvailability();
  }, []);

  // Start camera for exercise tracking with improved error handling
  const startTracking = async () => {
    if (!selectedExercise) {
      toast.error("Please select an exercise first");
      return;
    }

    try {
      // Reset states
      setIsTracking(false);
      setTrackingResult(null);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      let stream;
      
      // First attempt - optimized for webcams
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "user", 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      } catch (initialError) {
        console.log("Falling back to basic camera access:", initialError);
        
        // Fallback to simple constraints
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true 
        });
      }
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsTracking(true);
        setHasCameraPermission(true);
        toast.success(`Started tracking ${selectedExercise}`);
      }
    } catch (error: any) {
      console.error("Error accessing camera:", error);
      
      // Detailed error handling
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast.error("Camera access denied. Please allow camera permissions in your browser settings.");
        setHasCameraPermission(false);
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast.error("No camera detected on your device. Please make sure your device has a camera.");
        setHasCameraPermission(false);
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        toast.error("Unable to access camera. The camera may be in use by another application.");
      } else {
        toast.error("Unable to access camera. Please check your device and browser settings.");
      }
      
      setIsTracking(false);
    }
  };

  // Stop tracking and analyze results
  const stopTracking = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsTracking(false);
    
    // Simulate analysis (in a real app, this would process data from tracking)
    toast.info("Analyzing your exercise performance...");
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock results (in a real app, this would come from ML models)
      const accuracy = Math.floor(Math.random() * 30) + 70; // Random between 70-99
      const reps = Math.floor(Math.random() * 12) + 5; // Random between 5-16
      
      let feedback;
      if (accuracy > 90) {
        feedback = "Excellent form! Keep up the great work.";
      } else if (accuracy > 80) {
        feedback = "Good form. Try to maintain better posture throughout the exercise.";
      } else {
        feedback = "Your form needs improvement. Focus on proper technique for better results.";
      }
      
      setTrackingResult({
        accuracy,
        reps,
        feedback
      });
      
      toast.success("Analysis complete!");
    }, 2000);
  };

  // Handle video loading error
  const handleVideoError = () => {
    console.error("Video element error");
    stopTracking();
    toast.error("Unable to display camera feed. Please try again or use another browser.");
  };

  return (
    <div className="min-h-screen bg-yoga-light flex">
      <DashboardSidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-yoga-dark mb-6">Exercise Lens</h1>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-yoga-dark">Exercise Movement Tracker</h3>
              <p className="text-yoga-secondary text-sm mt-1">
                Track your exercise form and get real-time feedback to improve your technique
              </p>
              {hasCameraPermission === false && (
                <div className="mt-2 p-2 bg-red-50 text-red-600 rounded-md text-sm mx-auto max-w-sm">
                  No camera detected or permission denied. Please check your device settings.
                </div>
              )}
            </div>
            
            {/* Exercise Selection */}
            <div className="mb-6 max-w-xs mx-auto">
              <label className="block text-yoga-secondary font-medium mb-2">
                Select Exercise
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowExerciseDropdown(!showExerciseDropdown)}
                  className="w-full bg-white border border-yoga-accent/50 rounded-md px-4 py-2 flex justify-between items-center"
                >
                  <span>{selectedExercise || "Choose an exercise"}</span>
                  <ChevronDown size={18} className="text-yoga-secondary" />
                </button>
                
                {showExerciseDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-yoga-accent/50 rounded-md shadow-lg">
                    {exercises.map((exercise) => (
                      <button
                        key={exercise}
                        className="w-full text-left px-4 py-2 hover:bg-yoga-accent/10 transition-colors"
                        onClick={() => {
                          setSelectedExercise(exercise);
                          setShowExerciseDropdown(false);
                        }}
                      >
                        {exercise}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {isTracking ? (
                <div className="relative w-full max-w-md rounded-lg overflow-hidden bg-black mb-4">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline
                    onError={handleVideoError}
                    onLoadedData={() => console.log("Video loaded successfully")}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-yoga-primary/50 rounded-lg pointer-events-none"></div>
                  
                  {/* Overlay with exercise name and tracking indicator */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="bg-yoga-primary/80 text-white text-sm px-3 py-1 rounded-full">
                      {selectedExercise}
                    </span>
                    <div className="flex items-center bg-red-500/80 text-white text-sm px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      Tracking
                    </div>
                  </div>
                </div>
              ) : trackingResult ? (
                <div className="w-full max-w-md bg-yoga-light/50 rounded-lg p-5 mb-4">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="font-semibold text-yoga-dark text-lg">{selectedExercise} Results</h4>
                    <span className="bg-yoga-primary/10 text-yoga-primary text-xs px-2 py-1 rounded">
                      Analysis Complete
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <span className="text-yoga-secondary text-xs block mb-1">Form Accuracy</span>
                      <div className="flex items-center justify-center">
                        <svg className="w-16 h-16">
                          <circle 
                            cx="32" 
                            cy="32" 
                            r="28" 
                            fill="none" 
                            stroke="#e6e6e6" 
                            strokeWidth="8" 
                          />
                          <circle 
                            cx="32" 
                            cy="32" 
                            r="28" 
                            fill="none" 
                            stroke={trackingResult.accuracy > 90 ? "#6B8F71" : trackingResult.accuracy > 80 ? "#D1C4B0" : "#f87171"} 
                            strokeWidth="8" 
                            strokeDasharray={`${2 * Math.PI * 28 * trackingResult.accuracy/100} ${2 * Math.PI * 28 * (1-trackingResult.accuracy/100)}`}
                            strokeDashoffset={2 * Math.PI * 28 * 0.25}
                          />
                          <text 
                            x="32" 
                            y="38" 
                            textAnchor="middle" 
                            fontSize="14" 
                            fontWeight="bold" 
                            fill="#2F3E36"
                          >
                            {trackingResult.accuracy}%
                          </text>
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <span className="text-yoga-secondary text-xs block mb-1">Completed Reps</span>
                      <p className="font-bold text-4xl text-yoga-dark">{trackingResult.reps}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <span className="text-yoga-secondary text-xs">Feedback</span>
                    <p className="font-medium text-yoga-dark mt-2">{trackingResult.feedback}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setTrackingResult(null);
                      setSelectedExercise("");
                    }}
                    className="btn-primary w-full"
                  >
                    Track Another Exercise
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-md bg-yoga-light/50 rounded-lg p-10 flex flex-col items-center justify-center mb-4">
                  <Camera size={48} className="text-yoga-secondary mb-3" />
                  <p className="text-yoga-secondary text-center">
                    Select an exercise and press start to begin tracking your form
                  </p>
                </div>
              )}
              
              {isTracking ? (
                <button
                  onClick={stopTracking}
                  className="btn-primary flex items-center gap-2"
                >
                  <StopCircle size={20} /> Stop Tracking
                </button>
              ) : !trackingResult && (
                <button
                  onClick={startTracking}
                  className="btn-primary flex items-center gap-2"
                  disabled={!selectedExercise}
                >
                  <PlayCircle size={20} /> Start Tracking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLensPage;
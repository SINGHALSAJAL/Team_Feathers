
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Check, UserRound, Crown, Dumbbell, Calendar, Scale } from "lucide-react";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    fitnessGoal: "",
    weightChangeGoal: "",
    exerciseFrequency: ""
  });

  // Update form data helper
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle back button
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle next button
  const handleNext = () => {
    // Validate current step
    if (step === 1 && !formData.name) {
      toast.error("Please enter your name");
      return;
    }
    
    if (step === 2 && (!formData.age || !formData.height)) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (step === 3 && !formData.fitnessGoal) {
      toast.error("Please select a fitness goal");
      return;
    }
    
    if (step === 4 && !formData.weightChangeGoal) {
      toast.error("Please select a weight change goal");
      return;
    }
    
    if (step === 5 && !formData.exerciseFrequency) {
      toast.error("Please select your exercise frequency");
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.height ||
      !formData.fitnessGoal ||
      !formData.weightChangeGoal ||
      !formData.exerciseFrequency
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Save the data to localStorage to access it on the dashboard
    localStorage.setItem("userData", JSON.stringify(formData));
    toast.success("Profile created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-light to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-yoga-primary py-8 px-8 text-center relative">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Create Your Fitness Profile</h1>
            <p className="text-white/90 mt-2">
              Let's personalize your fitness journey
            </p>
            
            {/* Progress bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <div className="overflow-hidden h-2 mb-4 flex rounded-full bg-white/30">
                  <div 
                    style={{ width: `${(step / totalSteps) * 100}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-500"
                  ></div>
                </div>
                <div className="flex justify-between">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                        step > index + 1 
                          ? "bg-white text-yoga-primary" 
                          : step === index + 1 
                            ? "bg-white/90 text-yoga-primary border-2 border-white ring-2 ring-yoga-primary/30" 
                            : "bg-white/30 text-white/70"
                      }`}
                    >
                      {step > index + 1 ? (
                        <Check size={16} className="stroke-2" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Steps content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-yoga-primary/10 text-yoga-primary">
                      <UserRound size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-yoga-dark">Personal Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-yoga-secondary">
                        What's your name?
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className="input-field"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Body Information */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-yoga-primary/10 text-yoga-primary">
                      <Crown size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-yoga-dark">Body Measurements</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="age" className="block text-sm font-medium text-yoga-secondary">
                        Age
                      </label>
                      <input
                        id="age"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => updateFormData("age", e.target.value)}
                        className="input-field"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="height" className="block text-sm font-medium text-yoga-secondary">
                        Height (cm)
                      </label>
                      <input
                        id="height"
                        type="number"
                        min="50"
                        max="250"
                        value={formData.height}
                        onChange={(e) => updateFormData("height", e.target.value)}
                        className="input-field"
                        placeholder="Enter your height in cm"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Fitness Goals */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-yoga-primary/10 text-yoga-primary">
                      <Dumbbell size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-yoga-dark">Fitness Goals</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-yoga-secondary">
                      What are your primary fitness goals?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Losing weight", "Gaining weight", "Maintaining weight"].map((goal) => (
                        <label 
                          key={goal} 
                          className={`
                            flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
                            ${formData.fitnessGoal === goal 
                              ? "border-yoga-primary bg-yoga-primary/10 text-yoga-primary" 
                              : "border-yoga-accent/30 hover:border-yoga-primary/30"}
                          `}
                        >
                          <input
                            type="radio"
                            name="fitnessGoal"
                            value={goal}
                            checked={formData.fitnessGoal === goal}
                            onChange={(e) => updateFormData("fitnessGoal", e.target.value)}
                            className="sr-only"
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4: Weight Change Goal */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-yoga-primary/10 text-yoga-primary">
                      <Scale size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-yoga-dark">Weight Change Goal</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-yoga-secondary">
                      {formData.fitnessGoal === "Losing weight" 
                        ? "How much weight would you like to lose?" 
                        : formData.fitnessGoal === "Gaining weight"
                          ? "How much weight would you like to gain?"
                          : "What is your target weight?"}
                    </label>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {formData.fitnessGoal === "Losing weight" && [
                        "1-5 kg (2-11 lbs)",
                        "5-10 kg (11-22 lbs)",
                        "10-15 kg (22-33 lbs)",
                        "15+ kg (33+ lbs)"
                      ].map((amount) => (
                        <label 
                          key={amount} 
                          className={`
                            flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all
                            ${formData.weightChangeGoal === amount 
                              ? "border-yoga-primary bg-yoga-primary/10 text-yoga-primary" 
                              : "border-yoga-accent/30 hover:border-yoga-primary/30"}
                          `}
                        >
                          <input
                            type="radio"
                            name="weightChangeGoal"
                            value={amount}
                            checked={formData.weightChangeGoal === amount}
                            onChange={(e) => updateFormData("weightChangeGoal", e.target.value)}
                            className="sr-only"
                          />
                          <span>{amount}</span>
                        </label>
                      ))}
                      
                      {formData.fitnessGoal === "Gaining weight" && [
                        "1-5 kg (2-11 lbs)",
                        "5-10 kg (11-22 lbs)",
                        "10-15 kg (22-33 lbs)",
                        "15+ kg (33+ lbs)"
                      ].map((amount) => (
                        <label 
                          key={amount} 
                          className={`
                            flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all
                            ${formData.weightChangeGoal === amount 
                              ? "border-yoga-primary bg-yoga-primary/10 text-yoga-primary" 
                              : "border-yoga-accent/30 hover:border-yoga-primary/30"}
                          `}
                        >
                          <input
                            type="radio"
                            name="weightChangeGoal"
                            value={amount}
                            checked={formData.weightChangeGoal === amount}
                            onChange={(e) => updateFormData("weightChangeGoal", e.target.value)}
                            className="sr-only"
                          />
                          <span>{amount}</span>
                        </label>
                      ))}
                      
                      {formData.fitnessGoal === "Maintaining weight" && [
                        "Maintain current weight",
                        "Gain muscle while maintaining weight",
                        "Improve overall fitness at current weight",
                        "Focus on body composition rather than weight"
                      ].map((option) => (
                        <label 
                          key={option} 
                          className={`
                            flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all
                            ${formData.weightChangeGoal === option 
                              ? "border-yoga-primary bg-yoga-primary/10 text-yoga-primary" 
                              : "border-yoga-accent/30 hover:border-yoga-primary/30"}
                          `}
                        >
                          <input
                            type="radio"
                            name="weightChangeGoal"
                            value={option}
                            checked={formData.weightChangeGoal === option}
                            onChange={(e) => updateFormData("weightChangeGoal", e.target.value)}
                            className="sr-only"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 5: Exercise Frequency (formerly step 4) */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-yoga-primary/10 text-yoga-primary">
                      <Calendar size={24} />
                    </div>
                    <h2 className="text-lg font-semibold text-yoga-dark">Exercise Routine</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-yoga-secondary">
                      How often do you exercise currently?
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "Rarely (0-1 days/week)", 
                        "Sometimes (2-3 days/week)", 
                        "Regularly (4-5 days/week)", 
                        "Daily (6-7 days/week)"
                      ].map((frequency) => (
                        <label 
                          key={frequency} 
                          className={`
                            flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all
                            ${formData.exerciseFrequency === frequency 
                              ? "border-yoga-primary bg-yoga-primary/10 text-yoga-primary" 
                              : "border-yoga-accent/30 hover:border-yoga-primary/30"}
                          `}
                        >
                          <input
                            type="radio"
                            name="exerciseFrequency"
                            value={frequency}
                            checked={formData.exerciseFrequency === frequency}
                            onChange={(e) => updateFormData("exerciseFrequency", e.target.value)}
                            className="sr-only"
                          />
                          <span>{frequency}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between pt-8">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all
                    ${step === 1 ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400" : "bg-white border border-yoga-primary/70 text-yoga-primary hover:bg-yoga-primary/5"}`}
                  disabled={step === 1}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="btn-primary flex items-center justify-center gap-2 px-8"
                >
                  {step === totalSteps ? "Complete" : "Next"} {step === totalSteps ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface UseCameraOptions {
  onSuccess?: (stream: MediaStream) => void;
  onError?: (error: Error) => void;
  preferredFacing?: 'user' | 'environment';
}

interface UseCameraReturn {
  isAvailable: boolean;
  isLoading: boolean;
  isPermissionDenied: boolean;
  startCamera: () => Promise<MediaStream | null>;
  stopCamera: () => void;
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  permissionState: PermissionState | null;
  retryCamera: () => Promise<MediaStream | null>;
}

export const useCamera = (options?: UseCameraOptions): UseCameraReturn => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState<boolean>(false);
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { 
    onSuccess, 
    onError, 
    preferredFacing = 'user'
  } = options || {};

  // Check if the camera is available
  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        // First check if media devices are supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.warn("MediaDevices API not supported in this browser");
          setIsAvailable(false);
          return;
        }

        // Try to enumerate devices to see if there's a camera
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        setIsAvailable(hasCamera);

        // Check if we can get permission state
        if ('permissions' in navigator) {
          try {
            const status = await navigator.permissions.query({ name: 'camera' as PermissionName });
            setPermissionState(status.state);
            
            // Listen for permission changes
            status.addEventListener('change', () => {
              setPermissionState(status.state);
              setIsPermissionDenied(status.state === 'denied');
            });
          } catch (e) {
            console.warn("Permission API query failed:", e);
          }
        }
      } catch (error) {
        console.error("Error checking camera availability:", error);
        setIsAvailable(false);
      }
    };

    checkCameraAvailability();
  }, []);

  // Try all possible camera configurations to get a working stream
  const tryAllCameraOptions = async (): Promise<MediaStream> => {
    const constraints = [
      // Try preferred facing mode first
      { video: { facingMode: preferredFacing } },
      // Then try the opposite facing mode
      { video: { facingMode: preferredFacing === 'user' ? 'environment' : 'user' } },
      // Then try with any camera
      { video: true },
      // Finally try with specific ideal facing mode but allow fallback
      { 
        video: { 
          facingMode: { 
            ideal: preferredFacing,
            exact: undefined 
          } 
        } 
      }
    ];

    // Try each constraint until one works
    for (const constraint of constraints) {
      try {
        return await navigator.mediaDevices.getUserMedia(constraint);
      } catch (error) {
        console.warn(`Camera option failed:`, constraint, error);
        // Continue to next option
      }
    }

    // If we get here, all options failed
    throw new Error("Unable to access any camera on your device");
  };

  const startCamera = async (): Promise<MediaStream | null> => {
    setIsLoading(true);
    
    try {
      // Reset states
      setIsPermissionDenied(false);
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }

      // Try to get the camera stream with fallback options
      const mediaStream = await tryAllCameraOptions();
      
      // If successful, update state and refs
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setIsLoading(false);
      
      // Call success callback if provided
      if (onSuccess) onSuccess(mediaStream);
      
      return mediaStream;
    } catch (error) {
      console.error("Camera access error:", error);
      setIsLoading(false);
      
      // Handle specific error types
      let errorMessage = "Unable to access camera. Please check permissions.";
      
      if (error instanceof Error) {
        // DOMException with name NotAllowedError means permission denied
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setIsPermissionDenied(true);
          errorMessage = "Camera permission denied. Please allow camera access in your browser settings.";
        } 
        // NotFoundError means no camera available
        else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = "No camera detected on your device. Please make sure your device has a camera.";
        }
        // OverconstrainedError means the requested constraints can't be met
        else if (error.name === 'OverconstrainedError') {
          errorMessage = "Your camera doesn't support the requested settings. Please try a different camera.";
        }
        // NotReadableError means camera is in use by another application
        else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          errorMessage = "Camera is in use by another application. Please close other apps using your camera.";
        }
        // AbortError is often due to user interaction or hardware issues
        else if (error.name === 'AbortError') {
          errorMessage = "Camera access interrupted. Please try again.";
        }
      }
      
      // Show error toast
      toast.error(errorMessage);
      
      // Call error callback if provided
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      
      return null;
    }
  };

  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const retryCamera = async (): Promise<MediaStream | null> => {
    stopCamera();
    return startCamera();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    isAvailable,
    isLoading,
    isPermissionDenied,
    startCamera,
    stopCamera,
    stream,
    videoRef,
    permissionState,
    retryCamera
  };
};
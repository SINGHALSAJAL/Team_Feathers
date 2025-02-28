import React from 'react';

const CameraPermissionGuide = ({ browser = 'default' }) => {
  const getBrowserInstructions = () => {
    switch(browser.toLowerCase()) {
      case 'firefox':
        return (
          <div className="space-y-2">
            <p>To allow camera access in Firefox:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on the padlock icon in the address bar</li>
              <li>Click on "Connection Secure" or "Permissions"</li>
              <li>Find "Use the Camera" and set it to "Allow"</li>
              <li>Refresh the page</li>
            </ol>
          </div>
        );
      
      case 'chrome':
        return (
          <div className="space-y-2">
            <p>To allow camera access in Chrome:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click the padlock icon in the address bar</li>
              <li>Click on "Site settings"</li>
              <li>Find "Camera" and set it to "Allow"</li>
              <li>Refresh the page</li>
            </ol>
          </div>
        );
        
      case 'safari':
        return (
          <div className="space-y-2">
            <p>To allow camera access in Safari:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click Safari in the menu bar and select "Preferences"</li>
              <li>Go to the "Websites" tab</li>
              <li>Select "Camera" from the left sidebar</li>
              <li>Find this website and choose "Allow"</li>
              <li>Refresh the page</li>
            </ol>
          </div>
        );
        
      default:
        return (
          <div className="space-y-2">
            <p>To allow camera access:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Look for a camera permission prompt in your browser</li>
              <li>Click "Allow" when prompted to use your camera</li>
              <li>Check the address bar for camera permission icons</li>
              <li>If denied, click on the site settings in your address bar to change permissions</li>
              <li>Refresh the page after allowing access</li>
            </ol>
          </div>
        );
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-medium text-blue-700 mb-2">Camera Permission Required</h3>
      {getBrowserInstructions()}
      <div className="mt-3 text-sm text-blue-600">
        <p>If you continue having issues, please try:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Using a different browser</li>
          <li>Checking if your camera is working in other applications</li>
          <li>Restarting your browser</li>
          <li>Making sure no other application is using your camera</li>
        </ul>
      </div>
    </div>
  );
};

export default CameraPermissionGuide;
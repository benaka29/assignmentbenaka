import { useState, useEffect } from "react";

const useDeviceType = () => {
  const getDeviceType = (width) => {
    if (width < 768) return "mobile";        
    if (width >= 768 && width < 1024) return "tablet"; 
    return "desktop";                        
  };

  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;

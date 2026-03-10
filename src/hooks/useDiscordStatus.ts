import { useState, useEffect } from 'react';

export const useDiscordStatus = (userId: string) => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        
        if (data.success) {
          const status = data.data.discord_status;
          // User is considered online if status is online, idle, or dnd
          setIsOnline(status === 'online' || status === 'idle' || status === 'dnd');
        } else {
          setIsOnline(false); // Default to offline if error or not monitored
        }
      } catch (error) {
        console.error("Failed to fetch Discord status from Lanyard", error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  return { isOnline, loading };
};

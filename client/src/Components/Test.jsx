// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../api/transaction';

const Test = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        console.log('response',data);
        setProfile(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
      {/* Render other profile data */}
    </div>
  );
};

export default Test;

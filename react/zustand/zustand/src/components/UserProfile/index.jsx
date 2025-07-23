import { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';

function UserProfile({ userId }) {
  const { user, loading, error, fetchUser } = useUserStore();
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {/* 其他用户信息 */}
    </div>
  );
}
export default UserProfile;
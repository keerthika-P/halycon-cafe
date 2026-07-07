import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as likesApi from '../api/likes';
import { useAuth } from './AuthContext';

const LikesContext = createContext(null);

export function LikesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [likedItems, setLikedItems] = useState([]);
  const [likedIds, setLikedIds] = useState(new Set());

  const refreshLikes = useCallback(async () => {
    if (!isAuthenticated) { setLikedItems([]); setLikedIds(new Set()); return; }
    const data = await likesApi.getLikedItems();
    setLikedItems(data);
    setLikedIds(new Set(data.map((i) => i.id)));
  }, [isAuthenticated]);

  useEffect(() => { refreshLikes(); }, [refreshLikes]);

  const toggleLike = async (menuItemId) => {
    if (likedIds.has(menuItemId)) {
      await likesApi.unlikeItem(menuItemId);
    } else {
      await likesApi.likeItem(menuItemId);
    }
    await refreshLikes();
  };

  return (
    <LikesContext.Provider value={{ likedItems, likedIds, toggleLike, refreshLikes }}>
      {children}
    </LikesContext.Provider>
  );
}

export const useLikes = () => useContext(LikesContext);

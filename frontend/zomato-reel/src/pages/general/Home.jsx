    import React, { useEffect, useState } from 'react'
    import axios from 'axios';
    import '../../styles/reels.css'
    import ReelFeed from '../../component/ReelFeed'
    import { useNavigate } from 'react-router-dom';

    const Home = () => {
        const [ videos, setVideos ] = useState([])
        const navigate = useNavigate();
        // Autoplay behavior is handled inside ReelFeed

        useEffect(() => {
  

    axios.get('http://localhost:3000/api/food/home', { withCredentials: true })
        .then(response => {
            console.log("Food items:", response.data.foodItems);
            setVideos(response.data.foodItems);
        })
        .catch(err => {
            console.error("Error fetching food:", err);
            if (err?.response?.status === 401) {
                // session invalid — force full navigation to login (replace history)
                window.location.replace('/user/login');
            }
        });
}, []);


        // Using local refs within ReelFeed; keeping map here for dependency parity if needed

        async function likeVideo(item) {
            try {
                const response = await axios.post('http://localhost:3000/api/food/like', { foodId: item._id }, { withCredentials: true })

                const serverCount = response?.data?.likeCount
                const liked = response?.data?.like

                setVideos((prev) => prev.map((v) => {
                    if (v._id !== item._id) return v

                    const current = Number(v.likeCount ?? v.likes ?? 0)

                    // prefer server-provided count if available
                    let next = typeof serverCount === 'number' ? serverCount : (current + (liked ? 1 : -1))

                    // never go below zero
                    if (isNaN(next) || next < 0) next = 0

                    return { ...v, likeCount: next }
                }))

            } catch (err) {
                // fallback: optimistic increment so UI doesn't break
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max(0, Number(v.likeCount ?? v.likes ?? 0) + 1) } : v))
            }
        }

        async function saveVideo(item) {
            try {
                const response = await axios.post('http://localhost:3000/api/food/save', { foodId: item._id }, { withCredentials: true })

                const serverCount = response?.data?.saveCount
                const saved = response?.data?.save

                setVideos((prev) => prev.map((v) => {
                    if (v._id !== item._id) return v

                    const current = Number(v.savesCount ?? v.saves ?? 0)
                    let next = typeof serverCount === 'number' ? serverCount : (current + (saved ? 1 : -1))
                    if (isNaN(next) || next < 0) next = 0
                    return { ...v, savesCount: next }
                }))
            } catch (err) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, Number(v.savesCount ?? v.saves ?? 0) + 1) } : v))
            }
        }

        async function handleLogout() {
            try {
                await axios.get('http://localhost:3000/api/auth/user/logout', { withCredentials: true });
            } catch (err) {
                console.error('Logout failed', err);
            } finally {
                // use a full replace so the protected page isn't reachable via back
                window.location.replace('/user/login');
            }
        }

        return (
            <div className="reels-page">
                <button className="logout-btn" onClick={handleLogout} aria-label="Logout">Logout</button>
                <ReelFeed
                    items={videos}
                    onLike={likeVideo}
                    onSave={saveVideo}
                    emptyMessage="No videos available."
                />
            </div>
        )
    }

    export default Home

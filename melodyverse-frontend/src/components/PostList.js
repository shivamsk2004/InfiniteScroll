import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setPosts(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <h2 className="text-3xl my-6">Posts</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full max-w-2xl">
                {posts.map(post => (
                    <div key={post._id} className="bg-white p-6 mb-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="mt-2">{post.content}</p>
                        <p className="text-gray-500 mt-2">By: {post.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;

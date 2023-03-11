import './style.css';
import {Component, useCallback, useEffect, useState} from "react";
import {loadPosts} from "../../utils/load-posts";
import {Posts} from "../../components/Posts";
import {Button} from "../../components/Button";
import {TextInput} from "../../components/TextInput";

export const Home =  () => {

    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
        ? posts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        : posts;

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const photosAndPosts = await loadPosts();

        setPosts(photosAndPosts.slice(page, postsPerPage));
        setAllPosts(photosAndPosts)
    }, [])

    useEffect( () => {
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage])

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);

        setPosts(posts);
        setPage(nextPage);
    }

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchValue(value);
    }

    return (
        <section className="container">
            <div className='search-container'>
                {!!searchValue && (
                    <h1>Search Value: {searchValue}</h1>
                )}

                <TextInput searchValue={searchValue} handleChange={handleChange}/>
            </div>

            {filteredPosts.length > 0 && (
                <Posts posts={filteredPosts}/>
            )}
            {filteredPosts.length === 0 && (
                <p>Não Existem Posts</p>
            )}

            <div className='button-container'>
                {!searchValue && (
                    <Button text="Load more Posts"
                            onclick={loadMorePosts}
                            disabled={noMorePosts}/>
                )}
            </div>
        </section>
    );
}

export default Home;

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'

export default function Home({ posts }) {
 console.log(posts)
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          // eslint-disable-next-line react/jsx-key
          <Post post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // get files from the posts directory
  const files = fs.readdirSync(path.join('posts'))
  
  // get slug and frontmatter from posts
  const posts = files.map(filename => {
    // Create slug
    const slug = filename.replace('.md', '')

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  
  return {
    props: {
      posts
    }
  }
}